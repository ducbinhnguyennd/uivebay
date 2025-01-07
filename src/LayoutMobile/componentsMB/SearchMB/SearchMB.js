import React, { useState } from 'react'
import './SearchMB.scss'
import TableChonThanhPho from './TabelChonThanhPho'
const SearchMB = () => {
  const [departureCity, setDepartureCity] = useState('Tp Hồ Chí Minh')
  const [arrivalCity, setArrivalCity] = useState('Hà Nội')
  const [departureDate, setDepartureDate] = useState('T.Tư, 08 tháng 01, 2025')
  const [returnDate, setReturnDate] = useState('--/--/----')
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)
  const [isCityTableVisible, setCityTableVisible] = useState(false)

  const handleCityChange = (setCity, city) => {
    setCity(city)
  }

  const handleCountChange = (setCount, count) => {
    setCount(count)
  }

  const handleSearch = () => {
    console.log('Searching for flights...')
  }

  const handleCitySelect = (city,closemodal) => {
    setDepartureCity(city)
    closemodal()
  }

  return (
    <section id='searchform'>
      <div className='wrapsearch'>
        <div className='rowmb'>
          <div className='col1'>
            <label className='lbl lbldep'>Đi từ</label>
          </div>
          <div className='col2'>
            <div
              className='txt divDepartureAirport'
              onClick={() => setCityTableVisible(true)}
            >
              {departureCity}
            </div>
            <i className='iconreverse' onClick={() => {}}></i>
          </div>
        </div>
        {isCityTableVisible && (
          <TableChonThanhPho
            onClose={() => setCityTableVisible(false)}
            onSelect={handleCitySelect}
          />
        )}

        <div className='rowmb'>
          <div className='col1'>
            <label className='lbl lblarr'>Đi đến</label>
          </div>
          <div className='col2'>
            <div
              className='txt divArrivalAirport'
              onClick={() => handleCityChange(setArrivalCity, 'Chọn điểm đến')}
            >
              {arrivalCity}
            </div>
          </div>
        </div>
        <div className='rowmb'>
          <div className='col1'>
            <label className='lbl lbldate'>Ngày đi</label>
          </div>
          <div className='col2'>
            <div
              className='txt divDepartureDate'
              onClick={() => setDepartureDate('Chọn ngày khởi hành')}
            >
              {departureDate}
            </div>
          </div>
        </div>
        <div className='rowmb'>
          <div className='col1'>
            <label className='lbl lbldate'>Ngày về</label>
          </div>
          <div className='col2'>
            <div
              className='txt divReturnDate gray'
              onClick={() => setReturnDate('Chọn ngày về')}
            >
              {returnDate}
            </div>
          </div>
        </div>
        <div className='paxinfo'>
          <label className='lblsmall'>Số hành khách</label>
          <label
            className='lblsmall lblreset dnone'
            style={{ display: 'none' }}
          >
            x Bỏ chọn ngày về
          </label>
        </div>
        <div className='rowmb'>
          <div className='col13'>
            <label className='lblsmall'>Người lớn (&gt;12t)</label>
          </div>
          <div className='col13'>
            <label className='lblsmall'>Trẻ em (2-12t)</label>
          </div>
          <div className='col13'>
            <label className='lblsmall'>Em bé (0-2t)</label>
          </div>
        </div>
        <div className='rowmb'>
          <div className='col13 paxinput'>
            <button
              className='btn btnminus'
              onClick={() =>
                handleCountChange(setAdultCount, Math.max(adultCount - 1, 0))
              }
            >
              -
            </button>
            <select
              className='selectmb'
              value={adultCount}
              onChange={e => handleCountChange(setAdultCount, e.target.value)}
            >
              {[...Array(9)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button
              className='btn btnplus'
              onClick={() => handleCountChange(setAdultCount, adultCount + 1)}
            >
              +
            </button>
          </div>
          <div className='col13 paxinput'>
            <button
              className='btn btnminus'
              onClick={() =>
                handleCountChange(setChildCount, Math.max(childCount - 1, 0))
              }
            >
              -
            </button>
            <select
              className='selectmb'
              value={childCount}
              onChange={e => handleCountChange(setChildCount, e.target.value)}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <button
              className='btn btnplus'
              onClick={() => handleCountChange(setChildCount, childCount + 1)}
            >
              +
            </button>
          </div>
          <div className='col13 paxinput'>
            <button
              className='btn btnminus'
              onClick={() =>
                handleCountChange(setInfantCount, Math.max(infantCount - 1, 0))
              }
            >
              -
            </button>
            <select
              className='selectmb'
              value={infantCount}
              onChange={e => handleCountChange(setInfantCount, e.target.value)}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <button
              className='btn btnplus'
              onClick={() => handleCountChange(setInfantCount, infantCount + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className='search-button'>
          <div className='btn-search btnSearch2' onClick={handleSearch}>
            TÌM CHUYẾN BAY
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchMB
