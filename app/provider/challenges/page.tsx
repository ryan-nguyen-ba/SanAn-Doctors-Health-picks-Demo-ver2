"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, Edit, Trash2 } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  level: string;
  stars: number;
  priority: number;
  isActive: boolean;
}

export default function ProviderChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "睡眠の質改善チャレンジ",
      description: "良質な睡眠を目指す30日間のチャレンジ",
      level: "BEGINNER",
      stars: 4,
      priority: 1,
      isActive: true,
    },
    {
      id: "2",
      title: "疲労回復チャレンジ",
      description: "日々の疲労を軽減する習慣作り",
      level: "INTERMEDIATE",
      stars: 3,
      priority: 2,
      isActive: true,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Challenge>>({
    title: "",
    description: "",
    level: "BEGINNER",
    stars: 0,
    priority: 0,
    isActive: true,
  });

  const handleCreate = () => {
    if (formData.title) {
      const newChallenge: Challenge = {
        id: Date.now().toString(),
        title: formData.title || "",
        description: formData.description || "",
        level: formData.level || "BEGINNER",
        stars: formData.stars || 0,
        priority: formData.priority || 0,
        isActive: formData.isActive ?? true,
      };
      setChallenges([...challenges, newChallenge]);
      setFormData({
        title: "",
        description: "",
        level: "BEGINNER",
        stars: 0,
        priority: 0,
        isActive: true,
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.title) {
      setChallenges(
        challenges.map((c) =>
          c.id === editingId ? { ...c, ...formData } : c
        )
      );
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        level: "BEGINNER",
        stars: 0,
        priority: 0,
        isActive: true,
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("このチャレンジを削除しますか？")) {
      setChallenges(challenges.filter((c) => c.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">チャレンジ管理</h1>
            <p className="text-gray-600">チャレンジの作成と編集</p>
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
                {editingId ? "チャレンジを編集" : "新規チャレンジを作成"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">タイトル</label>
                <Input
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例: 睡眠の質改善チャレンジ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">説明</label>
                <textarea
                  className="w-full p-3 border rounded-xl"
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="チャレンジの説明を入力"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">レベル</label>
                  <select
                    className="w-full p-3 border rounded-xl"
                    value={formData.level || "BEGINNER"}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <option value="BEGINNER">初級</option>
                    <option value="INTERMEDIATE">中級</option>
                    <option value="ADVANCED">上級</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">星の数</label>
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    value={formData.stars || 0}
                    onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">優先度</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.priority || 0}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                  />
                </div>
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
                      title: "",
                      description: "",
                      level: "BEGINNER",
                      stars: 0,
                      priority: 0,
                      isActive: true,
                    });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Challenges List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="card-hover border-2 border-gray-100 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {challenge.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{challenge.level}</Badge>
                        <Badge variant="outline">⭐ {challenge.stars}</Badge>
                        {challenge.isActive ? (
                          <Badge className="bg-green-500">アクティブ</Badge>
                        ) : (
                          <Badge variant="outline">非アクティブ</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{challenge.description}</p>
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(challenge.id);
                      setFormData(challenge);
                    }}
                    className="flex-1 font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(challenge.id)}
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

