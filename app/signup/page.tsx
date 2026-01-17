import SignupForm from "@/components/auth/SignUpForm";


export default function SignupPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SignupForm />
    </div>
  );
}
