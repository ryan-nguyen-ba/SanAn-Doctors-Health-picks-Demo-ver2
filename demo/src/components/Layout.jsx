import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

function Layout({ children, activeNav = 'home', showRightSidebar = false, rightSidebarContent = null }) {
  return (
    <div className="container">
      <Header />
      <Sidebar activeNav={activeNav} />
      <div className="main-area">
        <main className="main-content">
          {children}
        </main>
      </div>
      {showRightSidebar && rightSidebarContent && (
        <aside className="sidebar sidebar--right">
          {rightSidebarContent}
        </aside>
      )}
    </div>
  )
}

export default Layout

