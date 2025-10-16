"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productivityServices = void 0;
const productivity_model_1 = require("./productivity.model");
const findPrivicyByUserId = async (id) => {
    const result = await productivity_model_1.ProductivityEnhancements.findOne({ userId: id });
    return result;
};
const updatePrivicyByUserID = async (id, updatedData) => {
    const result = await productivity_model_1.ProductivityEnhancements.findOneAndUpdate({ userId: id }, updatedData, { new: true, runValidators: true });
    return result;
};
exports.productivityServices = {
    findPrivicyByUserId,
    updatePrivicyByUserID
};
//# sourceMappingURL=productivity.services.js.map