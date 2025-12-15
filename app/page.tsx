import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function Home() {
  const session = await getSession();

  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin/dashboard");
    } else if (session.user.role === "PROVIDER") {
      redirect("/provider/dashboard");
    } else {
      redirect("/home");
    }
  } else {
    redirect("/signin");
  }
}
