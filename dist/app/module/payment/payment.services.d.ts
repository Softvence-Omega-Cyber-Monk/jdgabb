import { Types } from "mongoose";
export declare const paymentService: {
    checkout: (data: {
        userId: Types.ObjectId;
        email: string;
        amount: number;
        paymentType: string;
    }) => Promise<{
        success: boolean;
        sessionId: string;
        paymentUrl: string | null;
    }>;
};
//# sourceMappingURL=payment.services.d.ts.map