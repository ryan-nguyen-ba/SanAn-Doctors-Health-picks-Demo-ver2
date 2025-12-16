"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Megaphone, Calendar, Users, X, Edit, Trash2 } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  status: string;
  views: number;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "年末年始の営業時間変更のお知らせ",
      content: "12月29日〜1月3日まで休業とさせていただきます。",
      date: "2025-12-15",
      status: "公開中",
      views: 450,
    },
    {
      id: 2,
      title: "新サプリメント発売のお知らせ",
      content: "睡眠改善サプリ「スリープサポート」が新発売されました。",
      date: "2025-12-10",
      status: "公開中",
      views: 680,
    },
    {
      id: 3,
      title: "健康チャレンジキャンペーン開始",
      content: "1月から新しい健康チャレンジがスタートします。",
      date: "2025-12-05",
      status: "下書き",
      views: 0,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", status: "下書き" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ title: "", content: "", status: "下書き" });
    setShowModal(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setFormData({ title: announcement.title, content: announcement.content, status: announcement.status });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("このお知らせを削除してもよろしいですか？")) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      setAnnouncements(announcements.map(a => 
        a.id === editingId ? { ...a, ...formData } : a
      ));
    } else {
      const newId = Math.max(...announcements.map(a => a.id), 0) + 1;
      const today = new Date().toISOString().split('T')[0];
      setAnnouncements([...announcements, { id: newId, ...formData, date: today, views: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">お知らせ管理</h1>
            <p className="text-gray-600 mt-2">従業員向けお知らせの作成・管理</p>
          </div>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規お知らせ作成
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <Megaphone className="w-4 h-4" />
                <span>公開中</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">2件</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>総閲覧数</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">1,130</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>今月の投稿</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">3件</p>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                      {announcement.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      announcement.status === "公開中"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {announcement.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{announcement.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{announcement.views} 閲覧</span>
                    </span>
                  </div>
                  <div className="space-x-2">
                    <Button onClick={() => handleEdit(announcement)} variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      編集
                    </Button>
                    <Button onClick={() => handleDelete(announcement.id)} variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      削除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-gray-900">
                    {editingId ? "お知らせ編集" : "新規お知らせ作成"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">タイトル</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="例: 年末年始の営業時間変更のお知らせ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">内容</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="お知らせの内容を入力してください"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[120px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">ステータス</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="下書き">下書き</option>
                    <option value="公開中">公開中</option>
                  </select>
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
    </AdminLayout>
  );
}
