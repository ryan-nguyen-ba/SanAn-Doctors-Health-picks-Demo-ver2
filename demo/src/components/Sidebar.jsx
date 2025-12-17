import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ activeNav = 'home' }) {
  const location = useLocation()

  const navItems = [
    { path: '/home', icon: '/images/icon_home.svg', label: 'ホーム', key: 'home' },
    { path: '/todo', icon: '/images/icon_todo.svg', label: 'やること', key: 'todo' },
    { path: '/challenge', icon: '/images/icon_challenge.svg', label: 'チャレンジ', key: 'challenge' },
    { path: '/recipe', icon: '/images/icon_recipe.svg', label: 'レシピ', key: 'recipe' },
    { path: '/mission', icon: '/images/icon_mission.svg', label: 'ミッション', key: 'mission' },
    { path: '/supply', icon: '/images/icon_supply.svg', label: 'サプリ', key: 'supply' },
  ]

  const isActive = (key) => {
    if (activeNav) return activeNav === key
    return location.pathname === navItems.find(item => item.key === key)?.path
  }

  return (
    <aside className="sidebar sidebar--left">
      <div className="profile">
        <img src="/images/pic_avatar.jpg" alt="加藤 佳子" className="profile__avatar" />
        <h2 className="profile__name">加藤 佳子</h2>
        <p className="profile__id">社員No: 100128</p>
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

export default Sidebar

