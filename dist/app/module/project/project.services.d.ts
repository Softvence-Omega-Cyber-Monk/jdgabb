import { Types } from "mongoose";
export declare const projectServices: {
    createProject: (userId: string, goal: string) => Promise<import("mongoose").Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    }>;
    addTask: (projectId: string, task: {
        task: string;
        subtasks?: string[];
        details?: string;
    }) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    addSubTask: (projectId: string, taskId: string, subTaskData: string) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    addOrUpdateTaskDetails: (projectId: string, taskId: string, detailsText: string) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }> & {
            subtasks: string[];
            task?: string | null;
            details?: string | null;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=project.services.d.ts.map