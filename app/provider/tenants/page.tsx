"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Edit, Trash2, Users } from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  nameKana: string;
  domain: string;
  isActive: boolean;
  userCount: number;
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: "1",
      name: "株式会社サンプル",
      nameKana: "カブシキガイシャサンプル",
      domain: "sample.example.com",
      isActive: true,
      userCount: 125,
    },
    {
      id: "2",
      name: "テスト企業株式会社",
      nameKana: "テストキギョウカブシキガイシャ",
      domain: "test.example.com",
      isActive: true,
      userCount: 89,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Tenant>>({
    name: "",
    nameKana: "",
    domain: "",
    isActive: true,
    userCount: 0,
  });

  const handleCreate = () => {
    if (formData.name && formData.domain) {
      const newTenant: Tenant = {
        id: Date.now().toString(),
        name: formData.name || "",
        nameKana: formData.nameKana || "",
        domain: formData.domain || "",
        isActive: formData.isActive ?? true,
        userCount: formData.userCount || 0,
      };
      setTenants([...tenants, newTenant]);
      setFormData({
        name: "",
        nameKana: "",
        domain: "",
        isActive: true,
        userCount: 0,
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.name) {
      setTenants(
        tenants.map((t) =>
          t.id === editingId ? { ...t, ...formData } : t
        )
      );
      setEditingId(null);
      setFormData({
        name: "",
        nameKana: "",
        domain: "",
        isActive: true,
        userCount: 0,
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("このテナントを削除しますか？")) {
      setTenants(tenants.filter((t) => t.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">テナント管理</h1>
            <p className="text-gray-600">企業テナントの管理</p>
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
                {editingId ? "テナントを編集" : "新規テナントを登録"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">企業名</label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 株式会社サンプル"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">企業名（カナ）</label>
                  <Input
                    value={formData.nameKana || ""}
                    onChange={(e) => setFormData({ ...formData, nameKana: e.target.value })}
                    placeholder="例: カブシキガイシャサンプル"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ドメイン</label>
                <Input
                  value={formData.domain || ""}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="例: sample.example.com"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive ?? true}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  アクティブ
                </label>
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
                      nameKana: "",
                      domain: "",
                      isActive: true,
                      userCount: 0,
                    });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tenants List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <Card
              key={tenant.id}
              className="card-hover border-2 border-gray-100 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {tenant.name}
                      </CardTitle>
                      {tenant.nameKana && (
                        <p className="text-sm text-gray-500 mt-1">{tenant.nameKana}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant={tenant.isActive ? "default" : "outline"}>
                    {tenant.isActive ? "アクティブ" : "非アクティブ"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>ユーザー数: {tenant.userCount}人</span>
                </div>
                <p className="text-xs text-gray-500">ドメイン: {tenant.domain}</p>
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(tenant.id);
                      setFormData(tenant);
                    }}
                    className="flex-1 font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(tenant.id)}
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

