"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Edit, Trash2 } from "lucide-react";

interface Recipe {
  id: string;
  challengeId: string;
  title: string;
  description: string;
  duration: number;
  objective: string;
  expertComment: string;
}

export default function ProviderRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      challengeId: "1",
      title: "寝る2時間前スマホOFF習慣",
      description: "スマートフォンのブルーライトを避け、良質な睡眠を促進する習慣",
      duration: 14,
      objective: "睡眠の質向上",
      expertComment: "ブルーライトはメラトニンの分泌を抑制します",
    },
  ]);

  const challenges = [
    { id: "1", title: "睡眠の質改善チャレンジ" },
    { id: "2", title: "疲労回復チャレンジ" },
  ];

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Recipe>>({
    challengeId: "",
    title: "",
    description: "",
    duration: 14,
    objective: "",
    expertComment: "",
  });

  const handleCreate = () => {
    if (formData.title && formData.challengeId) {
      const newRecipe: Recipe = {
        id: Date.now().toString(),
        challengeId: formData.challengeId || "",
        title: formData.title || "",
        description: formData.description || "",
        duration: formData.duration || 14,
        objective: formData.objective || "",
        expertComment: formData.expertComment || "",
      };
      setRecipes([...recipes, newRecipe]);
      setFormData({
        challengeId: "",
        title: "",
        description: "",
        duration: 14,
        objective: "",
        expertComment: "",
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.title) {
      setRecipes(
        recipes.map((r) =>
          r.id === editingId ? { ...r, ...formData } : r
        )
      );
      setEditingId(null);
      setFormData({
        challengeId: "",
        title: "",
        description: "",
        duration: 14,
        objective: "",
        expertComment: "",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("このレシピを削除しますか？")) {
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">レシピ管理</h1>
            <p className="text-gray-600">レシピの作成と編集</p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規作成
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <Card className="mb-6 shadow-medium border-2 border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                {editingId ? "レシピを編集" : "新規レシピを作成"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">チャレンジ</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={formData.challengeId || ""}
                  onChange={(e) => setFormData({ ...formData, challengeId: e.target.value })}
                >
                  <option value="">選択してください</option>
                  {challenges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">タイトル</label>
                <Input
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例: 寝る2時間前スマホOFF習慣"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">説明</label>
                <textarea
                  className="w-full p-3 border rounded-xl"
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="レシピの説明を入力"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">期間（日数）</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.duration || 14}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 14 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">目的</label>
                  <Input
                    value={formData.objective || ""}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    placeholder="例: 睡眠の質向上"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">専門家コメント</label>
                <textarea
                  className="w-full p-3 border rounded-xl"
                  rows={3}
                  value={formData.expertComment || ""}
                  onChange={(e) => setFormData({ ...formData, expertComment: e.target.value })}
                  placeholder="専門家のコメントを入力"
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={editingId ? handleUpdate : handleCreate}
                  className="font-semibold shadow-sm"
                >
                  保存
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setFormData({
                      challengeId: "",
                      title: "",
                      description: "",
                      duration: 14,
                      objective: "",
                      expertComment: "",
                    });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recipes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="card-hover border-2 border-gray-100 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {recipe.title}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {recipe.duration}日間
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                <p className="text-xs text-gray-500">目的: {recipe.objective}</p>
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(recipe.id);
                      setFormData(recipe);
                    }}
                    className="flex-1 font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(recipe.id)}
                    className="flex-1 font-semibold text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    削除
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

