import { NextFunction, Request, Response } from "express";
export declare const firebaseNotifacationController: {
    createNotification: (req: Request, res: Response) => Promise<void>;
    getUserNotifications: (req: Request, res: Response) => Promise<void>;
    markAsRead: (req: Request, res: Response) => Promise<void>;
    getAllNtg: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=firebaseNotifacation.controller.d.ts.map