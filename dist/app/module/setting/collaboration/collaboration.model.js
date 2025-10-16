"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaborationModel = exports.EChatHistory = exports.ECommentPermission = exports.ETaskSharing = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var ETaskSharing;
(function (ETaskSharing) {
    ETaskSharing["TeamMembers"] = "Team members";
    ETaskSharing["ProjectCollaborators"] = "Project collaborators";
    ETaskSharing["Public"] = "Public";
})(ETaskSharing || (exports.ETaskSharing = ETaskSharing = {}));
;
var ECommentPermission;
(function (ECommentPermission) {
    ECommentPermission["NoComments"] = "No comments";
    ECommentPermission["TeamMembersOnly"] = "Team members only";
    ECommentPermission["AllCollaborators"] = "All collaborators";
})(ECommentPermission || (exports.ECommentPermission = ECommentPermission = {}));
;
var EChatHistory;
(function (EChatHistory) {
    EChatHistory["PrivateNotesOnly"] = "Private notes only";
    EChatHistory["SharedChatHistory"] = "Shared chat history";
    EChatHistory["BothPrivateShared"] = "Both private & shared";
})(EChatHistory || (exports.EChatHistory = EChatHistory = {}));
const collaborationSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.CollaborationModel = mongoose_1.default.model("collaboration", collaborationSchema);
//# sourceMappingURL=collaboration.model.js.map