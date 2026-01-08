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
                task: { type: String, required: true },
                details: { type: String, default: null },
                taskDueDate: { type: Date, default: null },
                isDeleted: { type: Boolean, default: false },
                isComplite: { type: Boolean, default: false },
                isArchived: { type: Boolean, default: false },
                isStar: { type: Boolean, default: false },
                subtasks: [
                    {
                        title: { type: String, required: true },
                        subTaskDueDate: { type: Date, default: null },
                        isStar: { type: Boolean, default: false },
                        isDeleted: { type: Boolean, default: false },
                        isComplite: { type: Boolean, default: false }
                    }
                ],
            }
        ],

        answered_questions: [
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
        ]
    },
    { timestamps: true, versionKey: false }
);

export const Project = mongoose.model("projectST", projectSchema);
