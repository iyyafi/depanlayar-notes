import { defineAction, z } from "astro:actions";

export const server = {
  register: defineAction({
    accept: "form",
    input: z.object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid email address" }),
      password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      }),
    }),
    handler: async (register) => {
      console.log("register", register);
      return "Thank you!";
    },
  }),
};
