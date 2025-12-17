import React, { useState } from 'react'
import HRLayout from '../../components/HRLayout'
import '../../styles/common.css'

function HRUsers() {
  const [employees] = useState([
    { id: 1, name: '加藤 佳子', email: 'kato@abc.co.jp', employeeNo: '100128', department: '営業部', status: 'アクティブ', registered: '2024/10/01' },
    { id: 2, name: '田中 太郎', email: 'tanaka@abc.co.jp', employeeNo: '100129', department: '営業部', status: 'アクティブ', registered: '2024/10/01' },
    { id: 3, name: '佐藤 花子', email: 'sato@abc.co.jp', employeeNo: '100130', department: '開発部', status: 'アクティブ', registered: '2024/10/02' },
    { id: 4, name: '鈴木 一郎', email: 'suzuki@abc.co.jp', employeeNo: '100131', department: '開発部', status: 'アクティブ', registered: '2024/10/02' },
    { id: 5, name: '高橋 美咲', email: 'takahashi@abc.co.jp', employeeNo: '100132', department: '人事部', status: 'アクティブ', registered: '2024/10/03' },
    { id: 6, name: '伊藤 健', email: 'ito@abc.co.jp', employeeNo: '100133', department: '総務部', status: 'アクティブ', registered: '2024/10/03' },
    { id: 7, name: '渡辺 さくら', email: 'watanabe@abc.co.jp', employeeNo: '100134', department: '経理部', status: '一時停止', registered: '2024/10/04' },
    { id: 8, name: '中村 雄太', email: 'nakamura@abc.co.jp', employeeNo: '100135', department: '営業部', status: 'アクティブ', registered: '2024/10/04' },
    { id: 9, name: '小林 麻衣', email: 'kobayashi@abc.co.jp', employeeNo: '100136', department: '開発部', status: 'アクティブ', registered: '2024/10/05' },
    { id: 10, name: '山本 大輔', email: 'yamamoto@abc.co.jp', employeeNo: '100137', department: '人事部', status: 'アクティブ', registered: '2024/10/05' },
    { id: 11, name: '松本 愛', email: 'matsumoto@abc.co.jp', employeeNo: '100138', department: '総務部', status: 'アクティブ', registered: '2024/10/06' },
    { id: 12, name: '井上 翔太', email: 'inoue@abc.co.jp', employeeNo: '100139', department: '経理部', status: 'アクティブ', registered: '2024/10/06' },
    { id: 13, name: '木村 優香', email: 'kimura@abc.co.jp', employeeNo: '100140', department: '営業部', status: 'アクティブ', registered: '2024/10/07' },
    { id: 14, name: '林 健一', email: 'hayashi@abc.co.jp', employeeNo: '100141', department: '開発部', status: 'アクティブ', registered: '2024/10/07' },
    { id: 15, name: '斎藤 由美', email: 'saito@abc.co.jp', employeeNo: '100142', department: '人事部', status: 'アクティブ', registered: '2024/10/08' }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const departments = [...new Set(employees.map(emp => emp.department))]

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeNo.includes(searchTerm)
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <HRLayout activeNav="users">
      <section className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="content-section__title">利用者管理</h2>
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
            CSV一括登録
          </button>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="名前、メール、社員番号で検索..."
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
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="all">すべての部署</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
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
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>社員番号</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>メール</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>部署</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>ステータス</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}>登録日</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.name}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.employeeNo}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.email}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{employee.department}</td>
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
    </HRLayout>
  )
}

export default HRUsers

