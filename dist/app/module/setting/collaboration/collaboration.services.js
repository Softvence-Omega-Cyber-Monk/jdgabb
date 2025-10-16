"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collabrationServices = void 0;
const collaboration_model_1 = require("./collaboration.model");
const findCollabrationByUserId = async (id) => {
    const result = await collaboration_model_1.CollaborationModel.findOne({ userId: id });
    return result;
};
const updateCollabrationByUserID = async (id, updatedData) => {
    const result = await collaboration_model_1.CollaborationModel.findOneAndUpdate({ userId: id }, updatedData, { new: true, runValidators: true });
    return result;
};
exports.collabrationServices = {
    findCollabrationByUserId,
    updateCollabrationByUserID
};
//# sourceMappingURL=collaboration.services.js.map