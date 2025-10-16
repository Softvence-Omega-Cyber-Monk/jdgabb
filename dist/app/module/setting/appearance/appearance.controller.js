"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appearanceController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const appearance_services_1 = require("./appearance.services");
const sendResponse_1 = require("../../../utils/sendResponse");
const getAppearanceByuUserId = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await appearance_services_1.apperanceServices.findAppearanceByUserId(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Appearance get successfuly",
        data: result
    });
});
const updateAppearanceByUserID = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const updateData = req.body;
    console.log(id);
    const result = await appearance_services_1.apperanceServices.updateAppearanceByUserID(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Appearance updated successfuly",
        data: result
    });
});
exports.appearanceController = {
    getAppearanceByuUserId,
    updateAppearanceByUserID
};
//# sourceMappingURL=appearance.controller.js.map