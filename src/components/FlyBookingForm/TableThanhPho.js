import { useState, useEffect } from 'react'
import './TableThanhPho.scss'

const removeVietnameseTones = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

function TableThanhPho ({ title, onSelect }) {
  const [data, setdata] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const fetchthanhpho = async () => {
    try {
      const response = await fetch('http://localhost:8080/getfulltp')
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

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
    } else {
      const normalizedSearch = removeVietnameseTones(searchTerm)

      const allSuggestions = data.flatMap(item =>
        item.thanhpho.filter(
          place =>
            removeVietnameseTones(place.name).includes(normalizedSearch) ||
            removeVietnameseTones(place.mathanhpho).includes(normalizedSearch)
        )
      )

      setSuggestions(allSuggestions)
    }
  }, [searchTerm, data])

  return (
    <div className='destination-selector'>
      <h2>{title}</h2>
      <div className='divinputsearch'>
        <h5>Tìm kiếm</h5>
        <input
          type='text'
          placeholder='Nhập vào TÊN hoặc MÃ của THÀNH PHỐ hoặc SÂN BAY hoặc QUỐC GIA'
          className='search-box'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button>Chọn</button>
      </div>

      {suggestions.length > 0 && (
        <div className='suggestion-box'>
          <ul>
            {suggestions.map((place, index) => (
              <li
                key={index}
                className='suggestion-item'
                onClick={() => {
                  onSelect(place.name, place.mathanhpho)
                  setSearchTerm('')
                  setSuggestions([])
                }}
              >
                {`${place.name} (${place.mathanhpho})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='regions'>
        {data.map((item, index) => (
          <div key={index} className='region'>
            <h3>{item.namevung}</h3>
            <ul>
              {item.thanhpho.map((place, i) => (
                <li
                  key={i}
                  className='destination-item'
                  onClick={() => onSelect(place.name, place.mathanhpho)}
                >
                  {item.namevung === 'Việt Nam'
                    ? `${place.name}`
                    : `${place.name} (${place.mathanhpho})`}
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
