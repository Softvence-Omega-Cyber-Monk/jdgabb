import { NextFunction, Request, Response } from "express";
export declare const userController: {
    registerUser: (req: Request, res: Response, next: NextFunction) => void;
    getSingleUser: (req: Request, res: Response, next: NextFunction) => void;
    userSettingInfo: (req: Request, res: Response, next: NextFunction) => void;
    userDeleted: (req: Request, res: Response, next: NextFunction) => void;
    searchUserByEmail: (req: Request, res: Response, next: NextFunction) => void;
    addSharedUser: (req: Request, res: Response, next: NextFunction) => void;
    getUserSharedProjectsFull: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=user.controller.d.ts.map