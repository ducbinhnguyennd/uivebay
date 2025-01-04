import { useState, useEffect } from 'react'
import './TableTP.scss'

const removeVietnameseTones = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

function TableTP ({ title, onSelect }) {
  const [data, setdata] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const fetchthanhpho = async () => {
    try {
      const response = await fetch('https://webmaybay.vercel.app/getfulltp')
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
    <div className='destination-selector1'>
      <h4>{title}</h4>
      <div className='destination-list1'>
        <div className='regions1'>
          {data.map((item, index) => (
            <div key={index} className='region1'>
              <h3>{item.namevung}</h3>
              <ul>
                {item.thanhpho.map((place, i) => (
                  <li
                    key={i}
                    className='destination-item1'
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

        <div className='divinputsearch1'>
          <h5>
            Nhập vào tên thành phố, hoặc tên sân bay, hoặc mã thành phố, hoặc mã
            sân bay
          </h5>
          <input
            type='text'
            className='search-box1'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button>Chọn</button>
        </div>

        {suggestions.length > 0 && (
          <div className='suggestion-box1'>
            <ul>
              {suggestions.map((place, index) => (
                <li
                  key={index}
                  className='suggestion-item1'
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
      </div>
    </div>
  )
}

export default TableTP
