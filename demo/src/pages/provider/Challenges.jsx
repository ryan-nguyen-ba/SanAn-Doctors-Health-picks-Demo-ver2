import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderChallenges() {
  const [challenges] = useState([
    {
      id: 1,
      name: '睡眠の質 改善チャレンジ',
      purpose: '睡眠の質を向上させ、日中の疲労を軽減',
      targetConditions: { age: '20-60', gender: 'all', surveyResults: ['sleep_issues'] },
      duration: 30,
      priority: 5,
      isPublic: true,
      level: '★★★☆☆'
    },
    {
      id: 2,
      name: '疲労 改善チャレンジ',
      purpose: '慢性的な疲労感を改善し、活力を向上',
      targetConditions: { age: 'all', gender: 'all', surveyResults: ['fatigue'] },
      duration: 28,
      priority: 4,
      isPublic: true,
      level: '★★☆☆☆'
    },
    {
      id: 3,
      name: 'カラダの代謝 改善チャレンジ',
      purpose: '代謝を向上させ、健康的な体づくり',
      targetConditions: { age: '20-50', gender: 'all', surveyResults: ['metabolism'] },
      duration: 35,
      priority: 5,
      isPublic: true,
      level: '★★★★★'
    },
    {
      id: 4,
      name: '腸内環境 改善チャレンジ',
      purpose: '腸内環境を整え、消化器系の健康を改善',
      targetConditions: { age: 'all', gender: 'all', surveyResults: ['digestion'] },
      duration: 21,
      priority: 3,
      isPublic: true,
      level: '★★★☆☆'
    },
    {
      id: 5,
      name: 'ストレス軽減チャレンジ',
      purpose: '日常的なストレスを軽減し、メンタルヘルスを改善',
      targetConditions: { age: 'all', gender: 'all', surveyResults: ['stress'] },
      duration: 30,
      priority: 4,
      isPublic: true,
      level: '★★★☆☆'
    }
  ])

  const [filter, setFilter] = useState('all') // 'all', 'public', 'private'

  const filteredChallenges = challenges.filter(ch => {
    if (filter === 'all') return true
    if (filter === 'public') return ch.isPublic
    return !ch.isPublic
  })

  return (
    <ProviderLayout activeNav="challenges">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">チャレンジ管理</h2>
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
            onClick={() => setFilter('public')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'public' ? '#FFCC00' : '#f0f0f0',
              color: filter === 'public' ? '#5C3D16' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            公開
          </button>
          <button
            onClick={() => setFilter('private')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'private' ? '#FFCC00' : '#f0f0f0',
              color: filter === 'private' ? '#5C3D16' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            非公開
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="widget"
              style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{challenge.name}</h3>
                <span
                  style={{
                    padding: '4px 8px',
                    backgroundColor: challenge.isPublic ? '#d4edda' : '#f8d7da',
                    color: challenge.isPublic ? '#155724' : '#721c24',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}
                >
                  {challenge.isPublic ? '公開' : '非公開'}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>{challenge.purpose}</p>

              <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                  <strong>実施期間:</strong> {challenge.duration}日
                </p>
                <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                  <strong>優先度:</strong> {challenge.priority}/5
                </p>
                <p style={{ fontSize: '12px', margin: 0 }}>
                  <strong>レベル:</strong> {challenge.level}
                </p>
              </div>

              <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
                <p style={{ margin: '0 0 4px 0' }}><strong>対象条件:</strong></p>
                <p style={{ margin: 0 }}>年齢: {challenge.targetConditions.age}</p>
                <p style={{ margin: 0 }}>性別: {challenge.targetConditions.gender === 'all' ? 'すべて' : challenge.targetConditions.gender}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <Link
                  to={`/provider/recipes?challenge=${challenge.id}`}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#333'
                  }}
                >
                  レシピ管理
                </Link>
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

export default ProviderChallenges

