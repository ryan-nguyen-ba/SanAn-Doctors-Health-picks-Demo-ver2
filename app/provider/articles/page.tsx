"use client";

import { useState } from "react";
import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Edit, Trash2, Search, FileText, Video, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Article {
  id: number;
  title: string;
  type: "article" | "video";
  content: string;
  videoUrl: string;
  publishedAt: string;
  targetAudience: "all" | "specific" | "condition";
  targetChallengeId?: string;
  targetConditions?: string;
  status: "draft" | "published";
}

export default function ArticlesPage() {
  const challenges = [
    { id: "1", name: "睡眠改善" },
    { id: "2", name: "運動習慣" },
    { id: "3", name: "食事改善" },
  ];

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "睡眠の質を向上させる5つの習慣",
      type: "article",
      content: "良質な睡眠を取るための習慣について解説します...",
      videoUrl: "",
      publishedAt: "2025-01-15T10:00:00",
      targetAudience: "all",
      status: "published"
    },
    {
      id: 2,
      title: "朝の運動習慣を身につける方法",
      type: "video",
      content: "",
      videoUrl: "https://example.com/video1",
      publishedAt: "2025-01-20T14:00:00",
      targetAudience: "specific",
      targetChallengeId: "2",
      status: "published"
    },
    {
      id: 3,
      title: "栄養バランスの取れた食事",
      type: "article",
      content: "バランスの取れた食事について...",
      videoUrl: "",
      publishedAt: "",
      targetAudience: "all",
      status: "draft"
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("全て");
  const [formData, setFormData] = useState<Omit<Article, 'id'>>({
    title: "",
    type: "article",
    content: "",
    videoUrl: "",
    publishedAt: "",
    targetAudience: "all",
    targetChallengeId: "",
    targetConditions: "",
    status: "draft"
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      type: "article",
      content: "",
      videoUrl: "",
      publishedAt: "",
      targetAudience: "all",
      targetChallengeId: "",
      targetConditions: "",
      status: "draft"
    });
    setShowModal(true);
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      type: article.type,
      content: article.content,
      videoUrl: article.videoUrl,
      publishedAt: article.publishedAt,
      targetAudience: article.targetAudience,
      targetChallengeId: article.targetChallengeId || "",
      targetConditions: article.targetConditions || "",
      status: article.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("この記事・動画を削除してもよろしいですか？")) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      setArticles(articles.map(a => 
        a.id === editingId ? { id: editingId, ...formData } : a
      ));
    } else {
      const newId = Math.max(...articles.map(a => a.id), 0) + 1;
      setArticles([...articles, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "全て" || a.status === filterStatus)
  );

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-black">記事・動画配信管理</h1>
          <Button 
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}
          >
            新規記事・動画作成
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="タイトルで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["全て", "draft", "published"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                style={filterStatus === status ? { background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' } : {}}
              >
                {status === "全て" ? "全て" : status === "draft" ? "下書き" : "公開済み"}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all cursor-pointer" onClick={() => handleEdit(article)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    {article.type === "article" ? (
                      <FileText className="w-5 h-5" style={{ color: '#FFA500' }} />
                    ) : (
                      <Video className="w-5 h-5" style={{ color: '#FFA500' }} />
                    )}
                    <CardTitle className="font-black text-sm text-black line-clamp-2">{article.title}</CardTitle>
                  </div>
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(article)}
                      className="p-1.5 hover:bg-yellow-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={article.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                    {article.status === "published" ? "公開済み" : "下書き"}
                  </Badge>
                  <Badge variant="outline">
                    {article.type === "article" ? "記事" : "動画"}
                  </Badge>
                </div>
                {article.publishedAt && (
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(article.publishedAt).toLocaleDateString("ja-JP")}</span>
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-2">
                  配信対象: {article.targetAudience === "all" ? "全員" : article.targetAudience === "specific" ? "特定チャレンジ" : "条件指定"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">検索結果が見つかりません</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black">
                    {editingId ? "記事・動画編集" : "新規記事・動画作成"}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">タイトル</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="例: 睡眠の質を向上させる5つの習慣"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">種別</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "article" | "video" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="article">記事</option>
                    <option value="video">動画</option>
                  </select>
                </div>
                {formData.type === "article" ? (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">コンテンツ本文</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="記事の内容を入力..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={8}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">動画URL</label>
                    <Input
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://example.com/video"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">公開日時</label>
                  <Input
                    type="datetime-local"
                    value={formData.publishedAt ? new Date(formData.publishedAt).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value ? new Date(e.target.value).toISOString() : "" })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">配信対象</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as "all" | "specific" | "condition" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">全員</option>
                    <option value="specific">特定チャレンジ</option>
                    <option value="condition">条件指定</option>
                  </select>
                </div>
                {formData.targetAudience === "specific" && (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">対象チャレンジ</label>
                    <select
                      value={formData.targetChallengeId || ""}
                      onChange={(e) => setFormData({ ...formData, targetChallengeId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">選択してください</option>
                      {challenges.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                {formData.targetAudience === "condition" && (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black">条件（JSON形式）</label>
                    <textarea
                      value={formData.targetConditions || ""}
                      onChange={(e) => setFormData({ ...formData, targetConditions: e.target.value })}
                      placeholder='{"age": {"min": 20, "max": 60}, "gender": "all"}'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={4}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">ステータス</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
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
    </ProviderLayout>
  );
}

