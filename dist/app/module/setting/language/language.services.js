"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageServices = void 0;
const language_model_1 = require("./language.model");
const findLanguageByUserId = async (id) => {
    const result = await language_model_1.languageModel.findOne({ userId: id });
    return result;
};
const updateLanguageByUserID = async (id, updatedData) => {
    const result = await language_model_1.languageModel.findOneAndUpdate({ userId: id }, updatedData, { new: true, runValidators: true });
    return result;
};
exports.languageServices = {
    findLanguageByUserId,
    updateLanguageByUserID
};
//# sourceMappingURL=language.services.js.map