"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Edit, Trash2 } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  nameEn: string;
  nutrients: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    vitamins?: string[];
  };
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: "1",
      name: "マグネシウム",
      nameEn: "Magnesium",
      nutrients: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        vitamins: ["ビタミンB6"],
      },
    },
    {
      id: "2",
      name: "GABA",
      nameEn: "Gamma-Aminobutyric Acid",
      nutrients: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    },
    {
      id: "3",
      name: "ビタミンD",
      nameEn: "Vitamin D",
      nutrients: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        vitamins: ["ビタミンD3"],
      },
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Ingredient>>({
    name: "",
    nameEn: "",
    nutrients: {},
  });

  const handleCreate = () => {
    if (formData.name) {
      const newIngredient: Ingredient = {
        id: Date.now().toString(),
        name: formData.name,
        nameEn: formData.nameEn || "",
        nutrients: formData.nutrients || {},
      };
      setIngredients([...ingredients, newIngredient]);
      setFormData({ name: "", nameEn: "", nutrients: {} });
      setIsCreating(false);
    }
  };

  const handleEdit = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setFormData(ingredient);
  };

  const handleUpdate = () => {
    if (editingId && formData.name) {
      setIngredients(
        ingredients.map((ing) =>
          ing.id === editingId ? { ...ing, ...formData } : ing
        )
      );
      setEditingId(null);
      setFormData({ name: "", nameEn: "", nutrients: {} });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("この成分を削除しますか？")) {
      setIngredients(ingredients.filter((ing) => ing.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">成分管理</h1>
            <p className="text-gray-600">栄養成分の登録と管理</p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規登録
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <Card className="mb-6 shadow-medium border-2 border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                {editingId ? "成分を編集" : "新規成分を登録"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">成分名（日本語）</label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例: マグネシウム"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">成分名（英語）</label>
                <Input
                  value={formData.nameEn || ""}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="例: Magnesium"
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
                    setFormData({ name: "", nameEn: "", nutrients: {} });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ingredients List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => (
            <Card
              key={ingredient.id}
              className="card-hover border-2 border-gray-100 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {ingredient.name}
                      </CardTitle>
                      {ingredient.nameEn && (
                        <p className="text-sm text-gray-500 mt-1">{ingredient.nameEn}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {ingredient.nutrients.vitamins && ingredient.nutrients.vitamins.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2">含有ビタミン</p>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.nutrients.vitamins.map((vitamin, idx) => (
                        <Badge key={idx} variant="secondary">
                          {vitamin}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(ingredient)}
                    className="flex-1 font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(ingredient.id)}
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

