import mongoose, { Types } from "mongoose";
export declare const projectServices: {
    createProject: (userId: string, goal: string) => Promise<mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }>;
    addTask: (projectId: string, task: {
        task: string;
        subtasks?: string[];
        details?: string;
        taskDueData?: Date;
    }) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    addSubTask: (projectId: string, taskId: string, subtaskTitle: string, subTaskDueDate?: Date) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    addOrUpdateTaskDetails: (projectId: string, taskId: string, detailsText: string) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    findSingleTask: (projectid: string, taskId: string) => Promise<(Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isStar: boolean;
        subtasks: Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subTaskDueDate: NativeDate;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subTaskDueDate: NativeDate;
        }>;
    }> & {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isStar: boolean;
        subtasks: Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subTaskDueDate: NativeDate;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subTaskDueDate: NativeDate;
        }>;
    }) | undefined>;
    findSingleSubTask: (projectId: string, taskId: string, subTaskId: string) => Promise<any>;
    updateTaskStar: (projectId: string, taskId: string, updates: {
        isStar?: boolean;
        isComplite?: boolean;
    }) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    updateSubtaskStar: (projectId: string, taskId: string, subtaskId: string, updates: {
        isStar?: boolean;
        isComplite?: boolean;
    }) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    softDeleteTask: (projectId: string, taskId: string) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    permanentDeleteTask: (projectId: string, taskId: string) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    permanentDeleteSubtask: (projectId: string, taskId: string, subtaskId: string) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    deleteProject: (projectId: string) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
    updateTaskDueDate: (projectId: string, taskId: string, taskDueDate: Date | string) => Promise<(mongoose.Document<unknown, {}, {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
        versionKey: false;
    }> & {
        userId: Types.ObjectId;
        goal: string;
        tasks: Types.DocumentArray<{
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }> & {
            isDeleted: boolean;
            task: string;
            details: string;
            taskDueDate: NativeDate;
            isComplite: boolean;
            isStar: boolean;
            subtasks: Types.DocumentArray<{
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }> & {
                isDeleted: boolean;
                title: string;
                isComplite: boolean;
                isStar: boolean;
                subTaskDueDate: NativeDate;
            }>;
        }>;
        answered_questions: Types.DocumentArray<{
            question?: string | null;
            answer?: string | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            question?: string | null;
            answer?: string | null;
        }> & {
            question?: string | null;
            answer?: string | null;
        }>;
        visibility: "private" | "restricted";
        sharedWith: Types.DocumentArray<{
            role: "viewer";
            userId?: Types.ObjectId | null;
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }> & {
            role: "viewer";
            userId?: Types.ObjectId | null;
        }>;
        linkAccess: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }) | null>;
};
//# sourceMappingURL=project.services.d.ts.map