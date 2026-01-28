import { NextFunction, Request, Response } from "express";
export declare const revenueCatWebhook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const PaymentController: {
    createPaymentSession: (req: Request, res: Response, next: NextFunction) => void;
    stripeWebhook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllPayment: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=payment.controller.d.ts.map