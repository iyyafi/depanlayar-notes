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
      <div>
        <label for="name">Name asd</label>
        <input id="name" name="name" type="text" required />
        <span>{errors.name && errors.name[0]}</span>
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required />
        <span>{errors.email && errors.email[0]}</span>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required />
        <span>{errors.password && errors.password[0]}</span>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
