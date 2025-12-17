import React, { useState } from 'react'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderContent() {
  const [contents] = useState([
    {
      id: 1,
      type: 'article',
      title: '冬の健康管理について',
      content: '冬は風邪やインフルエンザが流行する季節です。免疫力を高めるために...',
      publishDate: '2024/12/15 10:00',
      target: 'all',
      status: 'published'
    },
    {
      id: 2,
      type: 'video',
      title: 'ストレッチの基本',
      content: null,
      contentUrl: 'https://example.com/video/stretch',
      publishDate: '2024/12/14 14:00',
      target: 'challenge_1',
      status: 'published'
    },
    {
      id: 3,
      type: 'article',
      title: 'サプリメントの正しい摂取方法',
      content: 'サプリメントは食事と一緒に摂取することで、より効果的に...',
      publishDate: '2024/12/13 09:00',
      target: 'all',
      status: 'published'
    },
    {
      id: 4,
      type: 'article',
      title: '睡眠の質を上げる5つの習慣',
      content: '質の良い睡眠は健康の基盤です。以下の5つの習慣を...',
      publishDate: null,
      target: 'challenge_1',
      status: 'draft'
    },
    {
      id: 5,
      type: 'video',
      title: '朝のルーティン作り',
      content: null,
      contentUrl: 'https://example.com/video/morning-routine',
      publishDate: '2024/12/12 08:00',
      target: 'all',
      status: 'published'
    }
  ])

  const [filter, setFilter] = useState('all') // 'all', 'published', 'draft'

  const filteredContents = contents.filter(cont => {
    if (filter === 'all') return true
    return cont.status === filter
  })

  return (
    <ProviderLayout activeNav="content">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">記事・動画配信管理</h2>
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
            + 新規登録
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {filteredContents.map((content) => (
            <div
              key={content.id}
              className="widget"
              style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{content.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: content.type === 'article' ? '#e3f2fd' : '#fff3e0',
                      color: content.type === 'article' ? '#1976d2' : '#e65100',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}
                  >
                    {content.type === 'article' ? '記事' : '動画'}
                  </span>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: content.status === 'published' ? '#d4edda' : '#fff3cd',
                      color: content.status === 'published' ? '#155724' : '#856404',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}
                  >
                    {content.status === 'published' ? '公開済み' : '下書き'}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                  <strong>配信対象:</strong> {content.target === 'all' ? '全員' : `チャレンジ ${content.target}`}
                </p>
                {content.publishDate && (
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    <strong>公開日時:</strong> {content.publishDate}
                  </p>
                )}
                {!content.publishDate && (
                  <p style={{ fontSize: '12px', margin: 0, color: '#999' }}>
                    公開日時: 未設定
                  </p>
                )}
              </div>

              {content.content && (
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                  {content.content.substring(0, 100)}...
                </p>
              )}

              {content.contentUrl && (
                <div style={{ marginBottom: '12px' }}>
                  <a href={content.contentUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#007bff' }}>
                    {content.contentUrl}
                  </a>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  編集
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '8px',
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
    </ProviderLayout>
  )
}

export default ProviderContent


