import React, { useState } from 'react'
import './SearchMB.scss'
import TableChonThanhPho from './TabelChonThanhPho'
import { useToast } from '../../../components/useToast/ToastContext'
import { formatDate } from '../../../components/LunarCalendarFormat/LunarCalendarFormat'
import { useNavigate } from 'react-router-dom'
const SearchMB = () => {
  const today = new Date().toISOString().split('T')[0]
  const navigate = useNavigate()
  const [departureCity, setDepartureCity] = useState('')
  const [arrivalCity, setArrivalCity] = useState('')
  const [departureDate, setDepartureDate] = useState(today)
  const [returnDate, setReturnDate] = useState('')
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)
  const [isCityTableVisible, setCityTableVisible] = useState(false)
  const [isCityTableVisible2, setCityTableVisible2] = useState(false)
  const [data, setdata] = useState([])
  const {
    setSearchData,
    setcityto,
    setcityfrom,
    setmafrom,
    setmato,
    setdate,
    setreturnDate,
    setmangnguoi,
    mafrom,
    mato,
    showToast
  } = useToast()

  const handleCountChange = (setCount, count) => {
    setCount(count)
  }

  const handleCityFrom = (city, closemodal, mafrom) => {
    setDepartureCity(city)
    setcityfrom(city)
    setmafrom(mafrom)
    closemodal()
  }

  const handleCityTo = (city, closemodal, mato) => {
    setArrivalCity(city)
    setcityto(city)
    setmato(mato)
    closemodal()
  }

  const validate = () => {
    let valid = true

    if (!departureCity) {
      valid = false
      showToast('Bạn chưa chọn điểm đi', 'warning')
    }

    if (!arrivalCity) {
      valid = false
      showToast('Bạn chưa chọn điểm đến', 'warning')
    }

    if (adultCount === 0) {
      valid = false
      showToast('Số lượng khách người lớn phải lớn hơn 1', 'warning')
    }

    if (adultCount < infantCount) {
      valid = false
      showToast(
        'Số lượng khách người lớn phải lớn hơn hoặc bằng khách em bé',
        'warning'
      )
    }

    return valid
  }
  const isInVietnam = (code, data) => {
    return data.some(
      item =>
        item.namevung === 'Việt Nam' &&
        item.thanhpho.some(place => place.mathanhpho === code)
    )
  }

  const handelSearch = async () => {
    if (!validate()) return

    try {
      const isDepartureInVietnam = isInVietnam(mafrom, data)
      const isArrivalInVietnam = isInVietnam(mato, data)

      const requestData = {
        departure: mafrom,
        arrival: mato,
        date: formatDate(departureDate),
        adults: adultCount,
        children: childCount,
        infants: infantCount
      }

      if (returnDate) {
        requestData.returnDate = formatDate(returnDate)
        setreturnDate(returnDate)
      }

      if (isDepartureInVietnam && isArrivalInVietnam) {
        const response = await fetch(
          `https://wooordersystem.store/order-woo/api/getInfoFlights`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
          }
        )
        const data = await response.json()

        if (response.ok) {
          setSearchData(data)
          setmangnguoi(() => {
            const newState = []
            newState.push({ name: 'Người lớn', songuoi: adultCount })
            if (childCount > 0)
              newState.push({ name: 'Trẻ em', songuoi: childCount })
            if (infantCount > 0)
              newState.push({ name: 'Trẻ sơ sinh', songuoi: infantCount })
            return newState
          })

          setdate(departureDate)

          if (returnDate) {
            navigate('/searchkhuhoi')
          } else {
            navigate('/search')
          }
        }
      } else {
        const response = await fetch(
          `https://wooordersystem.store/order-woo/api/getInfoFlightInternational`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
          }
        )
        const data = await response.json()

        if (response.ok) {
          setSearchData(data)
          setmangnguoi(() => {
            const newState = []
            newState.push({ name: 'Người lớn', songuoi: adultCount })
            if (childCount > 0)
              newState.push({ name: 'Trẻ em', songuoi: childCount })
            if (infantCount > 0)
              newState.push({ name: 'Trẻ sơ sinh', songuoi: infantCount })
            return newState
          })
          if (returnDate) {
            navigate('/searchkhuhoiquocte')
          } else {
            navigate('/searchquocte')
          }
        }
      }
    } catch (error) {
      console.error('Error fetching flight data:', error)
    }
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
            onSelect={handleCityFrom}
            data={data}
            setdata={setdata}
          />
        )}

        <div className='rowmb'>
          <div className='col1'>
            <label className='lbl lblarr'>Đi đến</label>
          </div>
          <div className='col2'>
            <div
              className='txt divArrivalAirport'
              onClick={() => setCityTableVisible2(true)}
            >
              {arrivalCity}
            </div>
          </div>
        </div>
        {isCityTableVisible2 && (
          <TableChonThanhPho
            onClose={() => setCityTableVisible2(false)}
            onSelect={handleCityTo}
            data={data}
            setdata={setdata}
          />
        )}

        <div className='rowmb'>
          <div className='col1'>
            <label className='lbl lbldate'>Ngày đi</label>
          </div>
          <div className='col2'>
            <input
              type='date'
              min={today}
              className='txt divDepartureDate'
              value={departureDate}
              onChange={e => setDepartureDate(e.target.value)}
            />
          </div>
        </div>
        <div className='rowmb'>
          <div className='col1'>
            <label className='lbl lbldate'>Ngày về</label>
          </div>
          <div className='col2'>
            <input
              type='date'
              className='txt divReturnDate gray'
              min={departureDate || today}
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
            />
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
          <div className='btn-search btnSearch2' onClick={handelSearch}>
            TÌM CHUYẾN BAY
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchMB
