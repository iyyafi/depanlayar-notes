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
    handler: async (formData, context) => {
      // Todo: need to test the cookies
      try {
        const response = await fetch(
          `http://localhost:1337/api/auth/local/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              password: formData.password,
              email: formData.email,
              username: formData.email.replace("@", "").replace(".", ""),
            }),
          },
        );

        const result = await response.json();
        context.cookies.set("jwt", result.data.jwt, {
          path: "/",
          httpOnly: true,
        });
        context.cookies.set("userData", result.data.user, {
          path: "/",
          httpOnly: true,
        });
      } catch (error) {
        console.error("Error:", error);
      }

      return context.redirect("/");
    },
  }),
};
