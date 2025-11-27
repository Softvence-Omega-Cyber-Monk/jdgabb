import { NextFunction, Request, Response } from "express";
export declare const chatbot: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const AichatBotController: {
    chatbot: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addTaskToTrash: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=chatbot.controller.d.ts.map