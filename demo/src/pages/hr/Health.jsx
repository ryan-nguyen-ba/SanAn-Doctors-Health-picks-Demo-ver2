import React, { useState } from 'react'
import HRLayout from '../../components/HRLayout'
import '../../styles/common.css'

function HRHealth() {
  const [selectedFilter, setSelectedFilter] = useState('all') // 'all', 'side_effects', 'health_checks'

  const sideEffectLogs = [
    { id: 1, date: '2024/12/15', type: '副作用', keyword: '頭痛', severity: '軽度', count: 12 },
    { id: 2, date: '2024/12/14', type: '副作用', keyword: '眠気', severity: '軽度', count: 8 },
    { id: 3, date: '2024/12/13', type: '副作用', keyword: '胃の不快感', severity: '中度', count: 5 },
    { id: 4, date: '2024/12/12', type: '副作用', keyword: '下痢', severity: '軽度', count: 3 },
    { id: 5, date: '2024/12/11', type: '副作用', keyword: '発疹', severity: '重度', count: 2 }
  ]

  const healthCheckLogs = [
    { id: 1, date: '2024/12/15', type: '体調', keyword: '体重減少', count: 15 },
    { id: 2, date: '2024/12/14', type: '体調', keyword: 'エネルギー向上', count: 28 },
    { id: 3, date: '2024/12/13', type: '体調', keyword: '睡眠の質向上', count: 32 },
    { id: 4, date: '2024/12/12', type: '体調', keyword: '疲労軽減', count: 24 },
    { id: 5, date: '2024/12/11', type: '体調', keyword: '集中力向上', count: 18 }
  ]

  const keywordTrends = [
    { keyword: '睡眠の質向上', count: 45, trend: 'up' },
    { keyword: 'エネルギー向上', count: 38, trend: 'up' },
    { keyword: '疲労軽減', count: 32, trend: 'up' },
    { keyword: '頭痛', count: 12, trend: 'down' },
    { keyword: '眠気', count: 8, trend: 'stable' },
    { keyword: '胃の不快感', count: 5, trend: 'down' }
  ]

  const anonymousComments = [
    { id: 1, date: '2024/12/15', comment: '睡眠の質が明らかに改善されました。朝の目覚めがスッキリしています。', category: 'positive' },
    { id: 2, date: '2024/12/14', comment: 'GABAサプリを飲み始めてから、ストレスが軽減された気がします。', category: 'positive' },
    { id: 3, date: '2024/12/13', comment: '最初の数日は少し頭痛がありましたが、その後は問題ありませんでした。', category: 'neutral' },
    { id: 4, date: '2024/12/12', comment: 'マグネシウムを摂取してから、筋肉のこわばりが和らぎました。', category: 'positive' },
    { id: 5, date: '2024/12/11', comment: '胃が少し重く感じることがあります。食後に飲むように変更しました。', category: 'neutral' }
  ]

  const logs = selectedFilter === 'side_effects' ? sideEffectLogs : selectedFilter === 'health_checks' ? healthCheckLogs : [...sideEffectLogs, ...healthCheckLogs]

  return (
    <HRLayout activeNav="health">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">副作用・体調分析</h2>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="all">すべて</option>
            <option value="side_effects">副作用のみ</option>
            <option value="health_checks">体調記録のみ</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>ログ集計</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>日付</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>タイプ</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>キーワード</th>
                    <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>件数</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 8px', fontSize: '14px' }}>{log.date}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px' }}>
                        <span
                          style={{
                            padding: '4px 8px',
                            backgroundColor: log.type === '副作用' ? '#ffebee' : '#e8f5e9',
                            color: log.type === '副作用' ? '#c62828' : '#2e7d32',
                            borderRadius: '4px',
                            fontSize: '11px'
                          }}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', fontSize: '14px' }}>{log.keyword}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{log.count}件</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>キーワード傾向</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {keywordTrends.map((trend, index) => (
                <div key={index} style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{trend.keyword}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{trend.count}件</span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: trend.trend === 'up' ? '#4caf50' : trend.trend === 'down' ? '#f44336' : '#666'
                        }}
                      >
                        {trend.trend === 'up' ? '↑' : trend.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${(trend.count / 50) * 100}%`,
                        backgroundColor: trend.trend === 'up' ? '#4caf50' : trend.trend === 'down' ? '#f44336' : '#FFCC00'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h3 className="widget__title" style={{ marginBottom: '16px' }}>匿名コメント</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {anonymousComments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: '12px',
                  backgroundColor: comment.category === 'positive' ? '#e8f5e9' : '#fff3e0',
                  borderRadius: '6px',
                  borderLeft: `4px solid ${comment.category === 'positive' ? '#4caf50' : '#ff9800'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#666' }}>{comment.date}</span>
                  <span
                    style={{
                      padding: '2px 6px',
                      backgroundColor: comment.category === 'positive' ? '#4caf50' : '#ff9800',
                      color: '#fff',
                      borderRadius: '3px',
                      fontSize: '10px'
                    }}
                  >
                    {comment.category === 'positive' ? 'ポジティブ' : 'ニュートラル'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6' }}>{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </HRLayout>
  )
}

export default HRHealth

