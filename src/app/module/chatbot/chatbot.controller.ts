import express, { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";


const chatbot = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;

    if (!message) {
        res.json({
            response:
                "Great! Type into the chat bar below what sort of project you want to start. We can think of an idea together - do you want to be healthier, start a business, find love, find your passion, save time, or speed through your homework? What's a goal you have? It can be anything!"
        });
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
        response: "Sorry, I didn't quite catch that. Try typing 'Add' or Next"
    });
});


export const AichatBotController = {
    chatbot
}

