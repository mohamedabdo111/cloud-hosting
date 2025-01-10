import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be string only",
    })
    .min(3)
    .max(50),
  discription: z
    .string({
      required_error: "discription is required",
      invalid_type_error: "discription must be string only",
    })
    .min(3)
    .max(100),
});

export const createUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be string only",
    })
    .min(3)
    .max(50),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be string only",
    })
    .email(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be string only",
    })
    .min(3)
    .max(50),
});

export const LoginUserShema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be string only",
    })
    .email(),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(3)
    .max(15),
});

export const createCommentSchema = z.object({
  comment: z
    .string({
      required_error: "comment is required",
      invalid_type_error: "comment must be string only",
    })
    .min(3)
    .max(100),
  userId: z
    .number({
      required_error: "userId is required",
      invalid_type_error: "userId must be number only",
    })
    .int(),
  articleId: z
    .number({
      required_error: "articleId is required",
      invalid_type_error: "articleId must be number only",
    })
    .int(),
});

export const PUTComment = z.object({
  comment: z.string({
    required_error: "comment is required",
  }),
});
