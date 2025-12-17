import React from 'react'
import { Link } from 'react-router-dom'

function Header({ navItems = null }) {
  return (
    <header className="main-header">
      <div className="main-header__logo__area">
        <h1 className="main-header__logo">
          <img src="/images/logo.png" alt="Health Picks" />
        </h1>
      </div>
      {navItems && (
        <div className="main-header__nav">
          {navItems.map((item, index) => (
            <span 
              key={index} 
              className={item.active ? 'main-header__nav__active' : ''}
            >
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                item.label
              )}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header

