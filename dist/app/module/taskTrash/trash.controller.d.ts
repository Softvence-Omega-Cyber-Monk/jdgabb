import { Request, Response } from "express";
export declare const trashController: {
    addTaskToTrash: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    trashRemove: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllTrash: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=trash.controller.d.ts.map