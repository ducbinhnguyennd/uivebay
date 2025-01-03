import { useState, useEffect } from 'react'

function TableThanhPho ({
  dropdownRef,
  locations,
  setDeparture,
  setDropdownVisible
}) {
  const [data, setdata] = useState([])

  const fetchthanhpho = async () => {
    try {
      const response = await fetch('http://localhost:8080/getthanhpho')
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
  }, [])

  const handleDropdownClick = location => {
    setDeparture(location)
    setDropdownVisible(false)
  }

  return (
    <div className='destination-selector'>
      <h2>Chọn điểm đi</h2>
      <input
        type='text'
        placeholder='Nhập vào TÊN hoặc MÃ của THÀNH PHỐ hoặc SÂN BAY hoặc QUỐC GIA'
        className='search-box'
      />
      <div className='regions'>
        {data.map((index, item) => (
          <div key={index} className='region'>
            <h3>{item.namethanhpho}</h3>
            <ul>
              {item.thanhpho.map((index, place) => (
                <li key={index} className='destination-item'>
                  {place}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableThanhPho
