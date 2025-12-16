"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit, Trash2, Search } from "lucide-react";

interface Ingredient {
  id: number;
  name: string;
  category: string;
  stock: number;
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: "ビタミンC", category: "ビタミン", stock: 1000 },
    { id: 2, name: "GABA", category: "アミノ酸", stock: 500 },
    { id: 3, name: "マグネシウム", category: "ミネラル", stock: 750 },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", category: "", stock: 0 });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", stock: 0 });
    setShowModal(true);
  };

  const handleEdit = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setFormData({ name: ingredient.name, category: ingredient.category, stock: ingredient.stock });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("この成分を削除してもよろしいですか？")) {
      setIngredients(ingredients.filter(i => i.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      setIngredients(ingredients.map(i => 
        i.id === editingId ? { ...i, ...formData } : i
      ));
    } else {
      const newId = Math.max(...ingredients.map(i => i.id), 0) + 1;
      setIngredients([...ingredients, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  const filteredIngredients = ingredients.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">成分管理</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規成分追加
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="成分名またはカテゴリーで検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIngredients.map((ingredient) => (
            <Card key={ingredient.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="font-black text-black">{ingredient.name}</CardTitle>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(ingredient)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(ingredient.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">カテゴリー: {ingredient.category}</p>
                <p className="text-sm font-medium text-black">在庫: {ingredient.stock}g</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
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
                    {editingId ? "成分編集" : "新規成分追加"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">成分名</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: ビタミンC"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">カテゴリー</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="例: ビタミン"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">在庫 (g)</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    placeholder="1000"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 font-bold"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
                  >
                    {editingId ? "更新" : "追加"}
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

