/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
import './SearchQTMB.scss'
import { useToast } from '../../../components/useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import {
  formatDate,
  getSurroundingDates,
  CalendarFormatMB
} from '../../../components/LunarCalendarFormat/LunarCalendarFormat'
import {
  handleFiltersChangeQT,
  applyFiltersQT
} from '../../../components/FilterChuyenBay/FilterChuyenBay'
import { calculateDuration } from '../../../Layout/SearchLayout/SearchLayoutFunction'
import FilterMB from '../../componentsMB/FilterMobile/FilterMB'
function SearchQTMB () {
  const {
    cityfrom,
    cityto,
    searchData,
    mafrom,
    mato,
    date,
    mangnguoi,
    setSearchData,
    setdate,
    setflightdata
  } = useToast()
  const { previousTwoDays, nextTwoDays } = getSurroundingDates(date)
  const [phantrams, setphantram] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [filters, setFilters] = useState({
    sortBy: 'abay-suggest',
    airlines: []
  })
  const navigate = useNavigate()

  const fetchphantram = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getphantram')
      const data = await response.json()
      if (response.ok) {
        setphantram(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchphantram()
  }, [])

  const handleSearch = async date => {
    try {
      const requestData = {
        departure: mafrom,
        arrival: mato,
        date: formatDate(date),
        adults: mangnguoi[0]?.songuoi,
        children: mangnguoi[1]?.songuoi || 0,
        infants: mangnguoi[2]?.songuoi || 0
      }

      const response = await fetch(
        'https://wooordersystem.store/order-woo/api/getInfoFlightInternational',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        }
      )
      const data = await response.json()

      if (response.ok) {
        setSearchData(data)
        setdate(date)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const flights1 = applyFiltersQT(searchData.data, filters)
  const totalPeople = mangnguoi.reduce((total, item) => total + item.songuoi, 0)

  const totalPrice = mangnguoi.reduce((total, item) => {
    if (
      !selectedFlight ||
      !selectedFlight.totalPrice ||
      !phantrams ||
      phantrams.length === 0
    ) {
      return total
    }
    const totalPricePerTicket =
      parseInt(selectedFlight.totalPrice.replace(/,/g, ''), 10) -
      (parseInt(selectedFlight.totalPrice.replace(/,/g, ''), 10) *
        phantrams[0].phantram) /
        100
    const taxAndFee = (totalPricePerTicket * 30) / 100
    return total + totalPricePerTicket * item.songuoi + taxAndFee * item.songuoi
  }, 0)

  return (
    <div className='search-layout'>
      <div className='content-wrapper'>
        <div className='main-content'>
          <div className='flight-bookingmb'>
            <div className='booking-headermb'>
              <div className='route-info'>
                <span className='city'>{cityfrom}</span>&nbsp;
                <img src='/plane1.png' alt='plane' style={{ width: '15px' }} />
                &nbsp;
                <span className='city'>{cityto}</span>
                <br />
              </div>
            </div>

            <div className='date-selectionmb'>
              {previousTwoDays.map((day, index) => {
                const isPastDate =
                  new Date(day) < new Date().setHours(0, 0, 0, 0)

                return (
                  <div
                    key={index}
                    className={`datemb ${isPastDate ? 'disabled' : ''}`}
                    onClick={!isPastDate ? () => handleSearch(day) : undefined}
                  >
                    {CalendarFormatMB(day)}
                    <br />
                  </div>
                )
              })}
              <div className={`datemb ${date ? 'active' : ''}`}>
                {CalendarFormatMB(date)}
                <br />
              </div>
              {nextTwoDays.map((day, index) => (
                <div
                  key={index}
                  className={`datemb`}
                  onClick={() => handleSearch(day)}
                >
                  {CalendarFormatMB(day)}
                  <br />
                </div>
              ))}
            </div>
            <FilterMB
              filters={filters}
              onFiltersChange={handleFiltersChangeQT}
              setFilters={setFilters}
            />
            <div class='captions-container'>
              {' '}
              <label>Ghi chú:</label>
              <div class='caption-option'>
                <div class='option-container'>
                  <div class='stop-points-container'>
                    <div class='stop-points-line stop-points-0'>
                      <div class='straight-line'></div>
                    </div>
                  </div>
                </div>
                <label>Bay thẳng</label>
              </div>
              <div class='caption-option'>
                <div class='option-container'>
                  <div class='stop-points-container'>
                    <div class='stop-points-line stop-points-1'>
                      <div class='straight-line'></div>
                      <span class='circle'>1</span>
                    </div>
                  </div>
                </div>
                <label>điểm dừng</label>
              </div>
              <div class='caption-option stop-points-2'>
                <div class='option-container'>
                  <div class='stop-points-container'>
                    <div class='stop-points-line stop-points-2'>
                      <div class='straight-line'></div>
                      <span class='circle'>2</span>
                    </div>
                  </div>
                </div>
                <label>điểm dừng</label>
              </div>
            </div>

            <div className='flight-options-quocte'>
              {Array.isArray(searchData.data) &&
                flights1.map((flight, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setflightdata(flight)
                      navigate('/datvequocte')
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className='flight-row-quocte'>
                      <div className='flight-left1'>
                        <div
                          style={{
                            paddingLeft: '5px',
                            paddingRight: '5px',
                            display: 'flex'
                          }}
                        >
                          <div className='flight-info-quocte-timekhmb'>
                            <span className='flight-time-chang-quoctemb'>
                              {flight.outbound.departureTime} <br /> {mafrom}
                            </span>
                          </div>
                          <div class='stop-points-container'>
                            <div class='stop-points-line stop-points-0'>
                              <div class='straight-line'></div>
                            </div>
                          </div>
                          <div className='flight-info-quocte-timekhmb'>
                            <span className='flight-time-chang-quoctemb'>
                              {flight.outbound.arrivalTime} <br /> {mato}
                            </span>
                          </div>
                        </div>
                        <div className='flight-info-quocte'>
                          <div className='flight-time-quocte'>
                            {calculateDuration(
                              flight.outbound.departureTime,
                              flight.outbound.arrivalTime
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='flight-price-quocte'>
                        {phantrams.length > 0
                          ? (
                              flight.totalPrice -
                              (flight.totalPrice * phantrams[0].phantram) / 100
                            ).toLocaleString()
                          : 'Đang tải...'}
                      </div>
                      <button className='select-button'>Chọn</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div style={{ padding: '10px' }}>Giá vé chưa gồm thuế và phí</div>
        </div>
      </div>
    </div>
  )
}

export default SearchQTMB
