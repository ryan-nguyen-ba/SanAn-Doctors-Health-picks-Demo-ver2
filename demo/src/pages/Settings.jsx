import React, { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/home.css'

function Settings() {
  const [profile, setProfile] = useState({
    name: '加藤 佳子',
    email: 'kato.yoshiko@example.com',
    employeeId: '100128',
    department: '営業部',
    birthDate: '1985-05-15',
    gender: '女性'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    missionReminder: true,
    supplementReminder: true,
    chatNotification: true,
    deliveryNotification: true
  })

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <Layout activeNav="settings">
      <div className="settings-page">
        <h2 className="content-section__title">設定</h2>

        {/* プロフィール設定 */}
        <section className="settings-section">
          <h3 className="settings-section__title">プロフィール設定</h3>
          <div className="settings-card">
            <div className="settings-form">
              <div className="settings-form__group">
                <label className="settings-form__label">氏名</label>
                <input 
                  type="text" 
                  className="settings-form__input" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div className="settings-form__group">
                <label className="settings-form__label">メールアドレス</label>
                <input 
                  type="email" 
                  className="settings-form__input" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              <div className="settings-form__group">
                <label className="settings-form__label">社員番号</label>
                <input 
                  type="text" 
                  className="settings-form__input" 
                  value={profile.employeeId}
                  disabled
                />
              </div>
              <div className="settings-form__group">
                <label className="settings-form__label">部署</label>
                <input 
                  type="text" 
                  className="settings-form__input" 
                  value={profile.department}
                  onChange={(e) => setProfile({...profile, department: e.target.value})}
                />
              </div>
              <div className="settings-form__group">
                <label className="settings-form__label">生年月日</label>
                <input 
                  type="date" 
                  className="settings-form__input" 
                  value={profile.birthDate}
                  onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                />
              </div>
              <div className="settings-form__group">
                <label className="settings-form__label">性別</label>
                <select 
                  className="settings-form__input"
                  value={profile.gender}
                  onChange={(e) => setProfile({...profile, gender: e.target.value})}
                >
                  <option value="男性">男性</option>
                  <option value="女性">女性</option>
                  <option value="その他">その他</option>
                </select>
              </div>
            </div>
            <button className="settings-button settings-button--primary">
              プロフィールを保存
            </button>
          </div>
        </section>

        {/* 通知設定 */}
        <section className="settings-section">
          <h3 className="settings-section__title">通知設定</h3>
          <div className="settings-card">
            <div className="settings-toggle-list">
              <div className="settings-toggle-item">
                <div className="settings-toggle-item__info">
                  <span className="settings-toggle-item__label">メール通知</span>
                  <span className="settings-toggle-item__description">重要なお知らせをメールで受け取る</span>
                </div>
                <label className="settings-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="settings-toggle__slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div className="settings-toggle-item__info">
                  <span className="settings-toggle-item__label">プッシュ通知</span>
                  <span className="settings-toggle-item__description">アプリからの通知を受け取る</span>
                </div>
                <label className="settings-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="settings-toggle__slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div className="settings-toggle-item__info">
                  <span className="settings-toggle-item__label">ミッションリマインダー</span>
                  <span className="settings-toggle-item__description">ミッションの時間になったら通知</span>
                </div>
                <label className="settings-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.missionReminder}
                    onChange={() => handleNotificationChange('missionReminder')}
                  />
                  <span className="settings-toggle__slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div className="settings-toggle-item__info">
                  <span className="settings-toggle-item__label">サプリタイマー</span>
                  <span className="settings-toggle-item__description">サプリ服用の時間を通知</span>
                </div>
                <label className="settings-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.supplementReminder}
                    onChange={() => handleNotificationChange('supplementReminder')}
                  />
                  <span className="settings-toggle__slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div className="settings-toggle-item__info">
                  <span className="settings-toggle-item__label">チャット通知</span>
                  <span className="settings-toggle-item__description">新しいチャットメッセージを通知</span>
                </div>
                <label className="settings-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.chatNotification}
                    onChange={() => handleNotificationChange('chatNotification')}
                  />
                  <span className="settings-toggle__slider"></span>
                </label>
              </div>

              <div className="settings-toggle-item">
                <div className="settings-toggle-item__info">
                  <span className="settings-toggle-item__label">配送通知</span>
                  <span className="settings-toggle-item__description">商品の配送状況を通知</span>
                </div>
                <label className="settings-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.deliveryNotification}
                    onChange={() => handleNotificationChange('deliveryNotification')}
                  />
                  <span className="settings-toggle__slider"></span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* アカウント設定 */}
        <section className="settings-section">
          <h3 className="settings-section__title">アカウント設定</h3>
          <div className="settings-card">
            <div className="settings-action-list">
              <button className="settings-action-button">
                パスワードを変更
              </button>
              <button className="settings-action-button">
                アンケートを再回答
              </button>
              <button className="settings-action-button settings-action-button--danger">
                アカウントを削除
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .settings-page {
          padding: 20px;
          max-width: 800px;
        }
        .settings-section {
          margin-bottom: 30px;
        }
        .settings-section__title {
          font-size: 16px;
          font-weight: bold;
          color: #87581E;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #FFCC00;
        }
        .settings-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .settings-form__group {
          margin-bottom: 16px;
        }
        .settings-form__label {
          display: block;
          font-size: 13px;
          font-weight: bold;
          color: #555;
          margin-bottom: 6px;
        }
        .settings-form__input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          box-sizing: border-box;
        }
        .settings-form__input:focus {
          outline: none;
          border-color: #FFCC00;
        }
        .settings-form__input:disabled {
          background: #f5f5f5;
          color: #999;
        }
        .settings-button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }
        .settings-button--primary {
          background: #FFCC00;
          color: #87581E;
        }
        .settings-button--primary:hover {
          background: #e6b800;
        }
        .settings-toggle-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .settings-toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        .settings-toggle-item:last-child {
          border-bottom: none;
        }
        .settings-toggle-item__info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .settings-toggle-item__label {
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }
        .settings-toggle-item__description {
          font-size: 12px;
          color: #888;
        }
        .settings-toggle {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
        }
        .settings-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .settings-toggle__slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .3s;
          border-radius: 26px;
        }
        .settings-toggle__slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        .settings-toggle input:checked + .settings-toggle__slider {
          background-color: #FFCC00;
        }
        .settings-toggle input:checked + .settings-toggle__slider:before {
          transform: translateX(24px);
        }
        .settings-action-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .settings-action-button {
          padding: 12px 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
          font-size: 14px;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }
        .settings-action-button:hover {
          background: #f9f9f9;
        }
        .settings-action-button--danger {
          color: #dc3545;
          border-color: #dc3545;
        }
        .settings-action-button--danger:hover {
          background: #fff5f5;
        }
      `}</style>
    </Layout>
  )
}

export default Settings

