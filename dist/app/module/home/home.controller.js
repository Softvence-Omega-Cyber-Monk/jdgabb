"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeTextController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const project_model_1 = require("../project/project.model");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const getHomeText = (0, catchAsync_1.default)(async (req, res, next) => {
    let homeText = "Hey there! My name’s Ollie, and I’m here to help you with your to-dos! I can create projects, tasks, add details, due dates all based on our conversation! *Tap the screen* or type “*next*” in the chat bar below when you’re ready. ";
    let nextText = "Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!";
    res.status(200).send({
        homeText,
        nextText
    });
});
const generateProjectGoalText = (0, catchAsync_1.default)(async (req, res, next) => {
    const projeciid = req.params.id;
    if (!projeciid) {
        throw new AppError_1.default(404, "Project is musrt be required.");
    }
    const findProject = await project_model_1.Project.findById(projeciid);
    const generateProjectGoalText = `Awesome! You want to ${findProject?.goal}! Would you like to *add something*, have me *ask questions* about your project or *create the project and task list* right away?`;
    res.status(200).json({ message: generateProjectGoalText });
});
exports.homeTextController = {
    getHomeText,
    generateProjectGoalText
};
//# sourceMappingURL=home.controller.js.map