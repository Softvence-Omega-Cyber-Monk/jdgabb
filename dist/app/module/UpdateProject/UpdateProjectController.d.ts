import { NextFunction, Request, Response } from 'express';
export declare const createProjectController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getProjectController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createTaskController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createTaskOrSubtaskController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTaskController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTaskController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllParentTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTaskTree: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTaskWithChildren: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSingleUserAllProject: (req: Request, res: Response, next: NextFunction) => void;
export declare const getTaskParentChainController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const projectGoalUpdate: (req: Request, res: Response, next: NextFunction) => void;
export declare const projectDelete: (req: Request, res: Response, next: NextFunction) => void;
export declare const getTaskFlagList: (req: Request, res: Response, next: NextFunction) => void;
export declare const getSingleTask: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=UpdateProjectController.d.ts.map