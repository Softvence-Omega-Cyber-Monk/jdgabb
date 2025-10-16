import z from "zod";
export declare const createUserValidationZodSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
//# sourceMappingURL=user.validation.d.ts.map