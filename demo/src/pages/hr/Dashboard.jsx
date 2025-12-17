import React, { useState } from 'react'
import HRLayout from '../../components/HRLayout'
import '../../styles/common.css'

function HRDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const metrics = [
    { label: '利用状況', value: '245', unit: '名', sublabel: 'アクティブユーザー', trend: '+12%' },
    { label: '継続率', value: '82.5', unit: '%', sublabel: '30日継続', trend: '+5.2%' },
    { label: '平均スコア', value: '7.8', unit: '/10', sublabel: '健康スコア', trend: '+0.3' },
    { label: 'チャレンジ実施率', value: '68', unit: '%', sublabel: '今月', trend: '+8%' }
  ]

  const departments = [
    { name: '営業部', employees: 45, active: 38, avgScore: 7.9, participation: 84.4 },
    { name: '開発部', employees: 32, active: 28, avgScore: 8.1, participation: 87.5 },
    { name: '人事部', employees: 18, active: 16, avgScore: 7.6, participation: 88.9 },
    { name: '総務部', employees: 25, active: 21, avgScore: 7.5, participation: 84.0 },
    { name: '経理部', employees: 15, active: 12, avgScore: 7.8, participation: 80.0 }
  ]

  const scoreDistribution = [
    { range: '9-10', count: 45, percentage: 18.4 },
    { range: '7-8', count: 98, percentage: 40.0 },
    { range: '5-6', count: 72, percentage: 29.4 },
    { range: '3-4', count: 25, percentage: 10.2 },
    { range: '0-2', count: 5, percentage: 2.0 }
  ]

  return (
    <HRLayout activeNav="dashboard">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">ダッシュボード</h2>
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
          {metrics.map((metric, index) => (
            <div key={index} className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>{metric.label}</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: '0 0 4px 0' }}>
                {metric.value}<small style={{ fontSize: '18px', marginLeft: '4px' }}>{metric.unit}</small>
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{metric.sublabel}</p>
                <span style={{ fontSize: '12px', color: '#4caf50', fontWeight: 'bold' }}>{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>部署別比較</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>部署</th>
                    <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>従業員数</th>
                    <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>アクティブ</th>
                    <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>平均スコア</th>
                    <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>参加率</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 8px', fontSize: '14px' }}>{dept.name}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{dept.employees}名</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{dept.active}名</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{dept.avgScore}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{dept.participation}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>スコア分布</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scoreDistribution.map((dist, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{dist.range}</span>
                    <span style={{ fontSize: '13px', color: '#666' }}>{dist.count}名 ({dist.percentage}%)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${dist.percentage}%`, backgroundColor: '#FFCC00' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h3 className="widget__title" style={{ marginBottom: '16px' }}>健康スコア推移</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
            {[7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.8].map((score, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '40px',
                    height: `${(score / 10) * 150}px`,
                    backgroundColor: '#FFCC00',
                    borderRadius: '4px 4px 0 0',
                    minHeight: '20px'
                  }}
                ></div>
                <span style={{ fontSize: '11px', color: '#666' }}>Week {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </HRLayout>
  )
}

export default HRDashboard


