"use client";

import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignUpForm";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SigninForm from "@/components/auth/SignInForm";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthWrapper
      title="Sign In"
      footerText="Already have an account?"
      footerActionText="Sign Up"
      onFooterAction={() => router.push("/signup")}
    >
      <SigninForm />
    </AuthWrapper>
  );
}
