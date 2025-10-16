import { CollaborationModel } from "./collaboration.model";
export declare const collabrationServices: {
    findCollabrationByUserId: (id: String) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        taskSharing: import("./collaboration.model").ETaskSharing;
        commentPermission: import("./collaboration.model").ECommentPermission;
        chatHistory: import("./collaboration.model").EChatHistory;
        activityLog: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        taskSharing: import("./collaboration.model").ETaskSharing;
        commentPermission: import("./collaboration.model").ECommentPermission;
        chatHistory: import("./collaboration.model").EChatHistory;
        activityLog: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updateCollabrationByUserID: (id: string, updatedData: Partial<typeof CollaborationModel>) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        taskSharing: import("./collaboration.model").ETaskSharing;
        commentPermission: import("./collaboration.model").ECommentPermission;
        chatHistory: import("./collaboration.model").EChatHistory;
        activityLog: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        taskSharing: import("./collaboration.model").ETaskSharing;
        commentPermission: import("./collaboration.model").ECommentPermission;
        chatHistory: import("./collaboration.model").EChatHistory;
        activityLog: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=collaboration.services.d.ts.map