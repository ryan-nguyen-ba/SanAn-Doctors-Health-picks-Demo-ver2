"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Bell, FileText } from "lucide-react";

export default function DeepLinkPage() {
  const params = useParams();
  const router = useRouter();
  const [type, setType] = useState<"REMINDER" | "SURVEY" | null>(null);

  useEffect(() => {
    // Extract type from token or URL params (for demo, check query params)
    const urlParams = new URLSearchParams(window.location.search);
    const linkType = urlParams.get("type") as "REMINDER" | "SURVEY" | null;
    setType(linkType || "REMINDER"); // Default to REMINDER for demo
  }, []);

  const handleRedirect = () => {
    if (type === "REMINDER") {
      router.push("/supplements");
    } else if (type === "SURVEY") {
      router.push("/questionnaire");
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      <Card className="max-w-md w-full relative z-10 shadow-large border-2 border-white/20">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary-light rounded-full">
              {type === "REMINDER" ? (
                <Bell className="w-8 h-8 text-primary" />
              ) : type === "SURVEY" ? (
                <FileText className="w-8 h-8 text-primary" />
              ) : (
                <CheckCircle className="w-8 h-8 text-primary" />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            リマインダーからアクセスしました
          </CardTitle>
          <p className="text-gray-600 text-sm">
            {type === "REMINDER"
              ? "サプリメントの服用時間です。記録を確認してください。"
              : type === "SURVEY"
              ? "アンケートの回答をお願いします。"
              : "リンクからアクセスしました。"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleRedirect}
            className="w-full font-bold shadow-large hover:shadow-glow"
          >
            {type === "REMINDER"
              ? "サプリメントページへ"
              : type === "SURVEY"
              ? "アンケートを開始"
              : "ホームへ戻る"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/home")}
            className="w-full font-semibold"
          >
            後で
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

