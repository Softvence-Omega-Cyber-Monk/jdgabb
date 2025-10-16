"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtToken = void 0;
const env_1 = require("../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJwtToken = (userInfo) => {
    const data = {
        userId: userInfo._id,
        email: userInfo.email,
        role: userInfo.role
    };
    const createAccessToken = () => {
        const token = jsonwebtoken_1.default.sign(data, env_1.envVers.JWT.JWT_ACCESS_SECRATE, { expiresIn: "2d" });
        return token;
    };
    const createRefreshToken = () => {
        const token = jsonwebtoken_1.default.sign(data, env_1.envVers.JWT.JWT_REFRESH_SECRATE, { expiresIn: "10d" });
        return token;
    };
    return {
        accessToken: createAccessToken(),
        refreshToken: createRefreshToken()
    };
};
exports.createJwtToken = createJwtToken;
//# sourceMappingURL=createJwtToken.js.map