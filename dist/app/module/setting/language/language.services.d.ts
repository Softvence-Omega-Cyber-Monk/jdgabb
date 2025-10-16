import { languageModel } from "./language.model";
export declare const languageServices: {
    findLanguageByUserId: (id: String) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        uiLanguage: string;
        dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
        timeFormate: "12 hours" | "24 hours";
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        uiLanguage: string;
        dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
        timeFormate: "12 hours" | "24 hours";
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updateLanguageByUserID: (id: string, updatedData: Partial<typeof languageModel>) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        uiLanguage: string;
        dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
        timeFormate: "12 hours" | "24 hours";
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        uiLanguage: string;
        dateformat: "MM/ DD/ YYYY" | "DD /MM / YYYY";
        timeFormate: "12 hours" | "24 hours";
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=language.services.d.ts.map