import { Types } from "mongoose";
import { EfontDensity, EfontSize, Etheme } from "./appearance.model";
export interface IAppearance {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    theme: Etheme;
    fontSize: EfontSize;
    fontDensity: EfontDensity;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=appearance.interfaces.d.ts.map