import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function HRSidebar({ activeNav = 'dashboard' }) {
  const location = useLocation()

  const navItems = [
    { path: '/hr/dashboard', icon: '/images/icon_home.svg', label: 'ダッシュボード', key: 'dashboard' },
    { path: '/hr/challenges', icon: '/images/icon_challenge.svg', label: 'チャレンジ分析', key: 'challenges' },
    { path: '/hr/health', icon: '/images/icon_supply.svg', label: '健康分析', key: 'health' },
    { path: '/hr/notifications', icon: '/images/icon_chat.svg', label: '通知管理', key: 'notifications' },
    { path: '/hr/users', icon: '/images/icon_todo.svg', label: '利用者管理', key: 'users' },
    { path: '/hr/subsidy', icon: '/images/home/icon_wallet.svg', label: '社販管理', key: 'subsidy' },
    { path: '/hr/announcements', icon: '/images/home/icon_bell.svg', label: 'お知らせ配信', key: 'announcements' },
  ]

  const isActive = (key) => {
    if (activeNav) return activeNav === key
    return location.pathname === navItems.find(item => item.key === key)?.path
  }

  return (
    <aside className="sidebar sidebar--left">
      <div className="profile">
        <img src="/images/pic_avatar.jpg" alt="HR Admin" className="profile__avatar" />
        <h2 className="profile__name">人事管理者</h2>
        <p className="profile__id">HR Admin ID: HR001</p>
      </div>

      <nav className="nav">
        <ul className="nav__list">
          {navItems.map((item) => (
            <li 
              key={item.key} 
              className={`nav__item ${isActive(item.key) ? 'nav__item--active' : ''}`}
            >
              <Link to={item.path} className="nav__link">
                <img src={item.icon} alt={item.label} className="nav__icon" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <ul className="nav__list">
          <li className="nav__item">
            <a href="#" className="nav__link">
              <img src="/images/icon_settings.svg" alt="設定" className="nav__icon" />
              設定
            </a>
          </li>
          <li className="nav__item">
            <Link to="/login" className="nav__link">
              <img src="/images/icon_logout.svg" alt="ログアウト" className="nav__icon" />
              ログアウト
            </Link>
          </li>
        </ul>
        <div className="support-info">
          <p className="support-info__title">サポート窓口</p>
          <a href="mailto:support@healthpicks.com" className="support-info__email">
            <img src="/images/icon_support.svg" alt="サポート" className="nav__icon" />
            support@healthpicks.com
          </a>
        </div>
      </div>
    </aside>
  )
}

export default HRSidebar

