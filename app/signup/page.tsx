"use client";

import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignUpForm";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthWrapper
      title="Create Account"
      footerText="Already have an account?"
      footerActionText="Sign In"
      onFooterAction={() => router.push("/signin")}
    >
      <SignupForm />
    </AuthWrapper>
  );
}
