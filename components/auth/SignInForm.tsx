"use client";

import { useFormState } from "react-dom";
import Input from "../ui/Input";
import SubmitButton from "../ui/SubmitButton";
import { signInAction } from "@/app/actions/auth";
import { useSignupValidation } from "@/hooks/UseSignUpValidation";


const initialState = { error: "" };

export default function SigninForm() {
  const [state, action] = useFormState(signInAction, initialState);
  const { errors, validate } = useSignupValidation();

  return (
    <form
      action={(formData) => {
        if (!validate(formData)) return;
        action(formData);
      }}
      className="mx-auto flex w-full max-w-sm flex-col gap-4"
    >
      {/* Server error */}
      {state.error && (
        <p className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      {/* Email */}
      <div>
        <Input label="Email" type="email" name="email" />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <Input label="Password" type="password" name="password" />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      <SubmitButton>Log in</SubmitButton>
    </form>
  );
}
