/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
// import './SearchQTMB.scss'
import { useToast } from '../../../components/useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import FilterComponent from '../../../components/SideBar/Filter'
import SearchSidebar from '../../../components/SideBar/SearchSideBar'
import {
  LunarCalendarFormat,
  formatDate
} from '../../../components/LunarCalendarFormat/LunarCalendarFormat'
import {
  applyFilters,
  handleFiltersChange
} from '../../../components/FilterChuyenBay/FilterChuyenBay'
import {
  toggleDetails,
  getAirlineImage,
  getAirlineName,
  handleDateClick,
  HandelTonggia,
  calculateDuration
} from "../../../Layout/SearchLayout/SearchLayoutFunction";
function SearchQTMB () {
  const {
    cityfrom,
    cityto,
    searchData,
    mafrom,
    mato,
    date,
    returnDate,
    mangnguoi
  } = useToast()
  const [activeDate, setActiveDate] = useState('Thứ Bảy')
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null)
  const [hangmaybay, sethangmaybay] = useState([])
  const [phantrams, setphantram] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [filters, setFilters] = useState({
    sortBy: 'abay-suggest',
    airlines: []
  })
  const navigate = useNavigate()
  console.log(searchData)

  const fetchhang = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/gethangmaybay')
      const data = await response.json()
      if (response.ok) {
        sethangmaybay(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

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
  console.log(returnDate)
  useEffect(() => {
    fetchhang()
    fetchphantram()
  }, [])

  const dates = [
    { day: 'Thứ Hai', date: '06/01', price: '868,000đ' },
    { day: 'Thứ Ba', date: '06/01', price: '868,000đ' },
    { day: 'Thứ Tư', date: '01/01', price: '' },
    { day: 'Thứ Năm', date: '02/01', price: '' },
    { day: 'Thứ Sáu', date: '03/01', price: '1,010,000đ' },
    { day: 'Thứ Bảy', date: '04/01', price: '868,000đ' },
    { day: 'Chủ Nhật', date: '05/01', price: '1,008,000đ' }
  ]

  const flights1 = applyFilters(searchData.outBound.data.flights, filters)
  const totalPeople = mangnguoi.reduce((total, item) => total + item.songuoi, 0)

  const totalPrice = mangnguoi.reduce((total, item) => {
    if (
      !selectedFlight ||
      !selectedFlight.price ||
      !phantrams ||
      phantrams.length === 0
    ) {
      return total
    }
    const pricePerTicket =
      parseInt(selectedFlight.price.replace(/,/g, ''), 10) -
      (parseInt(selectedFlight.price.replace(/,/g, ''), 10) *
        phantrams[0].phantram) /
        100
    const taxAndFee = (pricePerTicket * 30) / 100
    return total + pricePerTicket * item.songuoi + taxAndFee * item.songuoi
  }, 0)

  return (
    <div className='search-layout'>
      <div className='content-wrapper'>
        <div className='main-content'>
          <div className='flight-booking'>
            <div className='booking-header'>
              <div className='route-info'>
                <span className='city'>{cityfrom}</span>&nbsp;
                <img src='/plane1.png' alt='plane' style={{ width: '15px' }} />
                &nbsp;
                <span className='city'>{cityto}</span>
                <br />
                <div className='date-info'>
                  <span className='selected-date'>
                    {LunarCalendarFormat(date)}
                  </span>
                </div>
              </div>
              <div className='price-info'>
                Giá vé chưa gồm thuế và phí
                <br />
                <span className='note'>
                  <img
                    src='./hanhly.png'
                    alt='baggage'
                    style={{ width: '18px' }}
                  />
                  <img
                    src='./suatan.jpg'
                    alt='meal'
                    style={{ width: '18px' }}
                  />
                  giá vé đã bao gồm hành lý và suất ăn
                </span>
              </div>
            </div>

            <div className='date-selection'>
              {dates.map(({ day, date, price }) => (
                <div
                  key={day}
                  className={`date ${activeDate === day ? 'active' : ''}`}
                  onClick={() => handleDateClick(day, setActiveDate)}
                >
                  {day}
                  <br />
                  {price || date}
                </div>
              ))}
            </div>

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
              {(activeDate === 'Thứ Bảy' || activeDate === 'Thứ Hai') &&
                Array.isArray(searchData.outBound.data.flights) &&
                flights1.map((flight, index) => (
                  <div
                    key={index}
                    onClick={() => navigate('/datve')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className='flight-row-quocte'>
                      <div className='flight-info-quocte-logo'>
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=''
                          />
                        </span>
                      </div>
                      <div className='flight-info-quocte'>
                        <span className='flight-code-quocte'>
                          {mafrom} - {mato}
                        </span>
                      </div>
                      <div className='flight-info-quocte'>
                        <span className='flight-time-chang-quocte'>
                          {flight.departureTime} - {flight.arrivalTime}
                        </span>
                      </div>
                      <div className='flight-info-quocte'>
                        <div
                          style={{
                            display: 'flex',
                            fontSize: '12px',
                            gap: '8px',
                            alignItems: 'center'
                          }}
                        >
                          Thời gian bay:
                          <div className='flight-time-quocte'>
                            {calculateDuration(
                              flight.departureTime,
                              flight.arrivalTime
                            )}
                          </div>
                        </div>
                      </div>

                      
                      <div className='flight-price-quocte'>
                        {phantrams.length > 0
                          ? (
                              parseInt(flight.price.replace(/,/g, ''), 10) -
                              (parseInt(flight.price.replace(/,/g, ''), 10) *
                                phantrams[0].phantram) /
                                100
                            ).toLocaleString()
                          : 'Đang tải...'}
                      </div>
                      <button className='select-button'>Chọn</button>
                    </div>
                    
                  </div>
                ))}
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default SearchQTMB
