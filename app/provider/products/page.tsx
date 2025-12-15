"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Edit, Trash2, ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  ingredientIds: string[];
  externalLink: string;
  affiliateApiUrl: string;
  affiliateApiKey: string;
  purchaseUrl: string;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "マグネシウムα",
      nameEn: "Magnesium Alpha",
      description: "睡眠の質向上に効果的なマグネシウムサプリメント",
      ingredientIds: ["1"],
      externalLink: "https://example.com/product/1",
      affiliateApiUrl: "https://api.example.com/affiliate",
      affiliateApiKey: "key_123456",
      purchaseUrl: "https://example.com/purchase/1",
    },
    {
      id: "2",
      name: "GABAサプリ",
      nameEn: "GABA Supplement",
      description: "リラックス効果のあるGABAサプリメント",
      ingredientIds: ["2"],
      externalLink: "https://example.com/product/2",
      affiliateApiUrl: "https://api.example.com/affiliate",
      affiliateApiKey: "key_123456",
      purchaseUrl: "https://example.com/purchase/2",
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    nameEn: "",
    description: "",
    ingredientIds: [],
    externalLink: "",
    affiliateApiUrl: "",
    affiliateApiKey: "",
    purchaseUrl: "",
  });

  const ingredients = [
    { id: "1", name: "マグネシウム" },
    { id: "2", name: "GABA" },
    { id: "3", name: "ビタミンD" },
  ];

  const handleCreate = () => {
    if (formData.name) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || "",
        nameEn: formData.nameEn || "",
        description: formData.description || "",
        ingredientIds: formData.ingredientIds || [],
        externalLink: formData.externalLink || "",
        affiliateApiUrl: formData.affiliateApiUrl || "",
        affiliateApiKey: formData.affiliateApiKey || "",
        purchaseUrl: formData.purchaseUrl || "",
      };
      setProducts([...products, newProduct]);
      setFormData({
        name: "",
        nameEn: "",
        description: "",
        ingredientIds: [],
        externalLink: "",
        affiliateApiUrl: "",
        affiliateApiKey: "",
        purchaseUrl: "",
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.name) {
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p
        )
      );
      setEditingId(null);
      setFormData({
        name: "",
        nameEn: "",
        description: "",
        ingredientIds: [],
        externalLink: "",
        affiliateApiUrl: "",
        affiliateApiKey: "",
        purchaseUrl: "",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("この商品を削除しますか？")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">商品管理</h1>
            <p className="text-gray-600">商品の登録とアフィリエイト設定</p>
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
                {editingId ? "商品を編集" : "新規商品を登録"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">商品名（日本語）</label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: マグネシウムα"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">商品名（英語）</label>
                  <Input
                    value={formData.nameEn || ""}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="例: Magnesium Alpha"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">説明</label>
                <textarea
                  className="w-full p-3 border rounded-xl"
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="商品の説明を入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">使用成分</label>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <Badge
                      key={ing.id}
                      variant={
                        formData.ingredientIds?.includes(ing.id) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => {
                        const ids = formData.ingredientIds || [];
                        setFormData({
                          ...formData,
                          ingredientIds: ids.includes(ing.id)
                            ? ids.filter((id) => id !== ing.id)
                            : [...ids, ing.id],
                        });
                      }}
                    >
                      {ing.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">外部リンク</label>
                <Input
                  value={formData.externalLink || ""}
                  onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                  placeholder="https://example.com/product"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">アフィリエイトAPI URL</label>
                  <Input
                    value={formData.affiliateApiUrl || ""}
                    onChange={(e) => setFormData({ ...formData, affiliateApiUrl: e.target.value })}
                    placeholder="https://api.example.com/affiliate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">アフィリエイトAPI キー</label>
                  <Input
                    type="password"
                    value={formData.affiliateApiKey || ""}
                    onChange={(e) => setFormData({ ...formData, affiliateApiKey: e.target.value })}
                    placeholder="APIキーを入力"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">購入URL</label>
                <Input
                  value={formData.purchaseUrl || ""}
                  onChange={(e) => setFormData({ ...formData, purchaseUrl: e.target.value })}
                  placeholder="https://example.com/purchase"
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
                      name: "",
                      nameEn: "",
                      description: "",
                      ingredientIds: [],
                      externalLink: "",
                      affiliateApiUrl: "",
                      affiliateApiKey: "",
                      purchaseUrl: "",
                    });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="card-hover border-2 border-gray-100 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {product.name}
                      </CardTitle>
                      {product.nameEn && (
                        <p className="text-sm text-gray-500 mt-1">{product.nameEn}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                {product.externalLink && (
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>外部リンクを開く</span>
                  </a>
                )}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(product.id);
                      setFormData(product);
                    }}
                    className="flex-1 font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
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

