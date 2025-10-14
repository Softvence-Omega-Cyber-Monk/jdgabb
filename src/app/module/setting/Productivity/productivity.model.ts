import mongoose from "mongoose";

const productivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to User model
        required: true,
    },
    google_calendar: {
        type: Boolean,
        default: false,
    },
    microsoft_outlook: {
        type: Boolean,
        default: false,
    },
    slack_integration: {
        type: Boolean,
        default: false,
    },
    notion: {
        type: Boolean,
        default: false,
    },
    trello: {
        type: Boolean,
        default: false,
    },
},{
    timestamps : true,
    versionKey : false
});

export const ProductivityEnhancements = mongoose.model("productivity", productivitySchema);