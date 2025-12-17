"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Edit, Trash2, Calendar } from "lucide-react";

interface Delivery {
  id: number;
  date: string;
  tenant: string;
  tenantId: string;
  status: string;
  notes: string;
}

export default function DeliveriesPage() {
  const tenants = [
    { id: "1", name: "企業A" },
    { id: "2", name: "企業B" },
    { id: "3", name: "企業C" },
  ];

  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { id: 1, date: "2025-01-15", tenant: "企業A", tenantId: "1", status: "配送済み", notes: "正常に配送完了" },
    { id: 2, date: "2025-01-20", tenant: "企業B", tenantId: "2", status: "準備中", notes: "準備中です" },
    { id: 3, date: "2025-01-25", tenant: "企業C", tenantId: "3", status: "予定", notes: "" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Delivery, 'id'>>({
    date: "",
    tenant: "",
    tenantId: "",
    status: "予定",
    notes: ""
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      date: "",
      tenant: "",
      tenantId: "",
      status: "予定",
      notes: ""
    });
    setShowModal(true);
  };

  const handleEdit = (delivery: Delivery) => {
    setEditingId(delivery.id);
    setFormData({
      date: delivery.date,
      tenant: delivery.tenant,
      tenantId: delivery.tenantId,
      status: delivery.status,
      notes: delivery.notes
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("この配送を削除してもよろしいですか？")) {
      setDeliveries(deliveries.filter(d => d.id !== id));
    }
  };

  const handleSubmit = () => {
    const selectedTenant = tenants.find(t => t.id === formData.tenantId);
    if (editingId) {
      setDeliveries(deliveries.map(d => 
        d.id === editingId ? { 
          id: editingId, 
          ...formData,
          tenant: selectedTenant?.name || formData.tenant
        } : d
      ));
    } else {
      const newId = Math.max(...deliveries.map(d => d.id), 0) + 1;
      setDeliveries([...deliveries, { 
        id: newId, 
        ...formData,
        tenant: selectedTenant?.name || ""
      }]);
    }
    setShowModal(false);
  };

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">配送スケジュール</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規配送追加
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all cursor-pointer" onClick={() => handleEdit(delivery)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <Calendar className="w-5 h-5" style={{ color: '#FFA500' }} />
                    <CardTitle className="font-black text-black">配送 #{delivery.id}</CardTitle>
                  </div>
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(delivery)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(delivery.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">日付: {delivery.date}</p>
                <p className="text-sm font-medium text-black">テナント: {delivery.tenant}</p>
                <div className="mt-2">
                  <Badge className={
                    delivery.status === "配送済み" ? "bg-green-100 text-green-700" :
                    delivery.status === "準備中" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-700"
                  }>
                    {delivery.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">
                    {editingId ? "配送編集" : "新規配送追加"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">日付</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                  <label className="block text-sm font-bold mb-2 text-black">ステータス</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="予定">予定</option>
                    <option value="準備中">準備中</option>
                    <option value="配送済み">配送済み</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">備考</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="備考を入力..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
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


