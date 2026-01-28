import mongoose from "mongoose";
export declare const UpdateProject: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.ObjectId[];
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
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.ObjectId[];
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
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.ObjectId[];
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
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.ObjectId[];
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
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.ObjectId[];
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
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.ObjectId[];
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
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=UpdateProject.model.d.ts.map