"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("./env");
const userModel_1 = require("../module/user/userModel");
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const aiChat_model_1 = require("../module/setting/aiChat/aiChat.model");
const appearance_model_1 = require("../module/setting/appearance/appearance.model");
const collaboration_model_1 = require("../module/setting/collaboration/collaboration.model");
const language_model_1 = require("../module/setting/language/language.model");
const notifications_model_1 = require("../module/setting/notifications/notifications.model");
const privacy_model_1 = require("../module/setting/privacy/privacy.model");
const productivity_model_1 = require("../module/setting/Productivity/productivity.model");
const projectTask_model_1 = require("../module/setting/projectTask/projectTask.model");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    const isExistuser = await userModel_1.User.findOne({ email: email });
    if (!isExistuser) {
        return done(null, false, { message: "User not found" });
    }
    ;
    const matchPassword = await bcrypt_1.default.compare(password, isExistuser?.password);
    if (!matchPassword) {
        return done(null, false, { message: "Invalid password" });
    }
    ;
    done(null, isExistuser);
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVers.PASSPORT.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVers.PASSPORT.GOOGLE_CLINT_SECRATE,
    callbackURL: env_1.envVers.PASSPORT.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(null, false, { message: "Email not found" });
        }
        ;
        let user = await userModel_1.User.findOne({ email: email });
        if (!user) {
            user = await userModel_1.User.create({
                username: profile.displayName,
                email: email,
                profile: profile.photos?.[0]?.value,
                isDeleted: false,
                isVerifid: true,
                auths: [
                    {
                        provider: "Google",
                        providerId: profile.id
                    }
                ]
            });
            await Promise.all([
                aiChat_model_1.AiChatModel.create({ userId: user._id }),
                appearance_model_1.AppearanceModel.create({ userId: user._id }),
                collaboration_model_1.CollaborationModel.create({ userId: user._id }),
                language_model_1.languageModel.create({ userId: user._id }),
                notifications_model_1.NotificationModel.create({ userId: user._id }),
                privacy_model_1.PrivacyModel.create({ userId: user._id }),
                productivity_model_1.ProductivityEnhancements.create({ userId: user._id }),
                projectTask_model_1.ProjectTaskModel.create({ userId: user._id }),
            ]);
        }
        ;
        return done(null, user);
    }
    catch (error) {
        console.log("Google Strategy Error", error);
        return done(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await userModel_1.User.findById(id);
        done(null, user);
    }
    catch (error) {
        console.log("Pasport de-serialized error", error);
        done(error);
    }
});
//# sourceMappingURL=pasport.js.map