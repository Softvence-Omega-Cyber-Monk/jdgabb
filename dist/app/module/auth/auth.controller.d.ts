import { NextFunction, Request, Response } from "express";
export declare const authController: {
    loginUser: (req: Request, res: Response, next: NextFunction) => void;
    changePassword: (req: Request, res: Response, next: NextFunction) => void;
    deleteUser: (req: Request, res: Response, next: NextFunction) => void;
    googleFirebaseLogin: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=auth.controller.d.ts.map