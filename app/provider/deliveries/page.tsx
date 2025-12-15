"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Edit, Trash2, FileText, Video } from "lucide-react";

interface Delivery {
  id: string;
  type: "ARTICLE" | "VIDEO";
  challengeId?: string;
  recipeId?: string;
  missionId?: string;
  url: string;
  scheduledFor: string;
  deliveredAt?: string;
}

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "1",
      type: "ARTICLE",
      challengeId: "1",
      url: "https://example.com/article/1",
      scheduledFor: "2024-01-20T10:00:00",
    },
    {
      id: "2",
      type: "VIDEO",
      recipeId: "1",
      url: "https://example.com/video/1",
      scheduledFor: "2024-01-21T14:00:00",
      deliveredAt: "2024-01-21T14:00:00",
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Delivery>>({
    type: "ARTICLE",
    challengeId: "",
    recipeId: "",
    missionId: "",
    url: "",
    scheduledFor: "",
  });

  const challenges = [
    { id: "1", title: "睡眠の質改善チャレンジ" },
    { id: "2", title: "疲労回復チャレンジ" },
  ];

  const recipes = [
    { id: "1", title: "寝る2時間前スマホOFF習慣" },
  ];

  const handleCreate = () => {
    if (formData.url && formData.scheduledFor) {
      const newDelivery: Delivery = {
        id: Date.now().toString(),
        type: formData.type || "ARTICLE",
        challengeId: formData.challengeId || undefined,
        recipeId: formData.recipeId || undefined,
        missionId: formData.missionId || undefined,
        url: formData.url || "",
        scheduledFor: formData.scheduledFor || "",
      };
      setDeliveries([...deliveries, newDelivery]);
      setFormData({
        type: "ARTICLE",
        challengeId: "",
        recipeId: "",
        missionId: "",
        url: "",
        scheduledFor: "",
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.url) {
      setDeliveries(
        deliveries.map((d) =>
          d.id === editingId ? { ...d, ...formData } : d
        )
      );
      setEditingId(null);
      setFormData({
        type: "ARTICLE",
        challengeId: "",
        recipeId: "",
        missionId: "",
        url: "",
        scheduledFor: "",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("この配信スケジュールを削除しますか？")) {
      setDeliveries(deliveries.filter((d) => d.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">配信スケジュール管理</h1>
            <p className="text-gray-600">記事・動画の配信スケジュール設定</p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規スケジュール
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <Card className="mb-6 shadow-medium border-2 border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                {editingId ? "配信スケジュールを編集" : "新規配信スケジュールを作成"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">配信タイプ</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={formData.type || "ARTICLE"}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "ARTICLE" | "VIDEO" })}
                >
                  <option value="ARTICLE">記事</option>
                  <option value="VIDEO">動画</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">関連チャレンジ</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={formData.challengeId || ""}
                  onChange={(e) => setFormData({ ...formData, challengeId: e.target.value, recipeId: "", missionId: "" })}
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
                <label className="block text-sm font-medium mb-2">関連レシピ</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={formData.recipeId || ""}
                  onChange={(e) => setFormData({ ...formData, recipeId: e.target.value, missionId: "" })}
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
                <label className="block text-sm font-medium mb-2">URL</label>
                <Input
                  value={formData.url || ""}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/article/1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">配信日時</label>
                <Input
                  type="datetime-local"
                  value={formData.scheduledFor || ""}
                  onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
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
                      type: "ARTICLE",
                      challengeId: "",
                      recipeId: "",
                      missionId: "",
                      url: "",
                      scheduledFor: "",
                    });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deliveries List */}
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <Card
              key={delivery.id}
              className="card-hover border-2 border-gray-100 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 bg-primary-light rounded-lg">
                      {delivery.type === "ARTICLE" ? (
                        <FileText className="w-6 h-6 text-primary" />
                      ) : (
                        <Video className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant={delivery.type === "ARTICLE" ? "default" : "secondary"}>
                          {delivery.type === "ARTICLE" ? "記事" : "動画"}
                        </Badge>
                        {delivery.deliveredAt ? (
                          <Badge className="bg-green-500">配信済み</Badge>
                        ) : (
                          <Badge variant="outline">予約済み</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 break-all">{delivery.url}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>配信予定: {new Date(delivery.scheduledFor).toLocaleString("ja-JP")}</span>
                        </div>
                        {delivery.deliveredAt && (
                          <span>配信日時: {new Date(delivery.deliveredAt).toLocaleString("ja-JP")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingId(delivery.id);
                        setFormData(delivery);
                      }}
                      className="font-semibold"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      編集
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(delivery.id)}
                      className="font-semibold text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      削除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

