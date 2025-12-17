"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit, Trash2, Search, CheckSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Mission {
  id: number;
  name: string;
  type: "article" | "video";
  content: string;
  videoUrl: string;
  dayNumber: number;
  points: number;
  relatedSupplements: string[];
}

export default function MissionsPage() {
  const supplements = [
    { id: "1", name: "マグネシウムα" },
    { id: "2", name: "GABA" },
    { id: "3", name: "ビタミンC" },
  ];

  const [missions, setMissions] = useState<Mission[]>([
    { 
      id: 1, 
      name: "朝食を食べる", 
      type: "article",
      content: "毎朝、栄養バランスの取れた朝食を摂取しましょう。",
      videoUrl: "",
      dayNumber: 1,
      points: 10,
      relatedSupplements: ["1"]
    },
    { 
      id: 2, 
      name: "10分間瞑想する", 
      type: "article",
      content: "1日10分間の瞑想でストレスを軽減します。",
      videoUrl: "",
      dayNumber: 1,
      points: 15,
      relatedSupplements: ["2"]
    },
    { 
      id: 3, 
      name: "野菜を3種類食べる", 
      type: "video",
      content: "",
      videoUrl: "https://example.com/video",
      dayNumber: 2,
      points: 30,
      relatedSupplements: ["3"]
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<Omit<Mission, 'id'>>({
    name: "",
    type: "article",
    content: "",
    videoUrl: "",
    dayNumber: 1,
    points: 0,
    relatedSupplements: [],
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      type: "article",
      content: "",
      videoUrl: "",
      dayNumber: 1,
      points: 0,
      relatedSupplements: [],
    });
    setShowModal(true);
  };

  const handleEdit = (mission: Mission) => {
    setEditingId(mission.id);
    setFormData({
      name: mission.name,
      type: mission.type,
      content: mission.content,
      videoUrl: mission.videoUrl,
      dayNumber: mission.dayNumber,
      points: mission.points,
      relatedSupplements: mission.relatedSupplements,
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("このミッションを削除してもよろしいですか？")) {
      setMissions(missions.filter(m => m.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      setMissions(missions.map(m => 
        m.id === editingId ? { id: editingId, ...formData } : m
      ));
    } else {
      const newId = Math.max(...missions.map(m => m.id), 0) + 1;
      setMissions([...missions, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  const toggleSupplement = (supplementId: string) => {
    setFormData({
      ...formData,
      relatedSupplements: formData.relatedSupplements.includes(supplementId)
        ? formData.relatedSupplements.filter(id => id !== supplementId)
        : [...formData.relatedSupplements, supplementId]
    });
  };

  const filteredMissions = missions.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">ミッション管理</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規ミッション作成
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="ミッション名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMissions.map((mission) => (
            <Card key={mission.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all cursor-pointer" onClick={() => handleEdit(mission)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <CheckSquare className="w-5 h-5" style={{ color: '#FFA500' }} />
                    <CardTitle className="font-black text-black">{mission.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(mission)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(mission.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">タイプ: {mission.type === "article" ? "記事" : "動画"}</p>
                <p className="text-sm font-medium text-black">Day: {mission.dayNumber}</p>
                <p className="text-sm font-medium text-black">ポイント: {mission.points}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">検索結果が見つかりません</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">
                    {editingId ? "ミッション編集" : "新規ミッション作成"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">ミッション名</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 朝食を食べる"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">ミッション種別</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "article" | "video" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="article">記事</option>
                    <option value="video">動画</option>
                  </select>
                </div>
                {formData.type === "article" ? (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">コンテンツ本文</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="記事の内容を入力..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={6}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">動画URL</label>
                    <Input
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://example.com/video"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">実施日 (Day番号)</label>
                  <Input
                    type="number"
                    value={formData.dayNumber}
                    onChange={(e) => setFormData({ ...formData, dayNumber: parseInt(e.target.value) || 1 })}
                    placeholder="1"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">付与ポイント</label>
                  <Input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                    placeholder="10"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">関連サプリ（複数選択可）</label>
                  <div className="space-y-2 p-4 border border-gray-200 rounded-md">
                    {supplements.map(supplement => (
                      <div key={supplement.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`supplement-${supplement.id}`}
                          checked={formData.relatedSupplements.includes(supplement.id)}
                          onCheckedChange={() => toggleSupplement(supplement.id)}
                        />
                        <label htmlFor={`supplement-${supplement.id}`} className="text-sm font-medium text-black">
                          {supplement.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3 pt-2">
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 font-bold"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
                  >
                    {editingId ? "更新" : "作成"}
                  </Button>
                  <Button
                    onClick={() => setShowModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    キャンセル
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProviderLayout>
  );
}

