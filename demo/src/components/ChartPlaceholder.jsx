import React from 'react'

function ChartPlaceholder({ title, data, type = 'bar' }) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      {title && <h3 className="widget__title" style={{ marginBottom: '16px' }}>{title}</h3>}
      {type === 'bar' && (
        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
          {data.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div
                style={{
                  width: '40px',
                  height: `${(item.value / maxValue) * 150}px`,
                  backgroundColor: '#FFCC00',
                  borderRadius: '4px 4px 0 0',
                  minHeight: '20px'
                }}
                title={item.label}
              ></div>
              <span style={{ fontSize: '11px', color: '#666' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
      {type === 'line' && (
        <div style={{ height: '200px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', position: 'relative' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <polyline
              points={data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100
                const y = 100 - (item.value / maxValue) * 100
                return `${x}%,${y}%`
              }).join(' ')}
              fill="none"
              stroke="#FFCC00"
              strokeWidth="3"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default ChartPlaceholder

