import React, { useState } from 'react'
import ProviderLayout from '../../components/ProviderLayout'
import '../../styles/common.css'

function ProviderEmployees() {
  const [employees] = useState([
    { id: 1, name: '加藤 佳子', email: 'kato@abc.co.jp', tenant: '株式会社ABC', status: 'アクティブ', registered: '2024/10/05' },
    { id: 2, name: '田中 太郎', email: 'tanaka@abc.co.jp', tenant: '株式会社ABC', status: 'アクティブ', registered: '2024/10/03' },
    { id: 3, name: '佐藤 花子', email: 'sato@abc.co.jp', tenant: '株式会社ABC', status: 'アクティブ', registered: '2024/10/01' },
    { id: 4, name: '鈴木 一郎', email: 'suzuki@xyz.co.jp', tenant: 'XYZ株式会社', status: 'アクティブ', registered: '2024/09/20' },
    { id: 5, name: '高橋 美咲', email: 'takahashi@xyz.co.jp', tenant: 'XYZ株式会社', status: 'アクティブ', registered: '2024/09/18' },
    { id: 6, name: '伊藤 健', email: 'ito@def.co.jp', tenant: 'DEFコーポレーション', status: 'アクティブ', registered: '2024/09/10' },
    { id: 7, name: '渡辺 さくら', email: 'watanabe@def.co.jp', tenant: 'DEFコーポレーション', status: '一時停止', registered: '2024/09/05' },
    { id: 8, name: '中村 雄太', email: 'nakamura@ghi.co.jp', tenant: 'GHI株式会社', status: 'アクティブ', registered: '2024/08/25' },
    { id: 9, name: '小林 麻衣', email: 'kobayashi@ghi.co.jp', tenant: 'GHI株式会社', status: 'アクティブ', registered: '2024/08/22' },
    { id: 10, name: '山本 大輔', email: 'yamamoto@ghi.co.jp', tenant: 'GHI株式会社', status: 'アクティブ', registered: '2024/08/20' },
    { id: 11, name: '松本 愛', email: 'matsumoto@jkl.co.jp', tenant: 'JKL有限会社', status: 'アクティブ', registered: '2024/08/15' },
    { id: 12, name: '井上 翔太', email: 'inoue@jkl.co.jp', tenant: 'JKL有限会社', status: '一時停止', registered: '2024/08/12' },
    { id: 13, name: '木村 優香', email: 'kimura@mno.co.jp', tenant: 'MNO株式会社', status: 'アクティブ', registered: '2024/07/30' },
    { id: 14, name: '林 健一', email: 'hayashi@mno.co.jp', tenant: 'MNO株式会社', status: 'アクティブ', registered: '2024/07/28' },
    { id: 15, name: '斎藤 由美', email: 'saito@pqr.co.jp', tenant: 'PQRコーポレーション', status: 'アクティブ', registered: '2024/07/10' },
    { id: 16, name: '清水 拓也', email: 'shimizu@pqr.co.jp', tenant: 'PQRコーポレーション', status: 'アクティブ', registered: '2024/07/08' },
    { id: 17, name: '山口 美穂', email: 'yamaguchi@pqr.co.jp', tenant: 'PQRコーポレーション', status: 'アクティブ', registered: '2024/07/05' },
    { id: 18, name: '森 直樹', email: 'mori@stu.co.jp', tenant: 'STU株式会社', status: 'アクティブ', registered: '2024/06/20' },
    { id: 19, name: '池田 理恵', email: 'ikeda@stu.co.jp', tenant: 'STU株式会社', status: 'アクティブ', registered: '2024/06/18' },
    { id: 20, name: '橋本 和也', email: 'hashimoto@stu.co.jp', tenant: 'STU株式会社', status: 'アクティブ', registered: '2024/06/15' }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterTenant, setFilterTenant] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const tenants = [...new Set(employees.map(emp => emp.tenant))]

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTenant = filterTenant === 'all' || emp.tenant === filterTenant
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus
    return matchesSearch && matchesTenant && matchesStatus
  })

  return (
    <ProviderLayout activeNav="employees">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">従業員管理</h2>
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
            + 新規招待
          </button>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="名前またはメールで検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              maxWidth: '400px',
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <select
            value={filterTenant}
            onChange={(e) => setFilterTenant(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="all">すべての法人</option>
            {tenants.map(tenant => (
              <option key={tenant} value={tenant}>{tenant}</option>
            ))}
          </select>
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
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>名前</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>メール</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>法人</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>ステータス</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>登録日</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.name}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.email}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.tenant}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          backgroundColor: employee.status === 'アクティブ' ? '#d4edda' : '#fff3cd',
                          color: employee.status === 'アクティブ' ? '#155724' : '#856404',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.registered}</td>
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
                            backgroundColor: employee.status === 'アクティブ' ? '#fff3cd' : '#d4edda',
                            border: '1px solid #ffc107',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: '#856404'
                          }}
                        >
                          {employee.status === 'アクティブ' ? '無効化' : '有効化'}
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

export default ProviderEmployees


