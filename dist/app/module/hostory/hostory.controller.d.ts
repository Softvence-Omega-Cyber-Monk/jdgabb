import { NextFunction, Request, Response } from "express";
export declare const historyController: {
    getAllHistory: (req: Request, res: Response, next: NextFunction) => void;
    addUserChatToHistory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addAIChatToHistory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=hostory.controller.d.ts.map