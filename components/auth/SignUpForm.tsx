"use client";

import { useFormState } from "react-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { signUpAction } from "@/app/actions/auth";

const initialState = { error: "" };

export default function SignupForm() {
  const [state, action] = useFormState(signUpAction, initialState);

  return (
    <form
      action={action}
      style={{
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2>Sign Up</h2>

      {state.error && (
        <p style={{ color: "red", fontSize: 14 }}>
          {state.error}
        </p>
      )}

      <Input label="Name" name="name" />
      <Input label="Email" type="email" name="email" />
      <Input label="Password" type="password" name="password" />

      <Button type="submit">Create Account</Button>
    </form>
  );
}
