import z from "zod";

export const createUserValidationZodSchema = z.object({
    email: z.string().email({ message: "Invalid email formate" }),
    password: z.string().min(6, { message: "Password to short. Minimun 6 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" })
});


