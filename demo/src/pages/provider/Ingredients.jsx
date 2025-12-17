import React, { useState } from 'react'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderIngredients() {
  const [ingredients] = useState([
    {
      id: 1,
      name: 'GABA(γ-アミノ酪酸)',
      nutrients: [{ name: 'GABA', amount: '200', unit: 'mg' }],
      description: '脳の興奮を抑え、ストレス緩和に働く。入眠・中途覚醒の改善にも。',
      warnings: 'メロン、大豆アレルギーに注意',
      isPublic: true
    },
    {
      id: 2,
      name: 'ビタミンC',
      nutrients: [{ name: 'ビタミンC', amount: '1000', unit: 'mg' }],
      description: '抗酸化作用があり、免疫力向上に効果的。',
      warnings: '過剰摂取に注意',
      isPublic: true
    },
    {
      id: 3,
      name: 'マグネシウム',
      nutrients: [{ name: 'マグネシウム', amount: '400', unit: 'mg' }],
      description: '筋肉の収縮や神経伝達に重要なミネラル。',
      warnings: '下痢の可能性あり',
      isPublic: true
    },
    {
      id: 4,
      name: 'ビタミンD',
      nutrients: [{ name: 'ビタミンD3', amount: '2000', unit: 'IU' }],
      description: '骨の健康維持と免疫機能の向上に役立つ。',
      warnings: '過剰摂取に注意',
      isPublic: true
    },
    {
      id: 5,
      name: 'オメガ3脂肪酸',
      nutrients: [{ name: 'EPA', amount: '600', unit: 'mg' }, { name: 'DHA', amount: '400', unit: 'mg' }],
      description: '心血管の健康と脳機能の維持に重要。',
      warnings: '血液凝固薬との併用に注意',
      isPublic: true
    },
    {
      id: 6,
      name: 'プロバイオティクス',
      nutrients: [{ name: '乳酸菌', amount: '100億', unit: '個' }],
      description: '腸内環境を整え、消化器系の健康をサポート。',
      warnings: '特になし',
      isPublic: true
    },
    {
      id: 7,
      name: 'コラーゲン',
      nutrients: [{ name: 'コラーゲンペプチド', amount: '5000', unit: 'mg' }],
      description: '肌の健康と関節の柔軟性をサポート。',
      warnings: '特になし',
      isPublic: true
    },
    {
      id: 8,
      name: '鉄分',
      nutrients: [{ name: 'ヘム鉄', amount: '10', unit: 'mg' }],
      description: '貧血予防とエネルギー代謝に重要。',
      warnings: '過剰摂取に注意',
      isPublic: true
    },
    {
      id: 9,
      name: '葉酸',
      nutrients: [{ name: '葉酸', amount: '400', unit: 'μg' }],
      description: '細胞分裂とDNA合成に必要。特に妊娠中に重要。',
      warnings: '特になし',
      isPublic: true
    },
    {
      id: 10,
      name: '亜鉛',
      nutrients: [{ name: '亜鉛', amount: '15', unit: 'mg' }],
      description: '免疫機能と傷の治癒に重要なミネラル。',
      warnings: '過剰摂取に注意',
      isPublic: true
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState(null)

  const filteredIngredients = ingredients.filter(ing =>
    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient)
    setShowModal(true)
  }

  const handleCreate = () => {
    setEditingIngredient(null)
    setShowModal(true)
  }

  return (
    <ProviderLayout activeNav="ingredients">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">栄養素材管理</h2>
          <button
            onClick={handleCreate}
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

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="栄養素材名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="widget"
              style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{ingredient.name}</h3>
                <span
                  style={{
                    padding: '4px 8px',
                    backgroundColor: ingredient.isPublic ? '#d4edda' : '#f8d7da',
                    color: ingredient.isPublic ? '#155724' : '#721c24',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}
                >
                  {ingredient.isPublic ? '公開' : '非公開'}
                </span>
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px 0' }}>栄養素情報:</p>
                {ingredient.nutrients.map((nut, idx) => (
                  <p key={idx} style={{ fontSize: '13px', margin: '2px 0' }}>
                    {nut.name}: {nut.amount} {nut.unit}
                  </p>
                ))}
              </div>

              <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>{ingredient.description}</p>
              
              {ingredient.warnings && (
                <p style={{ fontSize: '12px', color: '#d32f2f', marginBottom: '12px' }}>
                  ⚠️ {ingredient.warnings}
                </p>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  onClick={() => handleEdit(ingredient)}
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

        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '8px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginTop: 0 }}>
                {editingIngredient ? '栄養素材編集' : '新規栄養素材登録'}
              </h3>
              <p style={{ color: '#666' }}>フォーム機能は実装予定です</p>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </section>
    </ProviderLayout>
  )
}

export default ProviderIngredients


