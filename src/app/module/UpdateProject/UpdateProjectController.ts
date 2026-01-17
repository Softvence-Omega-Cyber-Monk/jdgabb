import { Request, Response } from 'express';
import { UpdateProject } from './UpdateProject.model';
import Task from './TaskModel';

// Helper function to save tasks and their subtasks recursively
const saveTaskWithSubtasks = async (taskData: any): Promise<any> => {
    const { title, description, status, subtasks } = taskData;

    // Create a new task document
    const task = new Task({
        title,
        description,
        status,
    });

    // Save the task
    const savedTask = await task.save();

    // If there are subtasks, recursively save them
    if (subtasks && subtasks.length > 0) {
        for (let subtask of subtasks) {
            const savedSubtask = await saveTaskWithSubtasks(subtask);  // Recursively save subtasks
            savedTask.subtasks.push(savedSubtask._id);  // Add the subtask reference to the main task
        }
        // Save the task with its subtasks references
        await savedTask.save();
    }

    return savedTask;
};

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const { userId, goal, tasks } = req.body;

        if (!userId || !goal) {
            return res.status(400).json({ message: 'User ID and Goal are required!' });
        }

        // Save all tasks first and get their ObjectIds
        const savedTasks = [];
        for (let taskData of tasks) {
            const savedTask = await saveTaskWithSubtasks(taskData);  // Save task and its subtasks
            savedTasks.push(savedTask._id);  // Push the ObjectId of the saved task
        }

        // Create the project document, referencing the saved task ObjectIds
        const newProject = new UpdateProject({
            userId,
            goal,
            tasks: savedTasks,  // Use the ObjectIds of the saved tasks
        });

        // Save the project
        const savedProject = await newProject.save();

        // Return success response
        res.status(201).json({
            message: 'Project created successfully!',
            project: savedProject,
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

const getTaskWithSubtasks = async (taskId: string): Promise<any> => {

    const task = await Task.findById(taskId).populate('subtasks');

    if ((task as any).subtasks.length > 0) {
        (task as any).subtasks = await Promise.all(
            (task as any).subtasks.map(async (subtask: any) => {
                return await getTaskWithSubtasks(subtask._id);
            })
        );
    }

    return task;
};

export const getProjectController = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;


        const project = await UpdateProject.findById(projectId).populate('tasks');

        if (!project) {
            return res.status(404).json({ message: 'Project not found!' });
        }


        const tasksWithSubtasks = await Promise.all(
            project.tasks.map(async (task: any) => {
                return await getTaskWithSubtasks(task._id);
            })
        );

        // Attach tasks with nested subtasks to the project
        project.tasks = tasksWithSubtasks;

        // Return the project with all tasks and subtasks
        res.status(200).json({
            message: 'Project fetched successfully!',
            project,
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};



export const createTaskController = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const { title, description, parentTaskId } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title and Status are required!' });
        }


        const newTask = new Task({
            title,
            description,
            parentTaskId: parentTaskId || null,
        });

        const savedTask = await newTask.save();

        const project = await UpdateProject.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found!' });
        }

        project.tasks.push(savedTask._id);

        await project.save();

        res.status(201).json({
            message: 'Task created successfully under the project!',
            task: savedTask,
            project,
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};



export const createTaskOrSubtaskController = async (req: Request, res: Response) => {
    try {
        const { parentTaskId, title, description, compliteTarget } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title and Status are required!' });
        }

        const newTask = new Task({
            title,
            description,
            compliteTarget,
            parentTaskId: parentTaskId || null,
        });


        const savedTask = await newTask.save();


        if (parentTaskId) {
            const parentTask = await Task.findById(parentTaskId);

            if (!parentTask) {
                return res.status(404).json({ message: 'Parent task not found!' });
            }

            parentTask.subtasks.push(savedTask._id);

            await parentTask.save();
        }


        res.status(201).json({
            message: parentTaskId ? 'Subtask created successfully!' : 'Task created successfully!',
            task: savedTask,
            parentTaskId: parentTaskId ? parentTaskId : null,
        });
    } catch (error) {
        console.error('Error creating task/subtask:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};


export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const updateFields = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] === "" || updateFields[key] === null || updateFields[key] === undefined) {
                delete updateFields[key];
            }
        });

        if (Object.keys(updateFields).length > 0) {
            const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, { new: true });

            res.status(200).json({
                message: 'Task updated successfully!',
                task: updatedTask,
            });
        } else {
            res.status(400).json({ message: 'No valid fields to update!' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};



export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params; 

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        if (task.parentTaskId) {
            const parentTask = await Task.findById(task.parentTaskId);

            if (parentTask) {
                parentTask.subtasks = parentTask.subtasks.filter((subtaskId) => subtaskId.toString() !== taskId);

                await parentTask.save();
            }
        }

        await Task.deleteOne({ _id: taskId });

        res.status(200).json({
            message: 'Task deleted successfully!',
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};
