import mongoose from "mongoose";
export declare const ProductivityEnhancements: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    google_calendar: boolean;
    microsoft_outlook: boolean;
    slack_integration: boolean;
    notion: boolean;
    trello: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    google_calendar: boolean;
    microsoft_outlook: boolean;
    slack_integration: boolean;
    notion: boolean;
    trello: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    google_calendar: boolean;
    microsoft_outlook: boolean;
    slack_integration: boolean;
    notion: boolean;
    trello: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    google_calendar: boolean;
    microsoft_outlook: boolean;
    slack_integration: boolean;
    notion: boolean;
    trello: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    google_calendar: boolean;
    microsoft_outlook: boolean;
    slack_integration: boolean;
    notion: boolean;
    trello: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    google_calendar: boolean;
    microsoft_outlook: boolean;
    slack_integration: boolean;
    notion: boolean;
    trello: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=productivity.model.d.ts.map