"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit, Trash2, Search, BookOpen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Recipe {
  id: number;
  name: string;
  challenge: string;
  challengeId: string;
  dayNumber: number;
  difficulty: string;
  contentComposition: {
    diet: boolean;
    exercise: boolean;
    sleep: boolean;
    supplement: boolean;
  };
  expertComment: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    { 
      id: 1, 
      name: "スマホ断ちレシピ", 
      challenge: "睡眠改善", 
      challengeId: "1",
      dayNumber: 1,
      difficulty: "簡単",
      contentComposition: { diet: false, exercise: false, sleep: true, supplement: true },
      expertComment: "就寝前のブルーライトを避けることで、自然な睡眠リズムを整えます。"
    },
    { 
      id: 2, 
      name: "朝ウォーキングレシピ", 
      challenge: "運動習慣", 
      challengeId: "2",
      dayNumber: 1,
      difficulty: "普通",
      contentComposition: { diet: false, exercise: true, sleep: false, supplement: false },
      expertComment: "朝の運動は体内時計を整え、一日の活力を高めます。"
    },
    { 
      id: 3, 
      name: "野菜中心食レシピ", 
      challenge: "食事改善", 
      challengeId: "3",
      dayNumber: 1,
      difficulty: "簡単",
      contentComposition: { diet: true, exercise: false, sleep: false, supplement: false },
      expertComment: "バランスの取れた食事は健康の基盤です。"
    },
  ]);

  const challenges = [
    { id: "1", name: "睡眠改善" },
    { id: "2", name: "運動習慣" },
    { id: "3", name: "食事改善" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<Omit<Recipe, 'id'>>({
    name: "",
    challenge: "",
    challengeId: "",
    dayNumber: 1,
    difficulty: "簡単",
    contentComposition: { diet: false, exercise: false, sleep: false, supplement: false },
    expertComment: "",
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      challenge: "",
      challengeId: "",
      dayNumber: 1,
      difficulty: "簡単",
      contentComposition: { diet: false, exercise: false, sleep: false, supplement: false },
      expertComment: "",
    });
    setShowModal(true);
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingId(recipe.id);
    setFormData({
      name: recipe.name,
      challenge: recipe.challenge,
      challengeId: recipe.challengeId,
      dayNumber: recipe.dayNumber,
      difficulty: recipe.difficulty,
      contentComposition: recipe.contentComposition,
      expertComment: recipe.expertComment,
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("このレシピを削除してもよろしいですか？")) {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  };

  const handleSubmit = () => {
    const selectedChallenge = challenges.find(c => c.id === formData.challengeId);
    if (editingId) {
      setRecipes(recipes.map(r => 
        r.id === editingId ? { 
          ...r, 
          ...formData,
          challenge: selectedChallenge?.name || formData.challenge
        } : r
      ));
    } else {
      const newId = Math.max(...recipes.map(r => r.id), 0) + 1;
      setRecipes([...recipes, { 
        id: newId, 
        ...formData,
        challenge: selectedChallenge?.name || formData.challenge
      }]);
    }
    setShowModal(false);
  };

  const filteredRecipes = recipes.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.challenge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">レシピ管理</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規レシピ作成
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="レシピ名またはチャレンジで検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all cursor-pointer" onClick={() => handleEdit(recipe)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <BookOpen className="w-5 h-5" style={{ color: '#FFA500' }} />
                    <CardTitle className="font-black text-black">{recipe.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">チャレンジ: {recipe.challenge}</p>
                <p className="text-sm font-medium text-black">難易度: {recipe.difficulty}</p>
                <p className="text-sm font-medium text-black">Day: {recipe.dayNumber}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
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
                    {editingId ? "レシピ編集" : "新規レシピ作成"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">レシピ名</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: スマホ断ちレシピ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">チャレンジ</label>
                  <select
                    value={formData.challengeId}
                    onChange={(e) => {
                      const selected = challenges.find(c => c.id === e.target.value);
                      setFormData({ ...formData, challengeId: e.target.value, challenge: selected?.name || "" });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">選択してください</option>
                    {challenges.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">実施日数 (Day番号)</label>
                  <Input
                    type="number"
                    value={formData.dayNumber}
                    onChange={(e) => setFormData({ ...formData, dayNumber: parseInt(e.target.value) || 1 })}
                    placeholder="1"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">難易度</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="簡単">簡単</option>
                    <option value="普通">普通</option>
                    <option value="難しい">難しい</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">構成内容</label>
                  <div className="space-y-2 p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="diet"
                        checked={formData.contentComposition.diet}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          contentComposition: { ...formData.contentComposition, diet: checked as boolean }
                        })}
                      />
                      <label htmlFor="diet" className="text-sm font-medium text-black">食事</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exercise"
                        checked={formData.contentComposition.exercise}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          contentComposition: { ...formData.contentComposition, exercise: checked as boolean }
                        })}
                      />
                      <label htmlFor="exercise" className="text-sm font-medium text-black">運動</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sleep"
                        checked={formData.contentComposition.sleep}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          contentComposition: { ...formData.contentComposition, sleep: checked as boolean }
                        })}
                      />
                      <label htmlFor="sleep" className="text-sm font-medium text-black">睡眠</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="supplement"
                        checked={formData.contentComposition.supplement}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          contentComposition: { ...formData.contentComposition, supplement: checked as boolean }
                        })}
                      />
                      <label htmlFor="supplement" className="text-sm font-medium text-black">サプリ</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">専門家コメント（任意）</label>
                  <textarea
                    value={formData.expertComment}
                    onChange={(e) => setFormData({ ...formData, expertComment: e.target.value })}
                    placeholder="専門家からのコメントを入力..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                  />
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

