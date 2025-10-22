import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { Project } from "../project/project.model";
import AppError from "../../utils/AppError";

const getHomeText = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let homeText = "Hey there! My name’s Ollie, and I’m here to help you with your to-dos! I can create projects, tasks, add details, due dates all based on our conversation! *Tap the screen* or type “*next*” in the chat bar below when you’re ready. ";

    let nextText = "Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!";

    res.status(200).send({
        homeText,
        nextText
    })
});


const generateProjectGoalText = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projeciid = req.params.id;

    if (!projeciid) {
        throw new AppError(404, "Project is musrt be required.");
    }

    const findProject = await Project.findById(projeciid)

    const generateProjectGoalText = `Awesome! You want to ${findProject?.goal}! Would you like to *add something*, have me *ask questions* about your project or *create the project and task list* right away?`;

    res.status(200).json({ message: generateProjectGoalText });
});

export const homeTextController = {
    getHomeText,
    generateProjectGoalText
}