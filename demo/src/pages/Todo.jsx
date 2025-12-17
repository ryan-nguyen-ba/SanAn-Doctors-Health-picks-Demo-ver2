import React from 'react'
import Layout from '../components/Layout'
import '../styles/todo.css'
import '../styles/home.css'

function Todo() {
  const notifications = [
    {
      category: 'お知らせ',
      icon: '/images/home/icon_bell.svg',
      badge: 1,
      items: [
        {
          type: 'キャンペーン',
          time: '1時間前',
          text: '初回ご利用キャンペーンのお知らせが届きました。'
        }
      ]
    },
    {
      category: 'チャット',
      icon: '/images/home/icon_chat.svg',
      badge: 2,
      items: [
        {
          type: 'チャット栄養相談',
          time: '1時間前',
          text: 'チャットが届きました。',
          meta: '田中 さやか'
        },
        {
          type: 'チャット栄養相談',
          time: '1時間前',
          text: 'パーソナルアドバイスが届きました。',
          meta: '田中 絢子'
        }
      ]
    },
    {
      category: '通知',
      icon: '/images/home/icon_notifications.svg',
      badge: 2,
      items: [
        {
          type: 'ミッション通知',
          time: '1時間前',
          text: 'そろそろミッションのお時間です。',
          meta: '6/28 23:00に予約'
        },
        {
          type: 'サプリタイマー',
          time: '1時間前',
          text: '服用の時間です。',
          meta: '毎日 22:45に予約'
        }
      ]
    },
    {
      category: '配送',
      icon: '/images/home/icon_truck.svg',
      badge: 2,
      items: [
        {
          type: '〇〇〇〇〇〇〇〇',
          time: '1時間前',
          text: '商品の配送が完了しました。',
          meta: '6/28 10:00発送分'
        },
        {
          type: '〇〇〇〇〇〇〇〇',
          time: '1時間前',
          text: '商品が発送されました。',
          meta: '7/28 10:00発送分'
        }
      ]
    },
    {
      category: 'お支払い',
      icon: '/images/home/icon_wallet.svg',
      badge: 1,
      items: [
        {
          type: '〇〇〇〇〇〇〇〇',
          time: '1時間前',
          text: '請求が届きました。',
          meta: 'オンライン診療費(6/28 10:00)'
        }
      ]
    }
  ]

  return (
    <Layout activeNav="todo">
      <div className="notifications-content">
        <section className="notifications-area">
          <div className="notifications-grid">
            {notifications.map((notification, index) => (
              <div key={index} className="notification-card">
                <header className="notification-card__header">
                  <h3 className="notification-card__title">
                    <img src={notification.icon} alt="" className="nav__icon" />
                    {notification.category}
                  </h3>
                  <span className="notification-card__badge">{notification.badge}</span>
                </header>
                <ul className="notification-card__list">
                  {notification.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="notification-item">
                      <div className="notification-item__header">
                        <p>
                          <span className="notification-item__icon notification-item__icon--campaign"></span>
                          {item.type}
                        </p>
                        <span className="notification-item__time">{item.time}</span>
                      </div>
                      <div className="notification-item__content">
                        <p className="notification-item__text">{item.text}</p>
                        {item.meta && <p className="notification-item__meta">{item.meta}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Todo
