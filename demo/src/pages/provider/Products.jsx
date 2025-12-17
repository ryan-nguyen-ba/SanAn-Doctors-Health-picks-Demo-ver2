import React, { useState } from 'react'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderProducts() {
  const [products] = useState([
    {
      id: 1,
      name: 'COZY GABA',
      ingredients: ['GABA(γ-アミノ酪酸)'],
      description: '目覚めをサポートするGABAサプリメント',
      warnings: 'メロン、大豆アレルギーに注意',
      purchaseUrl: 'https://example.com/product/cozy-gaba',
      affiliateLink: 'https://example.com/affiliate/cozy-gaba',
      image: '/images/questionnaire/pic_modal_01.jpg',
      isPublic: true
    },
    {
      id: 2,
      name: 'GABAトレール',
      ingredients: ['GABA(γ-アミノ酪酸)', 'マグネシウム'],
      description: '疲れを残さないGABA配合サプリ',
      warnings: 'メロン、大豆アレルギーに注意',
      purchaseUrl: 'https://example.com/product/gaba-trail',
      affiliateLink: 'https://example.com/affiliate/gaba-trail',
      image: '/images/questionnaire/pic_modal_02.jpg',
      isPublic: true
    },
    {
      id: 3,
      name: 'ビタミンC 1000',
      ingredients: ['ビタミンC'],
      description: '高濃度ビタミンCサプリメント',
      warnings: '過剰摂取に注意',
      purchaseUrl: 'https://example.com/product/vitamin-c',
      affiliateLink: 'https://example.com/affiliate/vitamin-c',
      image: '/images/questionnaire/pic_modal_03.jpg',
      isPublic: true
    },
    {
      id: 4,
      name: 'マグネシウムプラス',
      ingredients: ['マグネシウム', 'ビタミンD'],
      description: '筋肉と骨の健康をサポート',
      warnings: '下痢の可能性あり',
      purchaseUrl: 'https://example.com/product/magnesium-plus',
      affiliateLink: 'https://example.com/affiliate/magnesium-plus',
      image: '/images/questionnaire/pic_modal_04.jpg',
      isPublic: true
    },
    {
      id: 5,
      name: 'オメガ3 エッセンシャル',
      ingredients: ['オメガ3脂肪酸'],
      description: 'EPA・DHA配合のオメガ3サプリ',
      warnings: '血液凝固薬との併用に注意',
      purchaseUrl: 'https://example.com/product/omega3',
      affiliateLink: 'https://example.com/affiliate/omega3',
      image: '/images/questionnaire/pic_modal_01.jpg',
      isPublic: true
    },
    {
      id: 6,
      name: 'プロバイオティクス デイリー',
      ingredients: ['プロバイオティクス'],
      description: '100億個の乳酸菌配合',
      warnings: '特になし',
      purchaseUrl: 'https://example.com/product/probiotics',
      affiliateLink: 'https://example.com/affiliate/probiotics',
      image: '/images/questionnaire/pic_modal_02.jpg',
      isPublic: true
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ProviderLayout activeNav="products">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">製品管理</h2>
          <button
            onClick={() => setShowModal(true)}
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
            placeholder="製品名で検索..."
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="widget"
              style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{product.name}</h3>
                <span
                  style={{
                    padding: '4px 8px',
                    backgroundColor: product.isPublic ? '#d4edda' : '#f8d7da',
                    color: product.isPublic ? '#155724' : '#721c24',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}
                >
                  {product.isPublic ? '公開' : '非公開'}
                </span>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px 0' }}>関連栄養素材:</p>
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginRight: '4px',
                      marginBottom: '4px'
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>{product.description}</p>
              
              {product.warnings && (
                <p style={{ fontSize: '12px', color: '#d32f2f', marginBottom: '12px' }}>
                  ⚠️ {product.warnings}
                </p>
              )}

              <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <p style={{ fontSize: '11px', color: '#666', margin: '0 0 4px 0' }}>購入URL:</p>
                <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#007bff', wordBreak: 'break-all' }}>
                  {product.purchaseUrl}
                </a>
              </div>

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
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginTop: 0 }}>新規製品登録</h3>
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

export default ProviderProducts


