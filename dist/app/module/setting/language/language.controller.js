"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const language_services_1 = require("./language.services");
const getLanguage = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const result = await language_services_1.languageServices.findLanguageByUserId(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Language retrived successfully",
        data: result
    });
});
const updateLanguage = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await language_services_1.languageServices.updateLanguageByUserID(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Language updated successfully",
        data: result
    });
});
exports.languageController = {
    getLanguage,
    updateLanguage
};
//# sourceMappingURL=language.controller.js.map