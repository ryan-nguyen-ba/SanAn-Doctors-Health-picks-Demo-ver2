"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Plus, Edit, Trash2 } from "lucide-react";

interface Mission {
  id: string;
  recipeId: string;
  title: string;
  description: string;
  type: string;
  content: string;
  dayNumber: number;
}

export default function ProviderMissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      recipeId: "1",
      title: "スマホを別の部屋に置く",
      description: "就寝2時間前になったら、スマートフォンを寝室以外の場所に置きます",
      type: "SLEEP",
      content: "スマートフォンのブルーライトは睡眠の質を低下させます",
      dayNumber: 1,
    },
  ]);

  const recipes = [
    { id: "1", title: "寝る2時間前スマホOFF習慣" },
    { id: "2", title: "疲れ知らずのカラダをつくるレシピ" },
  ];

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Mission>>({
    recipeId: "",
    title: "",
    description: "",
    type: "OTHER",
    content: "",
    dayNumber: 1,
  });

  const handleCreate = () => {
    if (formData.title && formData.recipeId) {
      const newMission: Mission = {
        id: Date.now().toString(),
        recipeId: formData.recipeId || "",
        title: formData.title || "",
        description: formData.description || "",
        type: formData.type || "OTHER",
        content: formData.content || "",
        dayNumber: formData.dayNumber || 1,
      };
      setMissions([...missions, newMission]);
      setFormData({
        recipeId: "",
        title: "",
        description: "",
        type: "OTHER",
        content: "",
        dayNumber: 1,
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.title) {
      setMissions(
        missions.map((m) =>
          m.id === editingId ? { ...m, ...formData } : m
        )
      );
      setEditingId(null);
      setFormData({
        recipeId: "",
        title: "",
        description: "",
        type: "OTHER",
        content: "",
        dayNumber: 1,
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("このミッションを削除しますか？")) {
      setMissions(missions.filter((m) => m.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">ミッション管理</h1>
            <p className="text-gray-600">ミニミッションの作成と編集</p>
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
                {editingId ? "ミッションを編集" : "新規ミッションを作成"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">レシピ</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={formData.recipeId || ""}
                  onChange={(e) => setFormData({ ...formData, recipeId: e.target.value })}
                >
                  <option value="">選択してください</option>
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">タイトル</label>
                <Input
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例: スマホを別の部屋に置く"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">説明</label>
                <textarea
                  className="w-full p-3 border rounded-xl"
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="ミッションの説明を入力"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">タイプ</label>
                  <select
                    className="w-full p-3 border rounded-xl"
                    value={formData.type || "OTHER"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="DIET">食事</option>
                    <option value="EXERCISE">運動</option>
                    <option value="SLEEP">睡眠</option>
                    <option value="SUPPLEMENT">サプリ</option>
                    <option value="OTHER">その他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">日数</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.dayNumber || 1}
                    onChange={(e) => setFormData({ ...formData, dayNumber: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">コンテンツ（テキストまたは動画URL）</label>
                <textarea
                  className="w-full p-3 border rounded-xl"
                  rows={3}
                  value={formData.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="テキストコンテンツまたは動画URLを入力"
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
                      recipeId: "",
                      title: "",
                      description: "",
                      type: "OTHER",
                      content: "",
                      dayNumber: 1,
                    });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Missions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <Card
              key={mission.id}
              className="card-hover border-2 border-gray-100 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <CheckSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {mission.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{mission.type}</Badge>
                      <Badge variant="outline">Day {mission.dayNumber}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{mission.description}</p>
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(mission.id);
                      setFormData(mission);
                    }}
                    className="flex-1 font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(mission.id)}
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

