import React, { useState } from 'react'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderTenants() {
  const [tenants] = useState([
    {
      id: 1,
      name: '株式会社ABC',
      plan: 'プレミアム',
      employees: 45,
      status: 'アクティブ',
      registered: '2024/10/01',
      featureFlags: ['analytics', 'custom_branding', 'api_access']
    },
    {
      id: 2,
      name: 'XYZ株式会社',
      plan: 'スタンダード',
      employees: 28,
      status: 'アクティブ',
      registered: '2024/09/15',
      featureFlags: ['analytics']
    },
    {
      id: 3,
      name: 'DEFコーポレーション',
      plan: 'ベーシック',
      employees: 15,
      status: 'アクティブ',
      registered: '2024/09/01',
      featureFlags: []
    },
    {
      id: 4,
      name: 'GHI株式会社',
      plan: 'プレミアム',
      employees: 62,
      status: 'アクティブ',
      registered: '2024/08/20',
      featureFlags: ['analytics', 'custom_branding', 'api_access', 'priority_support']
    },
    {
      id: 5,
      name: 'JKL有限会社',
      plan: 'スタンダード',
      employees: 22,
      status: '一時停止',
      registered: '2024/08/10',
      featureFlags: ['analytics']
    },
    {
      id: 6,
      name: 'MNO株式会社',
      plan: 'ベーシック',
      employees: 18,
      status: 'アクティブ',
      registered: '2024/07/25',
      featureFlags: []
    },
    {
      id: 7,
      name: 'PQRコーポレーション',
      plan: 'プレミアム',
      employees: 89,
      status: 'アクティブ',
      registered: '2024/07/01',
      featureFlags: ['analytics', 'custom_branding', 'api_access', 'priority_support']
    },
    {
      id: 8,
      name: 'STU株式会社',
      plan: 'スタンダード',
      employees: 35,
      status: 'アクティブ',
      registered: '2024/06/15',
      featureFlags: ['analytics']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || tenant.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <ProviderLayout activeNav="tenants">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">法人管理</h2>
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

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="法人名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              maxWidth: '400px',
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="all">すべてのステータス</option>
            <option value="アクティブ">アクティブ</option>
            <option value="一時停止">一時停止</option>
          </select>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>法人名</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>プラン</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 'bold' }}>従業員数</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>ステータス</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>登録日</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>機能フラグ</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{tenant.name}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          backgroundColor: tenant.plan === 'プレミアム' ? '#fff3e0' : tenant.plan === 'スタンダード' ? '#e3f2fd' : '#f3e5f5',
                          color: tenant.plan === 'プレミアム' ? '#e65100' : tenant.plan === 'スタンダード' ? '#1976d2' : '#7b1fa2',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {tenant.plan}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right' }}>{tenant.employees}名</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          backgroundColor: tenant.status === 'アクティブ' ? '#d4edda' : '#fff3cd',
                          color: tenant.status === 'アクティブ' ? '#155724' : '#856404',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{tenant.registered}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>
                      {tenant.featureFlags.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {tenant.featureFlags.map((flag, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: '2px 6px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '3px',
                                fontSize: '10px'
                              }}
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: '#999' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
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
                        <button
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#ffebee',
                            border: '1px solid #ffcdd2',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: '#c62828'
                          }}
                        >
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ProviderLayout>
  )
}

export default ProviderTenants


