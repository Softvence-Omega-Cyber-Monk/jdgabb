interface SendEmailOptions {
    to: string;
    subject: string;
    text: string;
}
export declare const sendEmail: ({ to, subject, text }: SendEmailOptions) => Promise<void>;
export {};
//# sourceMappingURL=sendEmail.d.ts.map