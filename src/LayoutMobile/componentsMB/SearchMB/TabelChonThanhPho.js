import React, { useState, useEffect } from 'react'
import './TableChonThanhPho.scss'

function TableChonThanhPho ({ onClose, onSelect }) {
  const [isExiting, setIsExiting] = useState(false)
  const [data, setdata] = useState([])
  const handleExit = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const fetchthanhpho = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getfulltp')
      const data = await response.json()
      if (response.ok) {
        setdata(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchthanhpho()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`table-container-full ${isExiting ? 'exiting' : 'entering'}`}
    >
      <div className='table-header'>
        <button className='btn-back' onClick={handleExit}>
          Quay lại
        </button>
        <h3 className='header-title'>Chọn điểm khởi hành</h3>
      </div>
      <div className='table-body'>
        {data.map((group, index) => (
          <div key={index} className='city-group'>
            <div className='group-title'>{group.namevung}</div>
            {group.thanhpho.map((city, i) => (
              <div
                key={i}
                className='table-row'
                onClick={() => onSelect(city.name, handleExit)}
              >
                {group.namevung === 'Việt Nam'
                  ? `${city.name}`
                  : `${city.name} (${city.mathanhpho})`}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableChonThanhPho
