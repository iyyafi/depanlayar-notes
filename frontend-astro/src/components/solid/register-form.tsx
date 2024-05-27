import type { JSX } from "solid-js";
import { createSignal } from "solid-js";
import {
  actions,
  isInputError,
  type ErrorInferenceObject,
} from "astro:actions";

export function RegisterForm() {
  const [errors, setErrors] = createSignal<ErrorInferenceObject>({});
  const [isLoading, setLoading] = createSignal(false);

  const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const { data, error } = await actions.register.safe(formData);

    if (error && isInputError(error)) {
      setErrors(error.fields);
      setLoading(false);
      return false;
    }

    if (data) {
      setLoading(false);
      console.log("data", data);
    }
  };

  return (
    <form onSubmit={onSubmit} method="post" class="flex flex-col gap-2">
      <div>
        <label for="name">Name</label>
        <input id="name" name="name" type="text" required />
        <span>{errors().name?.[0]}</span>
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required />
        <span>{errors().email?.[0]}</span>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required />
        <span>{errors().password?.[0]}</span>
      </div>
      <button type="submit" class="mt-2" disabled={isLoading()}>
        {isLoading() ? "Loading..." : "Register"}
      </button>
    </form>
  );
}
