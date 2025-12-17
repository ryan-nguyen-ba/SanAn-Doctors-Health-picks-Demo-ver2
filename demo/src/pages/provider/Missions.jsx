import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderMissions() {
  const [searchParams] = useSearchParams()
  const recipeId = searchParams.get('recipe')

  const [missions] = useState([
    {
      id: 1,
      recipeId: 1,
      recipeName: '夜を取り戻す、スマホ断ちレシピ',
      type: 'article',
      title: '寝る2時間前スマホOFF宣言',
      content: '今夜、寝る30分前までにスマホやPC、テレビなどの画面を見るのをやめてみよう。',
      contentUrl: null,
      dayNumber: 1,
      points: 10,
      relatedSupplements: ['COZY GABA']
    },
    {
      id: 2,
      recipeId: 1,
      recipeName: '夜を取り戻す、スマホ断ちレシピ',
      type: 'video',
      title: '睡眠の質を上げる呼吸法',
      content: null,
      contentUrl: 'https://example.com/video/breathing',
      dayNumber: 1,
      points: 15,
      relatedSupplements: []
    },
    {
      id: 3,
      recipeId: 1,
      recipeName: '夜を取り戻す、スマホ断ちレシピ',
      type: 'article',
      title: '布団に入る前に5分の深呼吸',
      content: '就寝前に5分間の深呼吸を行うことで、副交感神経が優位になり、質の良い睡眠につながります。',
      contentUrl: null,
      dayNumber: 2,
      points: 10,
      relatedSupplements: ['GABAトレール']
    },
    {
      id: 4,
      recipeId: 2,
      recipeName: 'リラックス入浴レシピ',
      type: 'article',
      title: '入浴のタイミングと温度',
      content: '就寝1-2時間前の入浴が最適です。38-40度のぬるま湯に15-20分つかりましょう。',
      contentUrl: null,
      dayNumber: 1,
      points: 10,
      relatedSupplements: ['マグネシウムプラス']
    },
    {
      id: 5,
      recipeId: 4,
      recipeName: '疲れ知らずのカラダをつくるレシピ',
      type: 'article',
      title: '朝、5分カーテンを開けよう',
      content: '朝の光を浴びることで体内時計がリセットされ、1日のリズムが整います。',
      contentUrl: null,
      dayNumber: 1,
      points: 10,
      relatedSupplements: []
    },
    {
      id: 6,
      recipeId: 4,
      recipeName: '疲れ知らずのカラダをつくるレシピ',
      type: 'article',
      title: '一駅前から歩こう',
      content: '適度な運動は疲労回復を促進し、体力向上につながります。',
      contentUrl: null,
      dayNumber: 2,
      points: 15,
      relatedSupplements: ['ビタミンC 1000']
    }
  ])

  const [filter, setFilter] = useState('all') // 'all', 'article', 'video'

  const filteredMissions = missions.filter(mission => {
    if (recipeId && mission.recipeId !== parseInt(recipeId)) return false
    if (filter === 'all') return true
    return mission.type === filter
  })

  const groupedByRecipe = filteredMissions.reduce((acc, mission) => {
    if (!acc[mission.recipeName]) {
      acc[mission.recipeName] = []
    }
    acc[mission.recipeName].push(mission)
    return acc
  }, {})

  return (
    <ProviderLayout activeNav="missions">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">ミニミッション管理</h2>
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
            onClick={() => setFilter('article')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'article' ? '#FFCC00' : '#f0f0f0',
              color: filter === 'article' ? '#5C3D16' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            記事
          </button>
          <button
            onClick={() => setFilter('video')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'video' ? '#FFCC00' : '#f0f0f0',
              color: filter === 'video' ? '#5C3D16' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            動画
          </button>
        </div>

        {Object.entries(groupedByRecipe).map(([recipeName, recipeMissions]) => (
          <div key={recipeName} style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #FFCC00' }}>
              {recipeName}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {recipeMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="widget"
                  style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{mission.title}</h4>
                    <span
                      style={{
                        padding: '4px 8px',
                        backgroundColor: mission.type === 'article' ? '#e3f2fd' : '#fff3e0',
                        color: mission.type === 'article' ? '#1976d2' : '#e65100',
                        borderRadius: '4px',
                        fontSize: '11px'
                      }}
                    >
                      {mission.type === 'article' ? '記事' : '動画'}
                    </span>
                  </div>

                  <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                      <strong>実施日:</strong> Day {mission.dayNumber}
                    </p>
                    <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                      <strong>付与ポイント:</strong> {mission.points}pt
                    </p>
                    {mission.relatedSupplements.length > 0 && (
                      <p style={{ fontSize: '12px', margin: 0 }}>
                        <strong>関連サプリ:</strong> {mission.relatedSupplements.join(', ')}
                      </p>
                    )}
                  </div>

                  {mission.content && (
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>{mission.content}</p>
                  )}

                  {mission.contentUrl && (
                    <div style={{ marginBottom: '12px' }}>
                      <a href={mission.contentUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#007bff' }}>
                        {mission.contentUrl}
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
          </div>
        ))}
      </section>
    </ProviderLayout>
  )
}

export default ProviderMissions


