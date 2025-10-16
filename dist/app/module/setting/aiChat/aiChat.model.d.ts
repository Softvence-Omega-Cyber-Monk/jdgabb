import mongoose from "mongoose";
export declare enum EContextMemory {
    ResetPerTask = "Reset per task",
    RememberAcrossProjectTask = "Remember across project task",
    RememberEverything = "Remember everything"
}
export declare const AiChatModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    contextMemory: EContextMemory;
    ProactiveSuggestion: boolean;
    AutoCompleteFromChat: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    contextMemory: EContextMemory;
    ProactiveSuggestion: boolean;
    AutoCompleteFromChat: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    contextMemory: EContextMemory;
    ProactiveSuggestion: boolean;
    AutoCompleteFromChat: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    contextMemory: EContextMemory;
    ProactiveSuggestion: boolean;
    AutoCompleteFromChat: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    contextMemory: EContextMemory;
    ProactiveSuggestion: boolean;
    AutoCompleteFromChat: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    contextMemory: EContextMemory;
    ProactiveSuggestion: boolean;
    AutoCompleteFromChat: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=aiChat.model.d.ts.map