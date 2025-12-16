"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit, Trash2, Search, Package } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "睡眠サポートサプリ", price: 3000, stock: 100 },
    { id: 2, name: "集中力アップサプリ", price: 3500, stock: 80 },
    { id: 3, name: "免疫力強化サプリ", price: 4000, stock: 120 },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", price: 0, stock: 0 });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: "", price: 0, stock: 0 });
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price, stock: product.stock });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("この商品を削除してもよろしいですか？")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      setProducts(products.map(p => 
        p.id === editingId ? { ...p, ...formData } : p
      ));
    } else {
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">商品管理</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規商品追加
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="商品名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5" style={{ color: '#FFA500' }} />
                    <CardTitle className="font-black text-black">{product.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">価格: ¥{product.price.toLocaleString()}</p>
                <p className="text-sm font-medium text-black">在庫: {product.stock}個</p>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${Math.min((product.stock / 150) * 100, 100)}%`,
                        background: product.stock < 50 ? '#EF4444' : 'linear-gradient(135deg, #FFD700, #FFA500)'
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: product.stock < 50 ? '#EF4444' : 'black' }}>
                    {product.stock < 50 ? '在庫少' : '在庫あり'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
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
                    {editingId ? "商品編集" : "新規商品追加"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">商品名</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 睡眠サポートサプリ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">価格 (円)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    placeholder="3000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">在庫数</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    placeholder="100"
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

