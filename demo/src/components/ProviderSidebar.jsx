import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function ProviderSidebar({ activeNav = 'dashboard' }) {
  const location = useLocation()

  const navItems = [
    { path: '/provider/dashboard', icon: '/images/icon_home.svg', label: 'ダッシュボード', key: 'dashboard' },
    { path: '/provider/ingredients', icon: '/images/icon_supply.svg', label: '栄養素材', key: 'ingredients' },
    { path: '/provider/products', icon: '/images/icon_supply.svg', label: '製品管理', key: 'products' },
    { path: '/provider/challenges', icon: '/images/icon_challenge.svg', label: 'チャレンジ', key: 'challenges' },
    { path: '/provider/recipes', icon: '/images/icon_recipe.svg', label: 'レシピ', key: 'recipes' },
    { path: '/provider/missions', icon: '/images/icon_mission.svg', label: 'ミッション', key: 'missions' },
    { path: '/provider/content', icon: '/images/icon_chat.svg', label: 'コンテンツ配信', key: 'content' },
    { path: '/provider/tenants', icon: '/images/icon_settings.svg', label: '法人管理', key: 'tenants' },
    { path: '/provider/employees', icon: '/images/icon_todo.svg', label: '従業員管理', key: 'employees' },
    { path: '/provider/analytics', icon: '/images/icon_home.svg', label: 'データ集計', key: 'analytics' },
  ]

  const isActive = (key) => {
    if (activeNav) return activeNav === key
    return location.pathname === navItems.find(item => item.key === key)?.path
  }

  return (
    <aside className="sidebar sidebar--left">
      <div className="profile">
        <img src="/images/pic_avatar.jpg" alt="Provider Admin" className="profile__avatar" />
        <h2 className="profile__name">提供者管理者</h2>
        <p className="profile__id">Provider ID: PROV001</p>
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

export default ProviderSidebar

