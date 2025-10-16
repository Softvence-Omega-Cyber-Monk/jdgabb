"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apperanceServices = void 0;
const appearance_model_1 = require("./appearance.model");
const findAppearanceByUserId = async (id) => {
    const result = await appearance_model_1.AppearanceModel.findOne({ userId: id });
    return result;
};
const updateAppearanceByUserID = async (id, updatedData) => {
    const result = await appearance_model_1.AppearanceModel.findOneAndUpdate({ userId: id }, updatedData, { new: true, runValidators: true });
    return result;
};
exports.apperanceServices = {
    findAppearanceByUserId,
    updateAppearanceByUserID
};
//# sourceMappingURL=appearance.services.js.map