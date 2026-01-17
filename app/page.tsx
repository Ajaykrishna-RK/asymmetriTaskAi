import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Home() {


  const session = await auth.api.getSession({
    headers: await headers()
  })
  console.log(session, "session")

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {!session ? <h1>SIGNIN</h1> : <h1>AI TASK</h1>}
    </div>
  );
}
