"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAi = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("./env");
exports.OpenAi = new openai_1.default({
    apiKey: env_1.envVers.OPEN_AI_API_SECRATE
});
//# sourceMappingURL=openAi.js.map