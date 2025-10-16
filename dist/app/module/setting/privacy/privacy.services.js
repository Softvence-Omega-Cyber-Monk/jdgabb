"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.praivicyServices = void 0;
const privacy_model_1 = require("./privacy.model");
const findPrivicyByUserId = async (id) => {
    const result = await privacy_model_1.PrivacyModel.findOne({ userId: id });
    return result;
};
const updatePrivicyByUserID = async (id, updatedData) => {
    const result = await privacy_model_1.PrivacyModel.findOneAndUpdate({ userId: id }, updatedData, { new: true, runValidators: true });
    return result;
};
exports.praivicyServices = {
    findPrivicyByUserId,
    updatePrivicyByUserID
};
//# sourceMappingURL=privacy.services.js.map