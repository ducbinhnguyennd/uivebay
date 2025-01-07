
import { useState, useEffect } from 'react'
import './SearchNoiDiaMB.scss'
import { useToast } from '../../../components/useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import {
  LunarCalendarFormat,
  formatDate,
  getSurroundingDates,
  CalendarFormat
} from '../../../components/LunarCalendarFormat/LunarCalendarFormat'
import {
  applyFilters,
  handleFiltersChange
} from '../../../components/FilterChuyenBay/FilterChuyenBay'
import {
  toggleDetails,
  getAirlineImage,
  getAirlineName,
  HandelTonggia,
  calculateDuration
} from '../../../Layout/SearchLayout/SearchLayoutFunction'
import FilterMB from '../../componentsMB/FilterMobile/FilterMB'
function SearchNoiDiaMB () {
  const {
    cityfrom,
    cityto,
    searchData,
    mafrom,
    mato,
    date,
    mangnguoi,
    setflightdata,
    setSearchData,
    setdate
  } = useToast()
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null)
  const [hangmaybay, sethangmaybay] = useState([])
  const [phantrams, setphantram] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [filters, setFilters] = useState({
    sortBy: 'abay-suggest',
    airlines: []
  })
  const { previousTwoDays, nextTwoDays } = getSurroundingDates(date)
  console.log(previousTwoDays)
  console.log(nextTwoDays)

  const navigate = useNavigate()

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

  useEffect(() => {
    fetchhang()
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
        'https://wooordersystem.store/order-woo/api/getInfoFlights',
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
       
          <div className='flight-bookingmb'>
            <div className='booking-header'>
              <div className='route-info'>
                <span className='city'>{cityfrom}</span>&nbsp;
                <img src='/plane1.png' alt='plane' style={{ width: '15px' }} />
                &nbsp;
                <span className='city'>{cityto}</span>
                <br />
                <div className='datemb-info'>
                  <span className='selected-datemb'>
                    {LunarCalendarFormat(date)}
                  </span>
                </div>
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
                    {CalendarFormat(day)}
                    <br />
                  </div>
                )
              })}
              <div className={`datemb ${date ? 'active' : ''}`}>
                {CalendarFormat(date)}
                <br />
              </div>
              {nextTwoDays.map((day, index) => (
                <div
                  key={index}
                  className={`datemb`}
                  onClick={() => handleSearch(day)}
                >
                  {CalendarFormat(day)}
                  <br />
                </div>
              ))}
            </div>
            <FilterMB
            filters={filters}
            onFiltersChange={handleFiltersChange}
            setFilters={setFilters}
          />
            <div className='flight-options'>
              {Array.isArray(searchData.outBound.data.flights) &&
                flights1.map((flight, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setflightdata(flight)
                      navigate('/datve')
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className='flight-row'>
                      <div className='flight-info'>
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
                      
                      <div className='flight-info'>
                        <span className='flight-time'>
                          {flight.departureTime} - {flight.arrivalTime}
                        </span>
                      </div>
                      <div className='flight-price'>
                        {phantrams.length > 0
                          ? (
                              parseInt(flight.price.replace(/,/g, ''), 10) -
                              (parseInt(flight.price.replace(/,/g, ''), 10) *
                                phantrams[0].phantram) /
                                100
                            ).toLocaleString()
                          : 'Đang tải...'}
                      </div>
                     

                      <button
                        className='select-flightmb'
                        style={{
                          backgroundColor:
                           '#e67e00'
                        }}
                      >
                        {flight.chooseText === 'Hạng Thương Gia'
                              ? 'Hạng Thương Gia'
                              : 'Chọn'}
                      </button>
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

export default SearchNoiDiaMB
