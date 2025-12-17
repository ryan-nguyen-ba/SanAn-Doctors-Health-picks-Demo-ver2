import React, { useState } from 'react'
import HRLayout from '../../components/HRLayout'
import '../../styles/common.css'

function HRNotifications() {
  const [notifications] = useState([
    { id: 1, type: 'ミッション通知', enabled: true, schedule: '毎日 22:00', template: 'そろそろミッションのお時間です。' },
    { id: 2, type: 'サプリタイマー', enabled: true, schedule: '設定された時間', template: '服用の時間です。' },
    { id: 3, type: 'アンケートリマインド', enabled: true, schedule: '期限3日前', template: 'アンケートの回答期限が近づいています。' },
    { id: 4, type: 'チャレンジ開始', enabled: false, schedule: 'チャレンジ開始時', template: '新しいチャレンジが開始されました。' },
    { id: 5, type: '週次レポート', enabled: true, schedule: '毎週月曜 9:00', template: '今週の健康レポートをお送りします。' }
  ])

  const [uncompletedUsers] = useState([
    { id: 1, name: '田中 太郎', email: 'tanaka@abc.co.jp', department: '営業部', lastActivity: '2024/12/10', missingTasks: ['アンケート', 'ミッション'] },
    { id: 2, name: '佐藤 花子', email: 'sato@abc.co.jp', department: '開発部', lastActivity: '2024/12/08', missingTasks: ['アンケート'] },
    { id: 3, name: '鈴木 一郎', email: 'suzuki@xyz.co.jp', department: '総務部', lastActivity: '2024/12/05', missingTasks: ['ミッション', 'ログ記録'] },
    { id: 4, name: '高橋 美咲', email: 'takahashi@xyz.co.jp', department: '人事部', lastActivity: '2024/12/12', missingTasks: ['ログ記録'] },
    { id: 5, name: '伊藤 健', email: 'ito@def.co.jp', department: '経理部', lastActivity: '2024/12/01', missingTasks: ['アンケート', 'ミッション', 'ログ記録'] }
  ])

  const [templates] = useState([
    { id: 1, name: 'アンケートリマインド', subject: 'アンケートのご回答をお願いします', body: '健康状態を把握するため、アンケートへのご回答をお願いいたします。' },
    { id: 2, name: 'ミッションリマインド', subject: '本日のミッションをお忘れなく', body: '本日のミッションをまだ完了されていないようです。健康習慣の継続のため、ぜひご確認ください。' },
    { id: 3, name: 'チャレンジ開始通知', subject: '新しいチャレンジが開始されました', body: 'あなたに最適なチャレンジが開始されました。ぜひご参加ください。' }
  ])

  const toggleNotification = (id) => {
    // In real app, this would update the state
    console.log('Toggle notification', id)
  }

  return (
    <HRLayout activeNav="notifications">
      <section className="content-section">
        <h2 className="content-section__title">通知・リマインド管理</h2>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 className="widget__title" style={{ marginBottom: '16px' }}>通知設定</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>{notif.type}</p>
                  <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>スケジュール: {notif.schedule}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>テンプレート: {notif.template}</p>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notif.enabled}
                    onChange={() => toggleNotification(notif.id)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <span style={{ marginLeft: '8px', fontSize: '14px' }}>{notif.enabled ? 'ON' : 'OFF'}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 className="widget__title" style={{ marginBottom: '16px' }}>未実施ユーザー一覧</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>名前</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>部署</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>最終活動</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold' }}>未実施タスク</th>
                  <th style={{ padding: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {uncompletedUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>{user.name}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>{user.department}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>{user.lastActivity}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {user.missingTasks.map((task, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '2px 6px',
                              backgroundColor: '#ffebee',
                              color: '#c62828',
                              borderRadius: '3px',
                              fontSize: '11px'
                            }}
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '14px' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#FFCC00',
                          color: '#5C3D16',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        リマインド送信
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="widget__title" style={{ margin: 0 }}>通知テンプレート</h3>
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
              + 新規テンプレート
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {templates.map((template) => (
              <div
                key={template.id}
                style={{
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px'
                }}
              >
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{template.name}</p>
                <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}><strong>件名:</strong> {template.subject}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}><strong>本文:</strong> {template.body}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
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
                      backgroundColor: '#FFCC00',
                      color: '#5C3D16',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    一括送信
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </HRLayout>
  )
}

export default HRNotifications


