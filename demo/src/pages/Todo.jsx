import React, { useState, useEffect } from 'react'
import { useNavigationType } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/todo.css'
import '../styles/home.css'

const initialNotifications = [
  {
    category: 'お知らせ',
    icon: '/images/home/icon_bell.svg',
    items: [
      {
        id: 'info-1',
        type: 'キャンペーン',
        time: '1時間前',
        text: '初回ご利用キャンペーンのお知らせが届きました。',
        done: false
      },
      {
        id: 'info-2',
        type: 'システム',
        time: '3時間前',
        text: 'アプリがアップデートされました。',
        done: true
      }
    ]
  },
  {
    category: 'チャット',
    icon: '/images/home/icon_chat.svg',
    items: [
      {
        id: 'chat-1',
        type: 'チャット栄養相談',
        time: '1時間前',
        text: 'チャットが届きました。',
        meta: '田中 さやか',
        done: false
      },
      {
        id: 'chat-2',
        type: 'チャット栄養相談',
        time: '1時間前',
        text: 'パーソナルアドバイスが届きました。',
        meta: '田中 絢子',
        done: false
      },
      {
        id: 'chat-3',
        type: 'サポート',
        time: '昨日',
        text: 'お問い合わせへの返信がありました。',
        meta: 'サポートチーム',
        done: true
      }
    ]
  },
  {
    category: '通知',
    icon: '/images/home/icon_notifications.svg',
    items: [
      {
        id: 'notice-1',
        type: 'ミッション通知',
        time: '1時間前',
        text: 'そろそろミッションのお時間です。',
        meta: '6/28 23:00に予約',
        done: false
      },
      {
        id: 'notice-2',
        type: 'サプリタイマー',
        time: '1時間前',
        text: '服用の時間です。',
        meta: '毎日 22:45に予約',
        done: false
      },
      {
        id: 'notice-3',
        type: 'チャレンジ',
        time: '2日前',
        text: '睡眠改善チャレンジを開始しました。',
        meta: '7日間コース',
        done: true
      }
    ]
  },
  {
    category: '配送',
    icon: '/images/home/icon_truck.svg',
    items: [
      {
        id: 'delivery-1',
        type: 'COZY GABA',
        time: '1時間前',
        text: '商品の配送が完了しました。',
        meta: '6/28 10:00発送分',
        done: false
      },
      {
        id: 'delivery-2',
        type: 'GABAトレール',
        time: '1時間前',
        text: '商品が発送されました。',
        meta: '7/28 10:00発送分',
        done: false
      }
    ]
  },
  {
    category: 'お支払い',
    icon: '/images/home/icon_wallet.svg',
    items: [
      {
        id: 'payment-1',
        type: 'オンライン診療',
        time: '1時間前',
        text: '請求が届きました。',
        meta: 'オンライン診療費(6/28 10:00)',
        done: false
      }
    ]
  }
]

function Todo() {
  const navigationType = useNavigationType()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState('all') // 'all' | 'pending' | 'done'

  useEffect(() => {
    if (navigationType === 'POP') {
      window.location.reload()
    }
  }, [navigationType])

  const handleToggleItem = (groupIndex, itemId) => {
    setNotifications((prev) =>
      prev.map((group, gIdx) => {
        if (gIdx !== groupIndex) return group
        return {
          ...group,
          items: group.items.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item
          )
        }
      })
    )
  }

  // Calculate total counts
  const totalPending = notifications.reduce(
    (sum, group) => sum + group.items.filter((item) => !item.done).length,
    0
  )
  const totalDone = notifications.reduce(
    (sum, group) => sum + group.items.filter((item) => item.done).length,
    0
  )

  return (
    <Layout activeNav="todo">
      <div className="todo-page">
        <h2 className="content-section__title">やること</h2>
        
        {/* Filter buttons */}
        <div className="todo-filters">
          <button
            className={`todo-filter-button ${filter === 'all' ? 'todo-filter-button--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            すべて ({totalPending + totalDone})
          </button>
          <button
            className={`todo-filter-button ${filter === 'pending' ? 'todo-filter-button--active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            未対応 ({totalPending})
          </button>
          <button
            className={`todo-filter-button ${filter === 'done' ? 'todo-filter-button--active' : ''}`}
            onClick={() => setFilter('done')}
          >
            完了 ({totalDone})
          </button>
        </div>

        <div className="notifications-content">
          <section className="notifications-area">
            <div className="notifications-grid">
              {notifications.map((notification, groupIndex) => {
                const pendingCount = notification.items.filter((item) => !item.done).length
                const itemsToShow = notification.items.filter((item) => {
                  if (filter === 'pending') return !item.done
                  if (filter === 'done') return item.done
                  return true
                })

                if (itemsToShow.length === 0) return null

                return (
                  <div key={notification.category} className="notification-card">
                    <header className="notification-card__header">
                      <h3 className="notification-card__title">
                        <img src={notification.icon} alt="" className="nav__icon" />
                        {notification.category}
                      </h3>
                      <span className="notification-card__badge">{pendingCount}</span>
                    </header>
                    <ul className="notification-card__list">
                      {itemsToShow.map((item) => (
                        <li
                          key={item.id}
                          className={`notification-item ${item.done ? 'notification-item--done' : ''}`}
                        >
                          <div className="notification-item__header">
                            <p>
                              <span className={`notification-item__icon ${item.done ? 'notification-item__icon--done' : 'notification-item__icon--campaign'}`}></span>
                              {item.type}
                            </p>
                            <span className="notification-item__time">{item.time}</span>
                          </div>
                          <div className="notification-item__content">
                            <p className={`notification-item__text ${item.done ? 'notification-item__text--done' : ''}`}>
                              {item.text}
                            </p>
                            {item.meta && <p className="notification-item__meta">{item.meta}</p>}
                          </div>
                          <div className="notification-item__actions">
                            <button
                              className={`notification-item__button ${item.done ? 'notification-item__button--undo' : ''}`}
                              onClick={() => handleToggleItem(groupIndex, item.id)}
                            >
                              {item.done ? '未対応に戻す' : '完了にする'}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>

    </Layout>
  )
}

export default Todo
