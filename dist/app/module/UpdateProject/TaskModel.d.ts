import mongoose from "mongoose";
declare const Task: mongoose.Model<{
    isDeleted: boolean;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "archived";
    userId: mongoose.Types.ObjectId;
    isComplite: boolean;
    isArchived: boolean;
    isStar: boolean;
    subtasks: mongoose.Types.ObjectId[];
    sharedWith: mongoose.Types.DocumentArray<{
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        userId?: mongoose.Types.ObjectId | null;
    }>;
    projectId: mongoose.Types.ObjectId;
    compliteTarget: NativeDate;
    parentTaskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    isDeleted: boolean;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "archived";
    userId: mongoose.Types.ObjectId;
    isComplite: boolean;
    isArchived: boolean;
    isStar: boolean;
    subtasks: mongoose.Types.ObjectId[];
    sharedWith: mongoose.Types.DocumentArray<{
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        userId?: mongoose.Types.ObjectId | null;
    }>;
    projectId: mongoose.Types.ObjectId;
    compliteTarget: NativeDate;
    parentTaskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    isDeleted: boolean;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "archived";
    userId: mongoose.Types.ObjectId;
    isComplite: boolean;
    isArchived: boolean;
    isStar: boolean;
    subtasks: mongoose.Types.ObjectId[];
    sharedWith: mongoose.Types.DocumentArray<{
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        userId?: mongoose.Types.ObjectId | null;
    }>;
    projectId: mongoose.Types.ObjectId;
    compliteTarget: NativeDate;
    parentTaskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    isDeleted: boolean;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "archived";
    userId: mongoose.Types.ObjectId;
    isComplite: boolean;
    isArchived: boolean;
    isStar: boolean;
    subtasks: mongoose.Types.ObjectId[];
    sharedWith: mongoose.Types.DocumentArray<{
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        userId?: mongoose.Types.ObjectId | null;
    }>;
    projectId: mongoose.Types.ObjectId;
    compliteTarget: NativeDate;
    parentTaskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    isDeleted: boolean;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "archived";
    userId: mongoose.Types.ObjectId;
    isComplite: boolean;
    isArchived: boolean;
    isStar: boolean;
    subtasks: mongoose.Types.ObjectId[];
    sharedWith: mongoose.Types.DocumentArray<{
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        userId?: mongoose.Types.ObjectId | null;
    }>;
    projectId: mongoose.Types.ObjectId;
    compliteTarget: NativeDate;
    parentTaskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    isDeleted: boolean;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "archived";
    userId: mongoose.Types.ObjectId;
    isComplite: boolean;
    isArchived: boolean;
    isStar: boolean;
    subtasks: mongoose.Types.ObjectId[];
    sharedWith: mongoose.Types.DocumentArray<{
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        userId?: mongoose.Types.ObjectId | null;
    }>;
    projectId: mongoose.Types.ObjectId;
    compliteTarget: NativeDate;
    parentTaskId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Task;
//# sourceMappingURL=TaskModel.d.ts.map