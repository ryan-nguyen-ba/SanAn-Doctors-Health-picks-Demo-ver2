"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Edit, Trash2, Search, Target, Users } from "lucide-react";

interface Challenge {
  id: number;
  name: string;
  participants: number;
  status: string;
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, name: "睡眠改善チャレンジ", participants: 150, status: "アクティブ" },
    { id: 2, name: "運動習慣チャレンジ", participants: 200, status: "アクティブ" },
    { id: 3, name: "食事改善チャレンジ", participants: 180, status: "終了" },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("全て");
  const [formData, setFormData] = useState({ name: "", participants: 0, status: "アクティブ" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: "", participants: 0, status: "アクティブ" });
    setShowModal(true);
  };

  const handleEdit = (challenge: Challenge) => {
    setEditingId(challenge.id);
    setFormData({ name: challenge.name, participants: challenge.participants, status: challenge.status });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("このチャレンジを削除してもよろしいですか？")) {
      setChallenges(challenges.filter(c => c.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      setChallenges(challenges.map(c => 
        c.id === editingId ? { ...c, ...formData } : c
      ));
    } else {
      const newId = Math.max(...challenges.map(c => c.id), 0) + 1;
      setChallenges([...challenges, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  const filteredChallenges = challenges.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "全て" || c.status === filterStatus)
  );

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">チャレンジ管理</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規チャレンジ作成
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="チャレンジ名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["全て", "アクティブ", "終了"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                style={filterStatus === status ? { background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' } : {}}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <Target className="w-5 h-5" style={{ color: '#FFA500' }} />
                    <CardTitle className="font-black text-sm text-black">{challenge.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(challenge)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(challenge.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-black" />
                  <p className="text-sm font-medium text-black">参加者: {challenge.participants}人</p>
                </div>
                <Badge 
                  className={`${
                    challenge.status === "アクティブ" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {challenge.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">検索結果が見つかりません</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">
                    {editingId ? "チャレンジ編集" : "新規チャレンジ作成"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">チャレンジ名</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 睡眠改善チャレンジ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">参加者数</label>
                  <Input
                    type="number"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">ステータス</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="アクティブ">アクティブ</option>
                    <option value="終了">終了</option>
                  </select>
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

