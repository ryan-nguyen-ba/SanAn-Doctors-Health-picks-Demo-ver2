import React, { useState } from 'react'
import HRLayout from '../../components/HRLayout'
import '../../styles/common.css'

function HRSubsidy() {
  const [subsidySettings] = useState({
    maxAmount: 10000,
    percentage: 30,
    enabled: true
  })

  const [coupons] = useState([
    { id: 1, code: 'HEALTH2024', discount: 20, type: 'percentage', validFrom: '2024/12/01', validTo: '2024/12/31', used: 45, total: 100, status: 'アクティブ' },
    { id: 2, code: 'WELCOME500', discount: 500, type: 'fixed', validFrom: '2024/11/01', validTo: '2024/11/30', used: 78, total: 100, status: '期限切れ' },
    { id: 3, code: 'CHALLENGE15', discount: 15, type: 'percentage', validFrom: '2024/12/10', validTo: '2025/01/10', used: 12, total: 50, status: 'アクティブ' },
    { id: 4, code: 'NEWYEAR1000', discount: 1000, type: 'fixed', validFrom: '2025/01/01', validTo: '2025/01/31', used: 0, total: 200, status: '予定' }
  ])

  const [usageHistory] = useState([
    { id: 1, employee: '加藤 佳子', coupon: 'HEALTH2024', amount: 3000, discount: 600, date: '2024/12/15' },
    { id: 2, employee: '田中 太郎', coupon: 'HEALTH2024', amount: 5000, discount: 1000, date: '2024/12/14' },
    { id: 3, employee: '佐藤 花子', coupon: 'CHALLENGE15', amount: 2000, discount: 300, date: '2024/12/13' },
    { id: 4, employee: '鈴木 一郎', coupon: 'HEALTH2024', amount: 4000, discount: 800, date: '2024/12/12' },
    { id: 5, employee: '高橋 美咲', coupon: 'WELCOME500', amount: 2500, discount: 500, date: '2024/11/28' }
  ])

  return (
    <HRLayout activeNav="subsidy">
      <section className="content-section">
        <h2 className="content-section__title">社販管理</h2>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 className="widget__title" style={{ marginBottom: '16px' }}>補助設定</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label style={{ fontSize: '14px', minWidth: '120px' }}>補助上限額:</label>
              <input
                type="number"
                value={subsidySettings.maxAmount}
                readOnly
                style={{
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  width: '150px'
                }}
              />
              <span style={{ fontSize: '14px', color: '#666' }}>円</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label style={{ fontSize: '14px', minWidth: '120px' }}>補助割合:</label>
              <input
                type="number"
                value={subsidySettings.percentage}
                readOnly
                style={{
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  width: '150px'
                }}
              />
              <span style={{ fontSize: '14px', color: '#666' }}>%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label style={{ fontSize: '14px', minWidth: '120px' }}>補助機能:</label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={subsidySettings.enabled}
                  readOnly
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontSize: '14px' }}>有効</span>
              </label>
            </div>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#FFCC00',
                color: '#5C3D16',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                alignSelf: 'flex-start'
              }}
            >
              設定を保存
            </button>
          </div>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="widget__title" style={{ margin: 0 }}>クーポン発行</h3>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#FFCC00',
                color: '#5C3D16',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              + 新規クーポン発行
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>クーポンコード</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>割引</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>有効期間</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>使用数</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>ステータス</th>
                  <th style={{ padding: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 8px', fontSize: '14px', fontWeight: 'bold' }}>{coupon.code}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>
                      {coupon.type === 'percentage' ? `${coupon.discount}%` : `¥${coupon.discount}`}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>
                      {coupon.validFrom} 〜 {coupon.validTo}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>
                      {coupon.used} / {coupon.total}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          backgroundColor: coupon.status === 'アクティブ' ? '#d4edda' : coupon.status === '期限切れ' ? '#f8d7da' : '#fff3cd',
                          color: coupon.status === 'アクティブ' ? '#155724' : coupon.status === '期限切れ' ? '#721c24' : '#856404',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {coupon.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <button
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          編集
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h3 className="widget__title" style={{ marginBottom: '16px' }}>利用履歴</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>従業員</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>クーポン</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>購入金額</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>割引額</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>利用日</th>
                </tr>
              </thead>
              <tbody>
                {usageHistory.map((usage) => (
                  <tr key={usage.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>{usage.employee}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>{usage.coupon}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>¥{usage.amount.toLocaleString()}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right', color: '#4caf50', fontWeight: 'bold' }}>
                      -¥{usage.discount.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>{usage.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </HRLayout>
  )
}

export default HRSubsidy


