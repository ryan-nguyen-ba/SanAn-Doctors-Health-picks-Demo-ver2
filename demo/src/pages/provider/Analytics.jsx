import React, { useState } from 'react'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month') // 'week', 'month', 'year'

  const surveyStats = {
    total: 245,
    completed: 198,
    pending: 47,
    completionRate: 80.8
  }

  const challengeStats = [
    { name: '睡眠の質 改善チャレンジ', participants: 156, completed: 106, completionRate: 68 },
    { name: '疲労 改善チャレンジ', participants: 134, completed: 96, completionRate: 72 },
    { name: 'カラダの代謝 改善チャレンジ', participants: 98, completed: 64, completionRate: 65 },
    { name: '腸内環境 改善チャレンジ', participants: 87, completed: 61, completionRate: 70 },
    { name: 'ストレス軽減チャレンジ', participants: 76, completed: 52, completionRate: 68 }
  ]

  const tenantStats = [
    { name: '株式会社ABC', employees: 45, active: 38, participationRate: 84.4 },
    { name: 'XYZ株式会社', employees: 28, active: 24, participationRate: 85.7 },
    { name: 'GHI株式会社', employees: 62, active: 55, participationRate: 88.7 },
    { name: 'PQRコーポレーション', employees: 89, active: 72, participationRate: 80.9 }
  ]

  return (
    <ProviderLayout activeNav="analytics">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">データ集計</h2>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="week">週間</option>
            <option value="month">月間</option>
            <option value="year">年間</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>総アンケート数</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: 0 }}>
              {surveyStats.total}<small style={{ fontSize: '18px', marginLeft: '4px' }}>件</small>
            </p>
          </div>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>完了数</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: 0 }}>
              {surveyStats.completed}<small style={{ fontSize: '18px', marginLeft: '4px' }}>件</small>
            </p>
          </div>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>未完了数</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: 0 }}>
              {surveyStats.pending}<small style={{ fontSize: '18px', marginLeft: '4px' }}>件</small>
            </p>
          </div>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>完了率</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: 0 }}>
              {surveyStats.completionRate}<small style={{ fontSize: '18px', marginLeft: '4px' }}>%</small>
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>チャレンジ実施状況</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {challengeStats.map((stat, index) => (
                <div key={index} style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{stat.name}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '6px' }}>
                    <span>参加者: {stat.participants}名</span>
                    <span>完了: {stat.completed}名 ({stat.completionRate}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stat.completionRate}%`, backgroundColor: '#FFCC00' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>法人別参加率</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tenantStats.map((stat, index) => (
                <div key={index} style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{stat.name}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '6px' }}>
                    <span>従業員数: {stat.employees}名</span>
                    <span>アクティブ: {stat.active}名 ({stat.participationRate}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stat.participationRate}%`, backgroundColor: '#4caf50' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="widget__title" style={{ margin: 0 }}>集計データ</h3>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              CSVエクスポート
            </button>
          </div>
          <p style={{ color: '#666', fontSize: '14px' }}>
            詳細な集計データはCSVエクスポート機能で取得できます。
          </p>
        </div>
      </section>
    </ProviderLayout>
  )
}

export default ProviderAnalytics


