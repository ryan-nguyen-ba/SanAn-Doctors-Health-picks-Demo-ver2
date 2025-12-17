import React from 'react'

function DataTable({ columns, data, searchable = false, onSearch, filters = [] }) {
  return (
    <div className="widget" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      {searchable && (
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="検索..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
      )}
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              {columns.map((col, index) => (
                <th
                  key={index}
                  style={{
                    padding: '12px',
                    textAlign: col.align || 'left',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ borderBottom: '1px solid #f0f0f0' }}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      padding: '12px',
                      fontSize: '14px',
                      textAlign: col.align || 'left'
                    }}
                  >
                    {col.render ? col.render(row) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable

