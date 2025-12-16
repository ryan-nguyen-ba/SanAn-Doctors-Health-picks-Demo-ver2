"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecipesPage() {
  const mockRecipes = [
    { id: 1, name: "スマホ断ちレシピ", challenge: "睡眠改善", difficulty: "簡単" },
    { id: 2, name: "朝ウォーキングレシピ", challenge: "運動習慣", difficulty: "普通" },
    { id: 3, name: "野菜中心食レシピ", challenge: "食事改善", difficulty: "簡単" },
  ];

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">レシピ管理</h1>
          <Button style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}>
            新規レシピ作成
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <CardTitle className="font-black text-black">{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">チャレンジ: {recipe.challenge}</p>
                <p className="text-sm font-medium text-black">難易度: {recipe.difficulty}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

