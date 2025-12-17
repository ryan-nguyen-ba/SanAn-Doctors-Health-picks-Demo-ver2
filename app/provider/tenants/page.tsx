"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit, Trash2, Building } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Tenant {
  id: number;
  name: string;
  companyDetails: string;
  employees: number;
  plan: string;
  featureFlags: {
    challenges: boolean;
    supplements: boolean;
    analytics: boolean;
    chat: boolean;
  };
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([
    { 
      id: 1, 
      name: "株式会社A", 
      companyDetails: "大手IT企業",
      employees: 500, 
      plan: "プレミアム",
      featureFlags: { challenges: true, supplements: true, analytics: true, chat: true }
    },
    { 
      id: 2, 
      name: "株式会社B", 
      companyDetails: "製造業",
      employees: 300, 
      plan: "スタンダード",
      featureFlags: { challenges: true, supplements: true, analytics: true, chat: false }
    },
    { 
      id: 3, 
      name: "株式会社C", 
      companyDetails: "小規模企業",
      employees: 150, 
      plan: "ベーシック",
      featureFlags: { challenges: true, supplements: false, analytics: false, chat: false }
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Tenant, 'id'>>({
    name: "",
    companyDetails: "",
    employees: 0,
    plan: "ベーシック",
    featureFlags: { challenges: true, supplements: false, analytics: false, chat: false }
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      companyDetails: "",
      employees: 0,
      plan: "ベーシック",
      featureFlags: { challenges: true, supplements: false, analytics: false, chat: false }
    });
    setShowModal(true);
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingId(tenant.id);
    setFormData({
      name: tenant.name,
      companyDetails: tenant.companyDetails,
      employees: tenant.employees,
      plan: tenant.plan,
      featureFlags: tenant.featureFlags
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("このテナントを削除してもよろしいですか？")) {
      setTenants(tenants.filter(t => t.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      setTenants(tenants.map(t => 
        t.id === editingId ? { id: editingId, ...formData } : t
      ));
    } else {
      const newId = Math.max(...tenants.map(t => t.id), 0) + 1;
      setTenants([...tenants, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">テナント管理</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規テナント追加
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenants.map((tenant) => (
            <Card key={tenant.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all cursor-pointer" onClick={() => handleEdit(tenant)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <Building className="w-5 h-5" style={{ color: '#FFA500' }} />
                    <CardTitle className="font-black text-black">{tenant.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(tenant)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(tenant.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">従業員数: {tenant.employees}人</p>
                <p className="text-sm font-medium text-black">プラン: {tenant.plan}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">
                    {editingId ? "テナント編集" : "新規テナント追加"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">法人名</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 株式会社A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">法人情報</label>
                  <textarea
                    value={formData.companyDetails}
                    onChange={(e) => setFormData({ ...formData, companyDetails: e.target.value })}
                    placeholder="法人の詳細情報を入力..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">契約プラン</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="ベーシック">ベーシック</option>
                    <option value="スタンダード">スタンダード</option>
                    <option value="プレミアム">プレミアム</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">従業員数</label>
                  <Input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
                    placeholder="500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">機能フラグ</label>
                  <div className="space-y-2 p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="challenges"
                        checked={formData.featureFlags.challenges}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          featureFlags: { ...formData.featureFlags, challenges: checked as boolean }
                        })}
                      />
                      <label htmlFor="challenges" className="text-sm font-medium text-black">チャレンジ機能</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="supplements"
                        checked={formData.featureFlags.supplements}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          featureFlags: { ...formData.featureFlags, supplements: checked as boolean }
                        })}
                      />
                      <label htmlFor="supplements" className="text-sm font-medium text-black">サプリ機能</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="analytics"
                        checked={formData.featureFlags.analytics}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          featureFlags: { ...formData.featureFlags, analytics: checked as boolean }
                        })}
                      />
                      <label htmlFor="analytics" className="text-sm font-medium text-black">分析機能</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="chat"
                        checked={formData.featureFlags.chat}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          featureFlags: { ...formData.featureFlags, chat: checked as boolean }
                        })}
                      />
                      <label htmlFor="chat" className="text-sm font-medium text-black">チャット機能</label>
                    </div>
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

