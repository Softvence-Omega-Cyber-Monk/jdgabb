import { IAppearance } from "./appearance.interfaces";
export declare const apperanceServices: {
    findAppearanceByUserId: (id: String) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        theme: import("./appearance.model").Etheme;
        fontSize: import("./appearance.model").EfontSize;
        fontDensity: "compact" | "comfortable";
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        theme: import("./appearance.model").Etheme;
        fontSize: import("./appearance.model").EfontSize;
        fontDensity: "compact" | "comfortable";
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updateAppearanceByUserID: (id: string, updatedData: Partial<IAppearance>) => Promise<(import("mongoose").Document<unknown, {}, {
        userId: import("mongoose").Types.ObjectId;
        theme: import("./appearance.model").Etheme;
        fontSize: import("./appearance.model").EfontSize;
        fontDensity: "compact" | "comfortable";
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: import("mongoose").Types.ObjectId;
        theme: import("./appearance.model").Etheme;
        fontSize: import("./appearance.model").EfontSize;
        fontDensity: "compact" | "comfortable";
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=appearance.services.d.ts.map