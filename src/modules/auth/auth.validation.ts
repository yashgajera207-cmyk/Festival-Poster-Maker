import { z } from "zod";

export const registerSchema =
  z.object({
    businessName: z
      .string()
      .min(
        2,
        "Business name is required"
      ),

    email: z
      .string()
      .email(
        "Invalid email"
      ),

    mobile: z
      .string()
      .regex(
        /^[+]?[0-9]{10,13}$/,
        "Invalid mobile number"
      ),

    address: z
      .string()
      .min(
        5,
        "Address is required"
      ),

    logoUrl: z
      .string()
      .url(
        "Invalid logo URL"
      ),

    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),
  });

export const loginSchema =
  z.object({
    email: z
      .string()
      .email(
        "Invalid email"
      ),

    password: z
      .string()
      .min(6),
  });

export type RegisterSchema =
  z.infer<
    typeof registerSchema
  >;

export type LoginSchema =
  z.infer<
    typeof loginSchema
  >;