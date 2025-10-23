import { NextFunction, Request, Response } from "express";
export declare const projectController: {
    createProject: (req: Request, res: Response, next: NextFunction) => void;
    updateProjectTitle: (req: Request, res: Response, next: NextFunction) => void;
    addTask: (req: Request, res: Response, next: NextFunction) => void;
    addSubTask: (req: Request, res: Response, next: NextFunction) => void;
    addDetails: (req: Request, res: Response, next: NextFunction) => void;
    getProject: (req: Request, res: Response, next: NextFunction) => void;
    askQuestion: (req: Request, res: Response, next: NextFunction) => void;
    getAllProject: (req: Request, res: Response, next: NextFunction) => void;
    ansQuestion: (req: Request, res: Response, next: NextFunction) => void;
    askQuestionOpenAi: (req: Request, res: Response, next: NextFunction) => void;
    findSingleTask: (req: Request, res: Response, next: NextFunction) => void;
    findSingleSubtask: (req: Request, res: Response, next: NextFunction) => void;
    updateTaskStar: (req: Request, res: Response, next: NextFunction) => void;
    updateSubtaskStar: (req: Request, res: Response, next: NextFunction) => void;
    softDeleteTask: (req: Request, res: Response, next: NextFunction) => void;
    permanentDeleteTask: (req: Request, res: Response, next: NextFunction) => void;
    permanentDeleteSubTask: (req: Request, res: Response, next: NextFunction) => void;
    createProjectTaskSubtaskWithAi: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=project.controller.d.ts.map