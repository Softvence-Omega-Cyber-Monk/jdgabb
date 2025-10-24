import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IAuthprovider, IUser, Role } from "./user.interface";

const authProviderSchema = new mongoose.Schema<IAuthprovider>({
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    _id: false
});




const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    fcmToken: {
        type: String
    },
    profile: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isVerifid: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: Role.USER
    },
    auths: [authProviderSchema]
}, {
    timestamps: true,
    versionKey: false
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password as string, 10);
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as any;
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
        this.setUpdate(update);
    }
    next();
});

export const User = mongoose.model<IUser>("user", userSchema)