"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Edit, Trash2, Search } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  isActive: boolean;
}

export default function ProviderUsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "加藤佳子",
      email: "kato@example.com",
      role: "EMPLOYEE",
      tenantId: "1",
      isActive: true,
    },
    {
      id: "2",
      name: "山田太郎",
      email: "yamada@example.com",
      role: "ADMIN",
      tenantId: "1",
      isActive: true,
    },
  ]);

  const tenants = [
    { id: "1", name: "株式会社サンプル" },
    { id: "2", name: "テスト企業株式会社" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "EMPLOYEE",
    tenantId: "",
    isActive: true,
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (formData.name && formData.email && formData.tenantId) {
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name || "",
        email: formData.email || "",
        role: formData.role || "EMPLOYEE",
        tenantId: formData.tenantId || "",
        isActive: formData.isActive ?? true,
      };
      setUsers([...users, newUser]);
      setFormData({
        name: "",
        email: "",
        role: "EMPLOYEE",
        tenantId: "",
        isActive: true,
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.name) {
      setUsers(
        users.map((u) =>
          u.id === editingId ? { ...u, ...formData } : u
        )
      );
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        role: "EMPLOYEE",
        tenantId: "",
        isActive: true,
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("このユーザーを削除しますか？")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">ユーザー管理</h1>
            <p className="text-gray-600">従業員アカウントの管理</p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規登録
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6 shadow-medium">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="名前またはメールアドレスで検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <Card className="mb-6 shadow-medium border-2 border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                {editingId ? "ユーザーを編集" : "新規ユーザーを登録"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">名前</label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 加藤佳子"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">メールアドレス</label>
                  <Input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="例: kato@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">テナント</label>
                  <select
                    className="w-full p-3 border rounded-xl"
                    value={formData.tenantId || ""}
                    onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                  >
                    <option value="">選択してください</option>
                    {tenants.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ロール</label>
                  <select
                    className="w-full p-3 border rounded-xl"
                    value={formData.role || "EMPLOYEE"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="EMPLOYEE">従業員</option>
                    <option value="ADMIN">管理者</option>
                  </select>
                </div>
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
                      email: "",
                      role: "EMPLOYEE",
                      tenantId: "",
                      isActive: true,
                    });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users List */}
        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">ユーザー一覧</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">
                          {tenants.find((t) => t.id === user.tenantId)?.name || "不明"}
                        </Badge>
                        <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
                          {user.role === "ADMIN" ? "管理者" : "従業員"}
                        </Badge>
                        {user.isActive ? (
                          <Badge className="bg-green-500">アクティブ</Badge>
                        ) : (
                          <Badge variant="outline">非アクティブ</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingId(user.id);
                        setFormData(user);
                      }}
                      className="font-semibold"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      編集
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="font-semibold text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      削除
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
}

