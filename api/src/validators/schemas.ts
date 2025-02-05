import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(240, "Content must be 240 characters or less"),
});

export const updatePostSchema = createPostSchema.partial();

export const getPostSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(120, "Content must be 120 characters or less"),
});

export const updateCommentSchema = createCommentSchema.partial();

export const getCommentsSchema = z.object({
  postId: z.coerce.number().int().positive(),
});

export const getCommentSchema = z.object({
  postId: z.coerce.number().int().positive(),
  commentId: z.coerce.number().int().positive(),
});

export const queryParamsSchema = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  username: z.string().optional(),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (value) => {
        return (
          /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)
        );
      },
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      },
    ),
});

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});
