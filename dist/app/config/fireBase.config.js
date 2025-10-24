"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.messaging = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const env_1 = require("./env");
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            projectId: env_1.envVers.FIREBASE.FIREBASE_PROJECT_ID,
            clientEmail: env_1.envVers.FIREBASE.FIREBASE_CLIENT_EMAIL,
            privateKey: env_1.envVers.FIREBASE.FIREBASE_PRIVATE_KEY
        })
    });
}
;
exports.messaging = firebase_admin_1.default.messaging();
exports.db = firebase_admin_1.default.firestore();
exports.default = firebase_admin_1.default;
//# sourceMappingURL=fireBase.config.js.map