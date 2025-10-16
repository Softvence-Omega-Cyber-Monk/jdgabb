"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTaskServices = void 0;
const projectTask_model_1 = require("./projectTask.model");
const findProjectTaskByUserId = async (id) => {
    const result = await projectTask_model_1.ProjectTaskModel.findOne({ userId: id });
    return result;
};
const updateProjectTaskByUserID = async (id, updatedData) => {
    const result = await projectTask_model_1.ProjectTaskModel.findOneAndUpdate({ userId: id }, updatedData, { new: true, runValidators: true });
    return result;
};
exports.projectTaskServices = {
    findProjectTaskByUserId,
    updateProjectTaskByUserID
};
//# sourceMappingURL=projectTask.services.js.map