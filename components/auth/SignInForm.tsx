"use client";

import { useFormState } from "react-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { signInAction } from "@/app/actions/auth";

const initialState = { error: "" };

export default function SigninForm() {
  const [state, action] = useFormState(signInAction, initialState);

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
      <h2>Log in</h2>

      {state.error && (
        <p style={{ color: "red", fontSize: 14 }}>
          {state.error}
        </p>
      )}

      <Input label="Email" type="email" name="email" />
      <Input label="Password" type="password" name="password" />

      <Button type="submit">Log in</Button>
    </form>
  );
}
