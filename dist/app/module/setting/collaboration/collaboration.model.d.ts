import mongoose from "mongoose";
export declare enum ETaskSharing {
    TeamMembers = "Team members",
    ProjectCollaborators = "Project collaborators",
    Public = "Public"
}
export declare enum ECommentPermission {
    NoComments = "No comments",
    TeamMembersOnly = "Team members only",
    AllCollaborators = "All collaborators"
}
export declare enum EChatHistory {
    PrivateNotesOnly = "Private notes only",
    SharedChatHistory = "Shared chat history",
    BothPrivateShared = "Both private & shared"
}
export declare const CollaborationModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    taskSharing: ETaskSharing;
    commentPermission: ECommentPermission;
    chatHistory: EChatHistory;
    activityLog: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    taskSharing: ETaskSharing;
    commentPermission: ECommentPermission;
    chatHistory: EChatHistory;
    activityLog: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    taskSharing: ETaskSharing;
    commentPermission: ECommentPermission;
    chatHistory: EChatHistory;
    activityLog: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    taskSharing: ETaskSharing;
    commentPermission: ECommentPermission;
    chatHistory: EChatHistory;
    activityLog: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    taskSharing: ETaskSharing;
    commentPermission: ECommentPermission;
    chatHistory: EChatHistory;
    activityLog: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    taskSharing: ETaskSharing;
    commentPermission: ECommentPermission;
    chatHistory: EChatHistory;
    activityLog: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=collaboration.model.d.ts.map