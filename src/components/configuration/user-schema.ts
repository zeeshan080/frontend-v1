import { z } from "zod";
// Define your schema
export const userSchema = z.object({
    username: z.string().min(1, "username is required"),
    email: z.string().min(1, "email is required").email("email must be a valid email address"),
    password: z.string()
        .min(7, "password must be more than 6 characters")
        .regex(/[A-Z]/, "password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "password must contain at least one symbol"),
    role: z.string().uuid("role must be a valid UUID"),
    is_active:z.boolean().default(false),
    is_superuser:z.boolean().default(false)
});

export const userSchemaWithId = userSchema.extend({
    id: z.string().uuid("id must be a valid UUID"),
});

export type UserSchema = z.infer<typeof userSchemaWithId>;