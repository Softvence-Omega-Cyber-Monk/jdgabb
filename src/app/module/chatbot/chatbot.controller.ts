import express, { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";


const chatbot = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;

    if (!message) {
        res.json({
            response:
                "Hey there! My name’s Ollie, and I’m here to help you with your to-dos! I can create projects, tasks, add details, due dates all based on our conversation! *Tap the screen* or type *“next”* in the chat bar below when you’re ready. "
        });
    }

    if (message.toLowerCase().trim() === "create") {
        res.json({
            response: "Okie Dokie! Here’s your project! Go ahead and tap <Project 1> to see the tasks inside! I can also undo the action I just made if you tap the Undo button below."
        })
    }

    if (message.toLowerCase().trim() === "add") {
        res.json({
            response: "What would you like to add?"
        });
    };

    if (message.toLowerCase().trim() === "next") {
        res.json({
            response: "Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!"
        })
    }

    res.json({
        response: "Sorry, I didn't quite catch that. Try typing 'Add' , 'Next' or 'Create'"
    });
});


export const AichatBotController = {
    chatbot
}

