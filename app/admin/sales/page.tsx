"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, Users, DollarSign, X, Edit, Trash2, Ticket } from "lucide-react";

interface Coupon {
  id: number;
  code: string;
  name: string;
  discountRate?: number;
  discountAmount?: number;
  validFrom: string;
  validUntil: string;
  usedCount: number;
  maxUsage?: number;
  isActive: boolean;
}

interface UsageHistory {
  id: number;
  userId: string;
  userName: string;
  product: string;
  amount: number;
  couponCode?: string;
  date: string;
}

export default function SalesPage() {
  const [assistanceLimit, setAssistanceLimit] = useState(50000);
  const [assistanceRate, setAssistanceRate] = useState(0.3);

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 1,
      code: "HEALTH2025",
      name: "新年セール",
      discountRate: 0.1,
      validFrom: "2025-01-01",
      validUntil: "2025-01-31",
      usedCount: 45,
      maxUsage: 100,
      isActive: true
    },
    {
      id: 2,
      code: "WELCOME10",
      name: "新規会員10%OFF",
      discountRate: 0.1,
      validFrom: "2025-01-01",
      validUntil: "2025-12-31",
      usedCount: 120,
      isActive: true
    },
  ]);

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<number | null>(null);
  const [couponForm, setCouponForm] = useState<Omit<Coupon, 'id' | 'usedCount'>>({
    code: "",
    name: "",
    discountRate: undefined,
    discountAmount: undefined,
    validFrom: "",
    validUntil: "",
    maxUsage: undefined,
    isActive: true
  });

  const usageHistory: UsageHistory[] = [
    { id: 1, userId: "1", userName: "山田太郎", product: "睡眠サポートサプリ", amount: 3000, couponCode: "HEALTH2025", date: "2025-01-15" },
    { id: 2, userId: "2", userName: "佐藤花子", product: "集中力アップサプリ", amount: 3500, date: "2025-01-14" },
    { id: 3, userId: "3", userName: "鈴木一郎", product: "免疫力強化サプリ", amount: 4000, couponCode: "WELCOME10", date: "2025-01-13" },
  ];

  const mockSalesData = [
    { id: 1, product: "睡眠サポートサプリ", quantity: 150, revenue: 450000, month: "12月" },
    { id: 2, product: "集中力アップサプリ", quantity: 120, revenue: 420000, month: "12月" },
    { id: 3, product: "免疫力強化サプリ", quantity: 180, revenue: 720000, month: "12月" },
  ];

  const totalRevenue = mockSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalQuantity = mockSalesData.reduce((sum, item) => sum + item.quantity, 0);

  const handleCouponAdd = () => {
    setEditingCouponId(null);
    setCouponForm({
      code: "",
      name: "",
      discountRate: undefined,
      discountAmount: undefined,
      validFrom: "",
      validUntil: "",
      maxUsage: undefined,
      isActive: true
    });
    setShowCouponModal(true);
  };

  const handleCouponEdit = (coupon: Coupon) => {
    setEditingCouponId(coupon.id);
    setCouponForm({
      code: coupon.code,
      name: coupon.name,
      discountRate: coupon.discountRate,
      discountAmount: coupon.discountAmount,
      validFrom: coupon.validFrom,
      validUntil: coupon.validUntil,
      maxUsage: coupon.maxUsage,
      isActive: coupon.isActive
    });
    setShowCouponModal(true);
  };

  const handleCouponSubmit = () => {
    if (editingCouponId) {
      setCoupons(coupons.map(c => 
        c.id === editingCouponId ? { ...c, ...couponForm, usedCount: c.usedCount } : c
      ));
    } else {
      const newId = Math.max(...coupons.map(c => c.id), 0) + 1;
      setCoupons([...coupons, { id: newId, ...couponForm, usedCount: 0 }]);
    }
    setShowCouponModal(false);
  };

  const handleCouponDelete = (id: number) => {
    if (confirm("このクーポンを削除してもよろしいですか？")) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">社販管理</h1>
          <p className="text-gray-600 mt-2">従業員向け商品販売の管理</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>総売上</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>販売数</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{totalQuantity}個</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>購入者数</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">320人</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>成長率</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">+15%</p>
            </CardContent>
          </Card>
        </div>

        {/* Assistance Settings */}
        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">補助設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">補助上限額（円）</label>
              <Input
                type="number"
                value={assistanceLimit}
                onChange={(e) => setAssistanceLimit(parseInt(e.target.value) || 0)}
                placeholder="50000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">補助割合（0-1）</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={assistanceRate}
                onChange={(e) => setAssistanceRate(parseFloat(e.target.value) || 0)}
                placeholder="0.3"
              />
              <p className="text-xs text-gray-600 mt-1">現在の設定: {(assistanceRate * 100).toFixed(0)}%</p>
            </div>
            <Button className="font-semibold shadow-sm">
              設定を保存
            </Button>
          </CardContent>
        </Card>

        {/* Coupon Management */}
        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">クーポン管理</CardTitle>
              <Button 
                onClick={handleCouponAdd}
                style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
                size="sm"
              >
                新規クーポン発行
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-primary/20 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Ticket className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-gray-900">{coupon.name}</h3>
                      <Badge className={coupon.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {coupon.isActive ? "有効" : "無効"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">コード: <span className="font-mono font-bold">{coupon.code}</span></p>
                    <p className="text-sm text-gray-600">
                      {coupon.discountRate ? `割引率: ${(coupon.discountRate * 100).toFixed(0)}%` : `割引額: ¥${coupon.discountAmount?.toLocaleString()}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      有効期間: {coupon.validFrom} ～ {coupon.validUntil} | 
                      使用数: {coupon.usedCount}{coupon.maxUsage ? ` / ${coupon.maxUsage}` : ""}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCouponEdit(coupon)}
                      className="p-2 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleCouponDelete(coupon.id)}
                      className="p-2 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage History */}
        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">利用履歴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usageHistory.map((history) => (
                <div
                  key={history.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-primary/20 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{history.userName}</p>
                    <p className="text-sm text-gray-600">{history.product}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm font-semibold text-gray-900">¥{history.amount.toLocaleString()}</p>
                      {history.couponCode && (
                        <Badge variant="outline" className="text-xs">
                          クーポン: {history.couponCode}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{history.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">販売実績</CardTitle>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    const csv = "商品名,数量,売上,月\n" + mockSalesData.map(i => `${i.product},${i.quantity},${i.revenue},${i.month}`).join("\n");
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'sales_data.csv';
                    a.click();
                  }}
                  variant="outline"
                  size="sm"
                >
                  CSVエクスポート
                </Button>
                <Button style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}>
                  新規商品追加
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSalesData.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-300 transition-all">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.product}</h3>
                    <p className="text-sm text-gray-600">{item.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.quantity}個</p>
                    <p className="text-sm text-gray-600">¥{item.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coupon Modal */}
        {showCouponModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">
                    {editingCouponId ? "クーポン編集" : "新規クーポン発行"}
                  </CardTitle>
                  <button onClick={() => setShowCouponModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">クーポン名</label>
                  <Input
                    value={couponForm.name}
                    onChange={(e) => setCouponForm({ ...couponForm, name: e.target.value })}
                    placeholder="例: 新年セール"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">クーポンコード</label>
                  <Input
                    value={couponForm.code}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                    placeholder="例: HEALTH2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">割引タイプ</label>
                  <select
                    value={couponForm.discountRate ? "rate" : "amount"}
                    onChange={(e) => {
                      if (e.target.value === "rate") {
                        setCouponForm({ ...couponForm, discountRate: 0.1, discountAmount: undefined });
                      } else {
                        setCouponForm({ ...couponForm, discountAmount: 500, discountRate: undefined });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="rate">割引率</option>
                    <option value="amount">割引額</option>
                  </select>
                </div>
                {couponForm.discountRate !== undefined ? (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">割引率（0-1）</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={couponForm.discountRate}
                      onChange={(e) => setCouponForm({ ...couponForm, discountRate: parseFloat(e.target.value) || 0 })}
                      placeholder="0.1"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">割引額（円）</label>
                    <Input
                      type="number"
                      value={couponForm.discountAmount}
                      onChange={(e) => setCouponForm({ ...couponForm, discountAmount: parseInt(e.target.value) || 0 })}
                      placeholder="500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">有効期間（開始）</label>
                  <Input
                    type="date"
                    value={couponForm.validFrom}
                    onChange={(e) => setCouponForm({ ...couponForm, validFrom: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">有効期間（終了）</label>
                  <Input
                    type="date"
                    value={couponForm.validUntil}
                    onChange={(e) => setCouponForm({ ...couponForm, validUntil: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">最大使用回数（任意）</label>
                  <Input
                    type="number"
                    value={couponForm.maxUsage || ""}
                    onChange={(e) => setCouponForm({ ...couponForm, maxUsage: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="100"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="couponActive"
                    checked={couponForm.isActive}
                    onChange={(e) => setCouponForm({ ...couponForm, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="couponActive" className="text-sm font-medium text-black">
                    有効
                  </label>
                </div>
                <div className="flex space-x-3 pt-2">
                  <Button
                    onClick={handleCouponSubmit}
                    className="flex-1 font-bold"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
                  >
                    {editingCouponId ? "更新" : "発行"}
                  </Button>
                  <Button
                    onClick={() => setShowCouponModal(false)}
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
    </AdminLayout>
  );
}
