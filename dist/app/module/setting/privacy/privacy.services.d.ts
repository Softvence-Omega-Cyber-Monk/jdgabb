import { PrivacyModel } from "./privacy.model";
export declare const praivicyServices: {
    findPrivicyByUserId: (id: String) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        localStorage: boolean;
        autoDelete: "none" | "7d" | "30d" | "90d";
        deletionMethod: "archive" | "permanent";
        excludeFromAI: boolean;
        cloudSync: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        localStorage: boolean;
        autoDelete: "none" | "7d" | "30d" | "90d";
        deletionMethod: "archive" | "permanent";
        excludeFromAI: boolean;
        cloudSync: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updatePrivicyByUserID: (id: string, updatedData: Partial<typeof PrivacyModel>) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        localStorage: boolean;
        autoDelete: "none" | "7d" | "30d" | "90d";
        deletionMethod: "archive" | "permanent";
        excludeFromAI: boolean;
        cloudSync: boolean;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        localStorage: boolean;
        autoDelete: "none" | "7d" | "30d" | "90d";
        deletionMethod: "archive" | "permanent";
        excludeFromAI: boolean;
        cloudSync: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=privacy.services.d.ts.map