import { ProductivityEnhancements } from "./productivity.model";
export declare const productivityServices: {
    findPrivicyByUserId: (id: String) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        google_calendar: boolean;
        microsoft_outlook: boolean;
        slack_integration: boolean;
        notion: boolean;
        trello: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        google_calendar: boolean;
        microsoft_outlook: boolean;
        slack_integration: boolean;
        notion: boolean;
        trello: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updatePrivicyByUserID: (id: string, updatedData: Partial<typeof ProductivityEnhancements>) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        google_calendar: boolean;
        microsoft_outlook: boolean;
        slack_integration: boolean;
        notion: boolean;
        trello: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        google_calendar: boolean;
        microsoft_outlook: boolean;
        slack_integration: boolean;
        notion: boolean;
        trello: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=productivity.services.d.ts.map