import mongoose from "mongoose";
export declare const Project: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }> & {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }> & {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }> & {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }> & {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }> & {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }> & {
        subtasks: string[];
        task?: string | null;
        details?: string | null;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=project.model.d.ts.map