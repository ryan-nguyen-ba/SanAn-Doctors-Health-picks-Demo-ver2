import React from 'react'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderDashboard() {
  const stats = [
    { label: '総テナント数', value: '8', unit: '社' },
    { label: '総従業員数', value: '245', unit: '名' },
    { label: 'アクティブチャレンジ数', value: '12', unit: '件' },
    { label: '今月の新規登録', value: '32', unit: '名' }
  ]

  const recentTenants = [
    { id: 1, name: '株式会社ABC', plan: 'プレミアム', employees: 45, status: 'アクティブ', registered: '2024/12/01' },
    { id: 2, name: 'XYZ株式会社', plan: 'スタンダード', employees: 28, status: 'アクティブ', registered: '2024/11/28' },
    { id: 3, name: 'DEFコーポレーション', plan: 'ベーシック', employees: 15, status: 'アクティブ', registered: '2024/11/25' },
    { id: 4, name: 'GHI株式会社', plan: 'プレミアム', employees: 62, status: 'アクティブ', registered: '2024/11/20' }
  ]

  const popularChallenges = [
    { id: 1, name: '睡眠の質 改善チャレンジ', participants: 156, completion: 68 },
    { id: 2, name: '疲労 改善チャレンジ', participants: 134, completion: 72 },
    { id: 3, name: 'カラダの代謝 改善チャレンジ', participants: 98, completion: 65 },
    { id: 4, name: '腸内環境 改善チャレンジ', participants: 87, completion: 70 }
  ]

  return (
    <ProviderLayout activeNav="dashboard">
      <section className="content-section">
        <h2 className="content-section__title">ダッシュボード</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {stats.map((stat, index) => (
            <div key={index} className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>{stat.label}</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                {stat.value}<small style={{ fontSize: '18px', marginLeft: '4px' }}>{stat.unit}</small>
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>最近の登録テナント</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', color: '#666' }}>法人名</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', color: '#666' }}>プラン</th>
                    <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', color: '#666' }}>従業員数</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', color: '#666' }}>登録日</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTenants.map((tenant) => (
                    <tr key={tenant.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 8px', fontSize: '14px' }}>{tenant.name}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px' }}>{tenant.plan}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{tenant.employees}名</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px' }}>{tenant.registered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>人気チャレンジ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {popularChallenges.map((challenge) => (
                <div key={challenge.id} style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{challenge.name}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                    <span>参加者: {challenge.participants}名</span>
                    <span>完了率: {challenge.completion}%</span>
                  </div>
                  <div style={{ marginTop: '6px', height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${challenge.completion}%`, backgroundColor: '#FFCC00' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ProviderLayout>
  )
}

export default ProviderDashboard


