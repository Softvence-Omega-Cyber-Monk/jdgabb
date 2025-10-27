import { NextFunction, Request, Response } from "express";
export declare const projectController: {
    createProject: (req: Request, res: Response, next: NextFunction) => void;
    updateProjectTitle: (req: Request, res: Response, next: NextFunction) => void;
    addTask: (req: Request, res: Response, next: NextFunction) => void;
    addSubTask: (req: Request, res: Response, next: NextFunction) => void;
    addDetails: (req: Request, res: Response, next: NextFunction) => void;
    getProject: (req: Request, res: Response, next: NextFunction) => void;
    askQuestion: (req: Request, res: Response, next: NextFunction) => void;
    getAllProject: (req: Request, res: Response, next: NextFunction) => void;
    ansQuestion: (req: Request, res: Response, next: NextFunction) => void;
    askQuestionOpenAi: (req: Request, res: Response, next: NextFunction) => void;
    findSingleTask: (req: Request, res: Response, next: NextFunction) => void;
    findSingleSubtask: (req: Request, res: Response, next: NextFunction) => void;
    updateTaskStar: (req: Request, res: Response, next: NextFunction) => void;
    updateSubtaskStar: (req: Request, res: Response, next: NextFunction) => void;
    getAllProjectByUser: (req: Request, res: Response, next: NextFunction) => void;
    softDeleteTask: (req: Request, res: Response, next: NextFunction) => void;
    permanentDeleteTask: (req: Request, res: Response, next: NextFunction) => void;
    permanentDeleteSubTask: (req: Request, res: Response, next: NextFunction) => void;
    createProjectTaskSubtaskWithAi: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    createProjectWithAi: (req: Request, res: Response, next: NextFunction) => void;
    getStarredTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getCompletedTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateTaskDueDateController: (req: Request, res: Response, next: NextFunction) => void;
    askQuestionNotHistory: (req: Request, res: Response, next: NextFunction) => void;
    updateTaskWithAi: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=project.controller.d.ts.map