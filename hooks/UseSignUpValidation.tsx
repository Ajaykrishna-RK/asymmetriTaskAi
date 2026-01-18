"use client";

import { useState } from "react";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

export function useSignupValidation() {
  const [errors, setErrors] = useState<Errors>({});

  const validate = (formData: FormData) => {
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    const newErrors: Errors = {};

    // ✅ Validate name ONLY if it exists in the form
    if (name !== null) {
      if (!name.trim() || name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
}
