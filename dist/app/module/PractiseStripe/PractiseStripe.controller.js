"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../../config/env");
const stript = new stripe_1.default(env_1.envVers.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover"
});
//# sourceMappingURL=PractiseStripe.controller.js.map