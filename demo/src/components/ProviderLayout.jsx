import React from 'react'
import Header from './Header'
import ProviderSidebar from './ProviderSidebar'

function ProviderLayout({ children, activeNav = 'dashboard', showRightSidebar = false, rightSidebarContent = null }) {
  return (
    <div className="container">
      <Header />
      <ProviderSidebar activeNav={activeNav} />
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

export default ProviderLayout

