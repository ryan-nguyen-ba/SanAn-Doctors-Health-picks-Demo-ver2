import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderRecipes() {
  const [searchParams] = useSearchParams()
  const challengeId = searchParams.get('challenge')

  const [recipes] = useState([
    {
      id: 1,
      challengeId: 1,
      challengeName: '睡眠の質 改善チャレンジ',
      name: '夜を取り戻す、スマホ断ちレシピ',
      dayNumber: 1,
      content: { meals: ['朝食', '昼食', '夕食'], exercise: '軽いストレッチ', sleep: '22:00就寝', supplements: ['GABA'] },
      expertComment: 'スマホのブルーライトは睡眠の質を下げます。就寝2時間前からスマホを見ない習慣をつけましょう。'
    },
    {
      id: 2,
      challengeId: 1,
      challengeName: '睡眠の質 改善チャレンジ',
      name: 'リラックス入浴レシピ',
      dayNumber: 2,
      content: { meals: ['朝食', '昼食', '夕食'], exercise: 'なし', sleep: '22:00就寝', supplements: ['マグネシウム'] },
      expertComment: '38-40度のぬるま湯に15-20分つかると、副交感神経が優位になり、質の良い睡眠につながります。'
    },
    {
      id: 3,
      challengeId: 1,
      challengeName: '睡眠の質 改善チャレンジ',
      name: '朝の光を浴びるレシピ',
      dayNumber: 3,
      content: { meals: ['朝食', '昼食', '夕食'], exercise: '朝の散歩15分', sleep: '22:00就寝', supplements: ['ビタミンD'] },
      expertComment: '朝の光を浴びることで体内時計がリセットされ、夜の睡眠の質が向上します。'
    },
    {
      id: 4,
      challengeId: 2,
      challengeName: '疲労 改善チャレンジ',
      name: '疲れ知らずのカラダをつくるレシピ',
      dayNumber: 1,
      content: { meals: ['朝食', '昼食', '夕食'], exercise: '軽いウォーキング', sleep: '7-8時間', supplements: ['ビタミンC', 'マグネシウム'] },
      expertComment: '適度な運動と栄養バランスの取れた食事で、疲労回復を促進します。'
    },
    {
      id: 5,
      challengeId: 2,
      challengeName: '疲労 改善チャレンジ',
      name: 'エネルギー補給レシピ',
      dayNumber: 2,
      content: { meals: ['朝食', '昼食', '夕食'], exercise: 'ストレッチ', sleep: '7-8時間', supplements: ['オメガ3'] },
      expertComment: '良質なタンパク質とオメガ3脂肪酸で、持続的なエネルギーを確保します。'
    },
    {
      id: 6,
      challengeId: 3,
      challengeName: 'カラダの代謝 改善チャレンジ',
      name: '代謝アップ朝食レシピ',
      dayNumber: 1,
      content: { meals: ['朝食', '昼食', '夕食'], exercise: '有酸素運動20分', sleep: '7-8時間', supplements: ['ビタミンB群'] },
      expertComment: '朝食をしっかり摂ることで、1日の代謝が活性化されます。'
    }
  ])

  const filteredRecipes = challengeId
    ? recipes.filter(r => r.challengeId === parseInt(challengeId))
    : recipes

  const groupedByChallenge = filteredRecipes.reduce((acc, recipe) => {
    if (!acc[recipe.challengeName]) {
      acc[recipe.challengeName] = []
    }
    acc[recipe.challengeName].push(recipe)
    return acc
  }, {})

  return (
    <ProviderLayout activeNav="recipes">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">レシピ管理</h2>
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

        {Object.entries(groupedByChallenge).map(([challengeName, challengeRecipes]) => (
          <div key={challengeName} style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #FFCC00' }}>
              {challengeName}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {challengeRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="widget"
                  style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{recipe.name}</h4>
                    <span
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        borderRadius: '4px',
                        fontSize: '11px'
                      }}
                    >
                      Day {recipe.dayNumber}
                    </span>
                  </div>

                  <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                      <strong>食事:</strong> {recipe.content.meals.join(', ')}
                    </p>
                    <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                      <strong>運動:</strong> {recipe.content.exercise}
                    </p>
                    <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>
                      <strong>睡眠:</strong> {recipe.content.sleep}
                    </p>
                    <p style={{ fontSize: '12px', margin: 0 }}>
                      <strong>サプリ:</strong> {recipe.content.supplements.join(', ')}
                    </p>
                  </div>

                  {recipe.expertComment && (
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', fontStyle: 'italic' }}>
                      {recipe.expertComment}
                    </p>
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

export default ProviderRecipes

