"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.praivicyController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const privacy_services_1 = require("./privacy.services");
const sendResponse_1 = require("../../../utils/sendResponse");
const getPraivacy = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await privacy_services_1.praivicyServices.findPrivicyByUserId(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: false,
        statusCode: 200,
        message: "Praivicy setting retrived success",
        data: result
    });
});
const updatePraivicy = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await privacy_services_1.praivicyServices.updatePrivicyByUserID(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Praivicy setting updated success",
        data: result
    });
});
exports.praivicyController = {
    getPraivacy,
    updatePraivicy
};
//# sourceMappingURL=privacy.controller.js.map