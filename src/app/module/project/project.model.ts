import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        goal: {
            type: String,
            required: true,
            trim: true
        },

        tasks: [
            {
                task: { type: String },
                subtasks: [{ type: String }],
                details: { type: String }
            }
        ],

        answered_questions: [
            {
                question: { type: String },
                answer: { type: String },
            }
        ],

        chat: [
            {
                question: { type: String },
                answer: { type: String },
            }
        ],

        visibility: {
            type: String,
            enum: ["private", "restricted"],
            default: "private",
        },

        sharedWith: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
                role: {
                    type: String,
                    enum: ["viewer"],
                    default: "viewer",
                }
            }
        ],

        linkAccess: {
            type: Boolean,
            default: false,
        }

    },
    { timestamps: true, versionKey: false }
);

export const Project = mongoose.model("project", projectSchema);
