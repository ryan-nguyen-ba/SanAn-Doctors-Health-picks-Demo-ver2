"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("メールアドレスまたはパスワードが正しくありません");
        setLoading(false);
      } else {
        // Wait a bit for session to update, then redirect
        // The root page will handle proper redirect based on role
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("ログインに失敗しました");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      <Card className="w-full max-w-md relative z-10 shadow-large border-2 border-white/20">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-3">
            Health Picks
          </CardTitle>
          <p className="text-gray-700 font-medium">ログイン</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl text-sm font-medium animate-slide-up">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">メールアドレス</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                className="rounded-xl border-2 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">パスワード</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="rounded-xl border-2 focus:border-primary"
              />
            </div>
            <Button type="submit" className="w-full font-bold shadow-large hover:shadow-glow" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-primary-light/20 rounded-xl border border-primary/10">
            <p className="mb-2 text-sm font-bold text-gray-900">デモアカウント:</p>
            <p className="text-xs text-gray-700 mb-1">従業員: employee@example.com / password123</p>
            <p className="text-xs text-gray-700 mb-1">管理者: admin@example.com / password123</p>
            <p className="text-xs text-gray-700">プロバイダー: provider@example.com / password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

