"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AichatBotController = exports.chatbot = void 0;
const update_history_model_1 = require("../UpdateHistory/update.history.model");
const project_services_1 = require("../project/project.services");
const trashModel_1 = require("../taskTrash/trashModel");
// const chatbot = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { message , userId } = req.body;
//     const emptyMsg = "Hey there! My name’s Ollie, and I’m here to help you with your to-dos! I can create projects, tasks, add details, due dates all based on our conversation! *Tap the screen* or type *“next”* in the chat bar below when you’re ready. ";
//     const createMsg = "Okie Dokie! Here’s your project! Go ahead and tap <Project 1> to see the tasks inside! I can also undo the action I just made if you tap the Undo button below.";
//     const addMsg = "What would you like to add?";
//     const nextMsg = "Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!";
//     const defaultText = "Sorry, I didn't quite catch that. Try typing 'Add' , 'Next' or 'Create'";
//     if (!message) {
//         await UpdateChatHestory.create({ userId: userId, isFile: true, text: message })
//         res.json({
//             response: emptyMsg
//         });
//     };
//     if (message.toLowerCase().trim() === "create") {
//         await UpdateChatHestory.create({ userId: userId, isFile: true, text: createMsg })
//         res.json({
//             response: createMsg
//         })
//     }
//     if (message.toLowerCase().trim() === "add") {
//         await UpdateChatHestory.create({ userId: userId, isFile: true, text: addMsg })
//         res.json({
//             response: addMsg
//         });
//     };
//     if (message.toLowerCase().trim() === "next") {
//         await UpdateChatHestory.create({ userId: userId, isFile: true, text: nextMsg })
//         res.json({
//             response: nextMsg
//         })
//     }
//     await UpdateChatHestory.create({ userId: userId, isFile: true, text: defaultText }),
//         res.json({
//             response: defaultText
//         });
// });
const chatbot = async (req, res, next) => {
    try {
        const { message, userId, projectId } = req.body;
        const emptyMsg = "Hey there! My name’s Ollie, and I’m here to help you with your to-dos! I can create projects, tasks, add details, due dates all based on our conversation! *Tap the screen* or type *“next”* in the chat bar below when you’re ready.";
        const createMsg = `Okie Dokie! Here’s your project! Go ahead and tap ${message} to see the tasks inside! I can also undo the action I just made if you tap the Undo button below.`;
        const addMsg = "What would you like to add?";
        const nextMsg = "Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!";
        const undoMsg = `Okie Dokie! Here’s your project! Go ahead and tap ${message} to see the tasks inside! I can also undo the action I just made if you tap the Undo button below.`;
        const defaultText = "Sorry, I didn't quite catch that. Try typing 'Add' , 'Next' or 'Create'";
        if (!message) {
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: true, text: emptyMsg });
            res.json({ response: emptyMsg });
            return;
        }
        if (message.toLowerCase().trim() === "create") {
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: false, text: "Create" });
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: true, text: createMsg });
            res.json({ response: createMsg });
            return;
        }
        if (message.toLowerCase().trim() === "add") {
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: false, text: "Add" });
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: true, text: addMsg });
            res.json({ response: addMsg });
            return;
        }
        if (message.toLowerCase().trim() === "next") {
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: false, text: "Next" });
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: true, text: nextMsg });
            res.json({ response: nextMsg });
            return;
        }
        ;
        if (message.toLowerCase().trim() === "create new project") {
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: false, text: "Create new project" });
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: true, text: nextMsg });
            res.json({ response: nextMsg });
            return;
        }
        ;
        if (message.toLowerCase().trim() === "undo") {
            await update_history_model_1.UpdateChatHestory.create({ userId, isFile: false, text: "Undo" });
            project_services_1.projectServices.deleteProject(projectId);
            res.json({ response: "Project Deleted  success" });
            return;
        }
        await update_history_model_1.UpdateChatHestory.create({ userId, isFile: true, text: defaultText });
        res.json({ response: defaultText });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};
exports.chatbot = chatbot;
const addTaskToTrash = async (req, res) => {
    try {
        const { taskId } = req.body;
        if (Array.isArray(taskId)) {
            const data = taskId.map(id => ({ taskId: id }));
            const result = await trashModel_1.TaskTrushModel.insertMany(data);
            return res.status(201).json({
                success: true,
                message: "Multiple tasks moved to trash",
                data: result
            });
        }
        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" });
        }
        const result = await trashModel_1.TaskTrushModel.create({ taskId });
        res.status(201).json({
            success: true,
            message: "Task moved to trash",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.AichatBotController = {
    chatbot: exports.chatbot,
    addTaskToTrash
};
//# sourceMappingURL=chatbot.controller.js.map