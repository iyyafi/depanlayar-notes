import type { JSX } from "solid-js";
import {
  actions,
  isInputError,
  type ErrorInferenceObject,
} from "astro:actions";

export function RegisterForm() {
  let errors: ErrorInferenceObject = {};
  const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { data, error } = await actions.register.safe(formData);

    if (data) {
      alert(data);
    }

    if (error && isInputError(error)) {
      console.log("server", data);
      errors = error.fields;
    }
    console.log(errors);
  };
  return (
    <form onSubmit={onSubmit} method="post">
      <div class="my-5">
        <label for="name">Name asd</label>
        <input id="name" name="name" type="text" class="border" required />
        <span class="text-sm text-red-500">
          {errors.name && errors.name[0]}
        </span>
      </div>
      <div class="my-5">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" class="border" required />
        <span class="text-sm text-red-500">
          {errors.email && errors.email[0]}
        </span>
      </div>
      <div class="my-5">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          class="border"
          required
        />
        <span class="text-sm text-red-500">
          {errors.password && errors.password[0]}
        </span>
      </div>

      <button type="submit" class="bg-green-400 p-5 text-white">
        Register
      </button>
    </form>
  );
}
