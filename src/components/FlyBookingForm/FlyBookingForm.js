import React, { useState, useRef, useEffect } from 'react'
import './FlyBookingForm.scss'
import { useToast } from '../useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import TableThanhPho from './TableThanhPho'
import { formatDate } from '../LunarCalendarFormat/LunarCalendarFormat'

function FlightBookingForm () {
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const { showToast } = useToast()

  const {
    setSearchData,
    setcityto,
    setcityfrom,
    setmafrom,
    setmato,
    setdate,
    setreturnDate,
    setmangnguoi
  } = useToast()
  const today = new Date().toISOString().split('T')[0]

  const [departure, setDeparture] = useState('Chọn điểm đi')
  const [madepature, setmadepature] = useState('')
  const [arrival, setArrival] = useState('Chọn điểm đến')
  const [maarrival, setmaarrival] = useState('')

  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [departureDate, setDepartureDate] = useState(today)
  const [returnDate, setReturnDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [data, setdata] = useState([])

 const validate = () => {
  let valid = true

  if (!madepature) {
    valid = false
    showToast('Bạn chưa chọn điểm đi', 'warning')
  }

  if (!maarrival) {
    valid = false
    showToast('Bạn chưa chọn điểm đến', 'warning')
  }

  if (adults === 0) {
    valid = false
    showToast('Số lượng khách người lớn phải lớn hơn 1', 'warning')
  }

  if (adults < infants) {
    valid = false
    showToast(
      'Số lượng khách người lớn phải lớn hơn hoặc bằng khách em bé',
      'warning'
    )
  }

  return valid
}


  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
      const isDepartureInVietnam = isInVietnam(madepature, data)
      const isArrivalInVietnam = isInVietnam(maarrival, data)

      const requestData = {
        departure: madepature,
        arrival: maarrival,
        date: formatDate(departureDate),
        adults,
        children,
        infants
      }

      if (returnDate) {
        requestData.returnDate = formatDate(returnDate)
        setreturnDate(returnDate)
      }

      if (isDepartureInVietnam && isArrivalInVietnam) {
        // Gọi API nội địa
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
            newState.push({ name: 'Người lớn', songuoi: adults })
            if (children > 0)
              newState.push({ name: 'Trẻ em', songuoi: children })
            if (infants > 0)
              newState.push({ name: 'Trẻ sơ sinh', songuoi: infants })
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
            newState.push({ name: 'Người lớn', songuoi: adults })
            if (children > 0)
              newState.push({ name: 'Trẻ em', songuoi: children })
            if (infants > 0)
              newState.push({ name: 'Trẻ sơ sinh', songuoi: infants })
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
    <div className='booking-container'>
      <div className='flight-form'>
        <h2>
          <img src='/Plane.png' alt='Plane' className='plane-icon' />
          VÉ MÁY BAY GIÁ RẺ
        </h2>
        <div className='line7'></div>
        <div className='form-row' ref={dropdownRef}>
          <div className='form-group'>
            <label className='diemdi' title='Chọn điểm đi'>
              Điểm đi
            </label>
            <input
              type='text'
              value={departure}
              onClick={() => setDropdownOpen('departure')}
              onChange={e => setDeparture(e.target.value)}
              readOnly
            />
            {dropdownOpen === 'departure' && (
              <TableThanhPho
                title='Chọn điểm đi'
                onSelect={(value, ma) => {
                  setDeparture(value)
                  setcityfrom(value)
                  setmadepature(ma)
                  setmafrom(ma)
                  setDropdownOpen(null)
                }}
                data={data}
                setdata={setdata}
              />
            )}
          </div>
          <div>⇌</div>
          <div className='form-group'>
            <label className='diemden' title='Chọn điểm đến'>
              Điểm đến
            </label>
            <input
              type='text'
              value={arrival}
              onClick={() => setDropdownOpen('arrival')}
              onChange={e => setArrival(e.target.value)}
              readOnly
            />
            {dropdownOpen === 'arrival' && (
              <TableThanhPho
                title='Chọn điểm đến'
                onSelect={(value, ma) => {
                  setArrival(value)
                  setcityto(value)
                  setmaarrival(ma)
                  setmato(ma)
                  setDropdownOpen(null)
                }}
                data={data}
                setdata={setdata}
              />
            )}
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label className='ngaydi'>Ngày đi</label>
            <input
              type='date'
              min={today}
              value={departureDate}
              onChange={e => {
                setDepartureDate(e.target.value)
              }}
            />
          </div>
          <div className='form-group'>
            <label className='ngaydi'>Ngày về</label>
            <input
              type='date'
              min={departureDate || today}
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
            />
          </div>
        </div>
        <div className='form-row-people'>
          <div className='form-group'>
            <label className='form-label'>Người lớn</label>
            <select
              value={adults}
              onChange={e => setAdults(Number(e.target.value))}
            >
              {[...Array(10).keys()].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <label className='form-description'>(Từ 12 tuổi trở lên)</label>
          </div>
          <div className='form-group'>
            <label className='form-label'>Trẻ em</label>
            <select
              value={children}
              onChange={e => setChildren(Number(e.target.value))}
            >
              {[...Array(10).keys()].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <label className='form-description'>(Từ 2 đến dưới 12 tuổi)</label>
          </div>
          <div className='form-group'>
            <label className='form-label'>Em bé</label>
            <select
              value={infants}
              onChange={e => setInfants(Number(e.target.value))}
            >
              {[...Array(10).keys()].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <label className='form-description'>(Dưới 2 tuổi)</label>
          </div>
        </div>

        <div className='line7'></div>
        <div className='form-footer'>
          <a href='https://youtube.com' className='help-link'>
            <img src='/tube.png' alt='play' /> Xem video hướng dẫn
          </a>
          <div className='search' onClick={handelSearch}>
            <img src='/SearcFlyBtn.png' alt='Plane' className='plane-icon' />
            <p>Tìm chuyến bay</p>
          </div>
        </div>
      </div>

      <div className='promo-banner'>
        <img src='/187.gif' alt='Đặt vé trên mobile' className='promo-image' />
        <div className='promo-content'>
          <h3>Vé máy bay giá rẻ khách đặt mới nhất</h3>
          <ul className='flight-prices'>
            <li>
              Hà Nội - Đà Nẵng: <b>539,000₫</b> <span>Bamboo Airways</span>
            </li>
            <li>
              Hà Nội - Hải Phòng: <b>489,000₫</b> <span>Vietnam Airlines</span>
            </li>
            <li>
              Tp Hồ Chí Minh - Nha Trang: <b>190,000₫</b>{' '}
              <span>VietjetAir</span>
            </li>
            <li>
              Hà Nội - Tp Hồ Chí Minh: <b>25,000₫</b>{' '}
              <span>Vietravel Airlines</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FlightBookingForm
