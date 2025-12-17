import React, { useState } from 'react'
import HRLayout from '../../components/HRLayout'
import '../../styles/common.css'

function HRAnnouncements() {
  const [announcements] = useState([
    {
      id: 1,
      title: '年末年始の営業について',
      content: '年末年始期間中のサービス利用についてご案内いたします。',
      publishDate: '2024/12/20 10:00',
      target: 'all',
      status: '公開済み',
      couponLinked: false
    },
    {
      id: 2,
      title: '健康習慣チャレンジキャンペーン',
      content: '新年に向けて健康習慣を始めませんか？参加者全員にクーポンプレゼント！',
      publishDate: '2024/12/15 09:00',
      target: 'all',
      status: '公開済み',
      couponLinked: true,
      couponCode: 'NEWYEAR1000'
    },
    {
      id: 3,
      title: '冬の健康管理セミナー開催',
      content: '来月、冬の健康管理に関するセミナーを開催いたします。',
      publishDate: '2024/12/10 14:00',
      target: 'all',
      status: '公開済み',
      couponLinked: false
    },
    {
      id: 4,
      title: 'サプリメント補助制度のご案内',
      content: '社員向けサプリメント補助制度が開始されました。',
      publishDate: null,
      target: 'all',
      status: '下書き',
      couponLinked: false
    },
    {
      id: 5,
      title: '健康診断結果のご提出について',
      content: '健康診断結果のご提出をお願いいたします。',
      publishDate: '2024/12/05 11:00',
      target: 'all',
      status: '公開済み',
      couponLinked: false
    }
  ])

  const [filter, setFilter] = useState('all') // 'all', 'published', 'draft'

  const filteredAnnouncements = announcements.filter(ann => {
    if (filter === 'all') return true
    return ann.status === (filter === 'published' ? '公開済み' : '下書き')
  })

  return (
    <HRLayout activeNav="announcements">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">お知らせ配信</h2>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#FFCC00',
              color: '#5C3D16',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            + 新規お知らせ作成
          </button>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'all' ? '#FFCC00' : '#f0f0f0',
              color: filter === 'all' ? '#5C3D16' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            すべて
          </button>
          <button
            onClick={() => setFilter('published')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'published' ? '#FFCC00' : '#f0f0f0',
              color: filter === 'published' ? '#5C3D16' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            公開済み
          </button>
          <button
            onClick={() => setFilter('draft')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'draft' ? '#FFCC00' : '#f0f0f0',
              color: filter === 'draft' ? '#5C3D16' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            下書き
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="widget"
              style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{announcement.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: announcement.status === '公開済み' ? '#d4edda' : '#fff3cd',
                      color: announcement.status === '公開済み' ? '#155724' : '#856404',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}
                  >
                    {announcement.status}
                  </span>
                  {announcement.couponLinked && (
                    <span
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        borderRadius: '4px',
                        fontSize: '11px'
                      }}
                    >
                      クーポン連携
                    </span>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>{announcement.content}</p>

              <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                  <strong>配信対象:</strong> {announcement.target === 'all' ? '全員' : announcement.target}
                </p>
                {announcement.publishDate && (
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    <strong>公開日時:</strong> {announcement.publishDate}
                  </p>
                )}
                {!announcement.publishDate && (
                  <p style={{ fontSize: '12px', margin: 0, color: '#999' }}>
                    公開日時: 未設定
                  </p>
                )}
                {announcement.couponLinked && announcement.couponCode && (
                  <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>
                    <strong>連携クーポン:</strong> {announcement.couponCode}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  編集
                </button>
                {announcement.couponLinked && (
                  <button
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#e3f2fd',
                      border: '1px solid #90caf9',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#1976d2'
                    }}
                  >
                    クーポン管理
                  </button>
                )}
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ffebee',
                    border: '1px solid #ffcdd2',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#c62828'
                  }}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </HRLayout>
  )
}

export default HRAnnouncements


