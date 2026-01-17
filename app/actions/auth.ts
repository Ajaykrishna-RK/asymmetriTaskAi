"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
};

export async function signUpAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    await auth.api.signUpEmail({
      body: { email, password, name },
    });

    redirect("/");
  } catch (error: any) {
    return {
      error:
        error?.message ||
        "Unable to sign up. Please check your details.",
    };
  }
}

export async function signInAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: { email, password },
    });

    redirect("/");
  } catch (error: any) {
    return { error: "Invalid email or password" };
  }
}


export async function signOutFunction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}
