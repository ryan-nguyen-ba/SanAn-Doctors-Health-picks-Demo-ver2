import { redirect } from "next/navigation";

export default function ProviderRootPage() {
  // For the demo, redirect /provider to the main provider dashboard
  redirect("/provider/dashboard");
}


