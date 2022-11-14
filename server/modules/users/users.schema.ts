 import { object, TypeOf, string } from "zod";
export const registerUsersSchema = {
  body: object({
    username: string({
      required_error: "username is required!!!",
    }),
    email: string({
      required_error: "email id is required!!!",
    }).email("must be a valid email!!!"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password must be atleast 6 characters long!!!")
      .max(64, "password must be atmost 64 characters long!!!"),
    confirmPassword: string({
      required_error: "pls confirm Password!!!",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};
export type RegisterUserBody = TypeOf<typeof registerUsersSchema.body>;
