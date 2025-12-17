"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Edit, Trash2, Search, Users, Mail } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  tenant: string;
  tenantId: string;
  role: string;
  status: "active" | "inactive";
}

export default function UsersPage() {
  const tenants = [
    { id: "1", name: "企業A" },
    { id: "2", name: "企業B" },
    { id: "3", name: "企業C" },
  ];

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "山田太郎", email: "yamada@example.com", tenant: "企業A", tenantId: "1", role: "EMPLOYEE", status: "active" },
    { id: 2, name: "佐藤花子", email: "sato@example.com", tenant: "企業B", tenantId: "2", role: "EMPLOYEE", status: "active" },
    { id: 3, name: "鈴木一郎", email: "suzuki@example.com", tenant: "企業C", tenantId: "3", role: "ADMIN", status: "inactive" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTenant, setFilterTenant] = useState<string>("全て");
  const [filterStatus, setFilterStatus] = useState<string>("全て");
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: "",
    email: "",
    tenant: "",
    tenantId: "",
    role: "EMPLOYEE",
    status: "active"
  });
  const [inviteEmail, setInviteEmail] = useState("");

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      tenant: "",
      tenantId: "",
      role: "EMPLOYEE",
      status: "active"
    });
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      tenant: user.tenant,
      tenantId: user.tenantId,
      role: user.role,
      status: user.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("このユーザーを削除してもよろしいですか？")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = () => {
    const selectedTenant = tenants.find(t => t.id === formData.tenantId);
    if (editingId) {
      setUsers(users.map(u => 
        u.id === editingId ? { 
          id: editingId, 
          ...formData,
          tenant: selectedTenant?.name || formData.tenant
        } : u
      ));
    } else {
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      setUsers([...users, { 
        id: newId, 
        ...formData,
        tenant: selectedTenant?.name || ""
      }]);
    }
    setShowModal(false);
  };

  const handleInvite = () => {
    if (inviteEmail) {
      alert(`招待メールを ${inviteEmail} に送信しました`);
      setInviteEmail("");
      setShowInviteModal(false);
    }
  };

  const filteredUsers = users.filter(u =>
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     u.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterTenant === "全て" || u.tenantId === filterTenant) &&
    (filterStatus === "全て" || u.status === filterStatus)
  );

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">ユーザー管理</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowInviteModal(true)}
              variant="outline"
            >
              <Mail className="w-4 h-4 mr-2" />
              ユーザー招待
            </Button>
            <Button 
              onClick={handleAdd}
              style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
            >
              新規ユーザー追加
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="名前またはメールで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterTenant}
            onChange={(e) => setFilterTenant(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="全て">全てのテナント</option>
            {tenants.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="全て">全てのステータス</option>
            <option value="active">アクティブ</option>
            <option value="inactive">無効</option>
          </select>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all cursor-pointer" onClick={() => handleEdit(user)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <Users className="w-5 h-5" style={{ color: '#FFA500' }} />
                    <CardTitle className="font-black text-black">{user.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">メール: {user.email}</p>
                <p className="text-sm font-medium text-black">テナント: {user.tenant}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge className={user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                    {user.status === "active" ? "アクティブ" : "無効"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">検索結果が見つかりません</p>
          </div>
        )}

        {/* User Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">
                    {editingId ? "ユーザー編集" : "新規ユーザー追加"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">名前</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 山田太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">メール</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">テナント</label>
                  <select
                    value={formData.tenantId}
                    onChange={(e) => {
                      const selected = tenants.find(t => t.id === e.target.value);
                      setFormData({ ...formData, tenantId: e.target.value, tenant: selected?.name || "" });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">選択してください</option>
                    {tenants.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">ロール</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="EMPLOYEE">従業員</option>
                    <option value="ADMIN">管理者</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">ステータス</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">アクティブ</option>
                    <option value="inactive">無効</option>
                  </select>
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

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">ユーザー招待</CardTitle>
                  <button onClick={() => setShowInviteModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">メールアドレス</label>
                  <Input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="invite@example.com"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <Button
                    onClick={handleInvite}
                    className="flex-1 font-bold"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
                  >
                    招待を送信
                  </Button>
                  <Button
                    onClick={() => setShowInviteModal(false)}
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

