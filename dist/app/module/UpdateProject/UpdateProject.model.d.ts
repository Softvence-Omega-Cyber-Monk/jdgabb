import mongoose from "mongoose";
export declare const UpdateProject: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }> & {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }> & {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }> & {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }> & {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }> & {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    goal: string;
    tasks: mongoose.Types.DocumentArray<{
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }> & {
        isDeleted: boolean;
        task: string;
        details: string;
        taskDueDate: NativeDate;
        isComplite: boolean;
        isArchived: boolean;
        isStar: boolean;
        subtasks: mongoose.Types.DocumentArray<{
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }> & {
            isDeleted: boolean;
            title: string;
            isComplite: boolean;
            isStar: boolean;
            subtasks: any[];
            subTaskDueDate: NativeDate;
        }>;
    }>;
    answered_questions: mongoose.Types.DocumentArray<{
        question?: string | null;
        answer?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        question?: string | null;
        answer?: string | null;
    }> & {
        question?: string | null;
        answer?: string | null;
    }>;
    visibility: "private" | "restricted";
    sharedWith: mongoose.Types.DocumentArray<{
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }> & {
        role: "viewer";
        userId?: mongoose.Types.ObjectId | null;
    }>;
    linkAccess: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=UpdateProject.model.d.ts.map