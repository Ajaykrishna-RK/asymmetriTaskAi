"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

export default function SubmitButton({
  
  children,
}: {
  children: string;

}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full"
    >
      {pending ? "Loading..." : children}
    </Button>
  );
}
