import mongoose from "mongoose";
export interface ITask {
    task: string;
    subtasks?: string[];
    details?: string;
}
export interface IAnsweredQuestion {
    question: string;
    answer?: string;
}
export interface ISharedWith {
    userId: mongoose.Types.ObjectId;
    role: "viewer";
}
export interface IProject {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks?: ITask[];
    answered_questions?: IAnsweredQuestion[];
    visibility?: "private" | "restricted";
    sharedWith?: ISharedWith[];
    linkAccess?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=project.interfaces.d.ts.map