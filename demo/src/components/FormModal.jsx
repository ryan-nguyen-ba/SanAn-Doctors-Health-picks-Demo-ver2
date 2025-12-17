import React from 'react'

function FormModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default FormModal


