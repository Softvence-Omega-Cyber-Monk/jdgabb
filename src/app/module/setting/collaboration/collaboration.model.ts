import mongoose from "mongoose";

export enum ETaskSharing {
    TeamMembers = "Team members",
    ProjectCollaborators = "Project collaborators",
    Public = "Public"
};

export enum ECommentPermission {
    NoComments = "No comments",
    TeamMembersOnly = "Team members only",
    AllCollaborators = "All collaborators"
};

export enum EChatHistory{
    PrivateNotesOnly = "Private notes only",
    SharedChatHistory = "Shared chat history",
    BothPrivateShared = "Both private & shared"
}

const collaborationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    taskSharing: {
        type: String,
        enum: [...Object.values(ETaskSharing)],
        default: ETaskSharing.TeamMembers,
    },
    commentPermission: {
        type: String,
        enum: [...Object.values(ECommentPermission)],
        default: ECommentPermission.TeamMembersOnly,
    },
    chatHistory: {
        type: String,
        enum: [...Object.values(EChatHistory)],
        default: EChatHistory.SharedChatHistory,
    },
    activityLog: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export const CollaborationModel = mongoose.model("collaboration", collaborationSchema);
