import { IAiChat } from "./aiChat.interfaces";
export declare const aiChatServices: {
    getAiChatByUserId: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        contextMemory: import("./aiChat.model").EContextMemory;
        ProactiveSuggestion: boolean;
        AutoCompleteFromChat: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        contextMemory: import("./aiChat.model").EContextMemory;
        ProactiveSuggestion: boolean;
        AutoCompleteFromChat: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updateAiChatByUserID: (userId: string, updateData: Partial<IAiChat>) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        contextMemory: import("./aiChat.model").EContextMemory;
        ProactiveSuggestion: boolean;
        AutoCompleteFromChat: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        contextMemory: import("./aiChat.model").EContextMemory;
        ProactiveSuggestion: boolean;
        AutoCompleteFromChat: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=aiChat.services.d.ts.map