import React, { useRef, useState, useEffect } from 'react'
import './SearchSideBar.scss'
import { useToast } from '../useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import TableTP from './TableTP'

function SearchSidebar () {
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const {
    showToast,
    setSearchData,
    setcityto,
    setcityfrom,
    setmangnguoi,
    setdate
  } = useToast()
  const [departure, setDeparture] = useState('Chọn điểm đi')
  const [madepature, setmadepature] = useState('')
  const [arrival, setArrival] = useState('Chọn điểm đến')
  const [maarrival, setmaarrival] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(null)

  const formatDate = isoDate => {
    const [year, month, day] = isoDate.split('-')
    return `${day}/${month}/${year}`
  }
  const validate = () => {
    let valid = true
    if (madepature) {
      valid = true
    } else {
      valid = false
      showToast('Bạn chưa chọn điểm đi', 'warning')
    }

    if (maarrival) {
      valid = true
    } else {
      valid = false
      showToast('Bạn chưa chọn điểm đến', 'warning')
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

  const handelSearch = async () => {
    if (!validate()) return
    try {
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
      }

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
        setdate(departureDate)
        setmangnguoi(() => {
          const newState = []

          newState.push({
            name: 'Người lớn',
            songuoi: adults
          })

          if (children > 0) {
            newState.push({ name: 'Trẻ em', songuoi: children })
          }

          if (infants > 0) {
            newState.push({ name: 'Trẻ sơ sinh', songuoi: infants })
          }

          return newState
        })

        navigate('/search')
        window.location.reload()
      }
    } catch (error) {
      console.error('Error fetching flight data:', error)
    }
  }

  return (
    <div className='SearchSidebar' ref={dropdownRef}>
      <table
        width='100%'
        cellPadding='0'
        cellSpacing='0'
        id='Table1'
        className='sub-search-form'
      >
        <tbody>
          <tr>
            <td className='sub-form-search'>
              <div className='borderSortlastItem'>
                <table width='100%'>
                  <tbody>
                    <tr className='from'>
                      <td colSpan='6'>
                        <label htmlFor='departure'>Điểm đi</label>
                        <br />
                        <input
                          name='departure'
                          type='text'
                          defaultValue='Tp Hồ Chí Minh'
                          id='departure'
                          className='departure startplace text-input ac_input focus-input'
                          data-type='departure'
                          value={departure}
                          onClick={() => setDropdownOpen('departure')}
                          onChange={e => setDeparture(e.target.value)}
                          readOnly
                        />
                        {dropdownOpen === 'departure' && (
                          <TableTP
                            title='Chọn điểm đi'
                            onSelect={(value, ma) => {
                              setDeparture(value)
                              setcityfrom(value)
                              setmadepature(ma)
                              setDropdownOpen(null)
                            }}
                          />
                        )}
                      </td>
                    </tr>

                    <td>
                      <span className='reverse-command'>⥮</span>
                    </td>
                    <tr className='to'>
                      <td colSpan='6'>
                        <label htmlFor='arrival'>Điểm đến</label>
                        <br />
                        <input
                          name='arrival'
                          type='text'
                          defaultValue='Hà Nội'
                          id='arrival'
                          className='arrival endplace text-input ac_input focus-input'
                          data-type='arrival'
                          value={arrival}
                          onClick={() => setDropdownOpen('arrival')}
                          onChange={e => setArrival(e.target.value)}
                          readOnly
                        />
                        {dropdownOpen === 'arrival' && (
                          <TableTP
                            title='Chọn điểm đến'
                            onSelect={(value, ma) => {
                              setArrival(value)
                              setcityto(value)
                              setmaarrival(ma)
                              setDropdownOpen(null)
                            }}
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className='departure' colSpan='3'>
                        <label htmlFor='departureDate'>Ngày đi</label>
                        <br />
                        <input
                          name='departureDate'
                          type='date'
                          defaultValue='06/01/2025'
                          id='departureDate'
                          className='date-input txtDateLunar txtDateLunar-departure depDate focus-input'
                          data-type='departure'
                          value={departureDate}
                          onChange={e => {
                            setDepartureDate(e.target.value)
                            setdate(e.target.value)
                          }}
                        />
                      </td>
                      <td className='return' colSpan='3'>
                        <label htmlFor='returnDate'>Ngày về</label>
                        <br />
                        <input
                          name='returnDate'
                          type='date'
                          id='returnDate'
                          className='date-input txtDateLunar txtDateLunar-return retDate focus-input'
                          data-type='return'
                          value={returnDate}
                          onChange={e => setReturnDate(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='13' style={{ paddingTop: '5px' }}>
                        <a
                          href='/_WEB/PageSub/OtherPage/Xem-lich-am.aspx'
                          className='lightview'
                          rel='nofollow'
                          style={{ fontSize: '12px', color: 'orangered' }}
                        >
                          * Xem lịch âm
                        </a>
                        <span className='remove-date'>Bỏ chọn ngày về</span>
                      </td>
                    </tr>
                    <tr className='passenger'>
                      <td colSpan='2'>
                        <label htmlFor='adults'>Người lớn</label>
                        <br />
                        <select
                          name='adults'
                          id='adults'
                          className='focus-input'
                          onChange={e => setAdults(e.target.value)}
                          value={adults}
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td colSpan='2'>
                        <label htmlFor='children'>Trẻ em</label>
                        <br />
                        <select
                          name='children'
                          id='children'
                          value={children}
                          onChange={e => setChildren(Number(e.target.value))}
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td colSpan='2'>
                        <label htmlFor='infants'>Trẻ sơ sinh</label>
                        <br />
                        <select
                          name='infants'
                          id='infants'
                          value={infants}
                          onChange={e => setInfants(Number(e.target.value))}
                        >
                          {[...Array(7)].map((_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='6'></td>
                    </tr>
                    <tr>
                      <td colSpan='6'></td>
                    </tr>
                    <tr align='center'>
                      <td colSpan='7' align='center' class='input-submit'>
                        <input
                          name='ctl00$cphSubColumn$ctl01$btnSearchFlight'
                          value='Tìm Chuyến Bay'
                          id='cphSubColumn_ctl01_btnSearchFlight'
                          class='button-text radius-5px btnSearchReCaptcha'
                          onClick={handelSearch}
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SearchSidebar
