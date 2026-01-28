import { Request, Response } from "express";
export declare const createUndo: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const getUndo: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const pushUndoAction: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const popUndoAction: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const createGlobalUndo: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const getGlobalUndo: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const pushGlobalUndoAction: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const popGlobalUndoAction: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=undo.controller.d.ts.map