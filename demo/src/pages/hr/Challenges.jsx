import React, { useState } from 'react'
import HRLayout from '../../components/HRLayout'
import '../../styles/common.css'

function HRChallenges() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const participationRates = [
    { challenge: '睡眠の質 改善チャレンジ', week1: 45, week2: 52, week3: 58, week4: 62, avg: 54.25 },
    { challenge: '疲労 改善チャレンジ', week1: 38, week2: 42, week3: 48, week4: 52, avg: 45.0 },
    { challenge: 'カラダの代謝 改善チャレンジ', week1: 28, week2: 32, week3: 35, week4: 38, avg: 33.25 },
    { challenge: '腸内環境 改善チャレンジ', week1: 25, week2: 28, week3: 32, week4: 35, avg: 30.0 }
  ]

  const popularChallenges = [
    { name: '睡眠の質 改善チャレンジ', participants: 156, completion: 106, avgEffect: 4.2, rank: 1 },
    { name: '疲労 改善チャレンジ', participants: 134, completion: 96, avgEffect: 4.0, rank: 2 },
    { name: 'カラダの代謝 改善チャレンジ', participants: 98, completion: 64, avgEffect: 3.8, rank: 3 },
    { name: '腸内環境 改善チャレンジ', participants: 87, completion: 61, avgEffect: 3.9, rank: 4 },
    { name: 'ストレス軽減チャレンジ', participants: 76, completion: 52, avgEffect: 3.7, rank: 5 }
  ]

  const effectAnalysis = [
    { challenge: '睡眠の質 改善チャレンジ', veryGood: 45, good: 38, neutral: 15, bad: 4, veryBad: 0 },
    { challenge: '疲労 改善チャレンジ', veryGood: 42, good: 35, neutral: 12, bad: 5, veryBad: 2 },
    { challenge: 'カラダの代謝 改善チャレンジ', veryGood: 28, good: 22, neutral: 10, bad: 3, veryBad: 1 }
  ]

  return (
    <HRLayout activeNav="challenges">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">チャレンジ分析</h2>
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

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 className="widget__title" style={{ marginBottom: '16px' }}>実施率推移</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>チャレンジ</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>Week 1</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>Week 2</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>Week 3</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>Week 4</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>平均</th>
                </tr>
              </thead>
              <tbody>
                {participationRates.map((rate, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>{rate.challenge}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{rate.week1}%</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{rate.week2}%</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{rate.week3}%</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>{rate.week4}%</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right', fontWeight: 'bold' }}>{rate.avg}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>人気チャレンジランキング</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {popularChallenges.map((challenge) => (
                <div key={challenge.rank} style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: challenge.rank <= 3 ? '#FFCC00' : '#e0e0e0',
                        color: challenge.rank <= 3 ? '#5C3D16' : '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {challenge.rank}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', flex: 1 }}>{challenge.name}</h4>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                    <span>参加者: {challenge.participants}名</span>
                    <span>完了: {challenge.completion}名</span>
                    <span>効果: {challenge.avgEffect}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h3 className="widget__title" style={{ marginBottom: '16px' }}>効果分析（主観評価）</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {effectAnalysis.map((analysis, index) => (
                <div key={index}>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>{analysis.challenge}</p>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div style={{ flex: analysis.veryGood, height: '20px', backgroundColor: '#4caf50', borderRadius: '4px 0 0 4px' }} title="とても良い"></div>
                    <div style={{ flex: analysis.good, height: '20px', backgroundColor: '#8bc34a' }} title="良い"></div>
                    <div style={{ flex: analysis.neutral, height: '20px', backgroundColor: '#ffc107' }} title="普通"></div>
                    <div style={{ flex: analysis.bad, height: '20px', backgroundColor: '#ff9800' }} title="悪い"></div>
                    <div style={{ flex: analysis.veryBad, height: '20px', backgroundColor: '#f44336', borderRadius: '0 4px 4px 0' }} title="とても悪い"></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666', marginTop: '4px' }}>
                    <span>とても良い: {analysis.veryGood}</span>
                    <span>良い: {analysis.good}</span>
                    <span>普通: {analysis.neutral}</span>
                    <span>悪い: {analysis.bad}</span>
                    <span>とても悪い: {analysis.veryBad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </HRLayout>
  )
}

export default HRChallenges


