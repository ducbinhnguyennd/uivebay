/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
import './SearchKhuHoi.scss'
import { useToast } from '../../../components/useToast/ToastContext'
// import { useNavigate } from 'react-router-dom'
import FilterComponent from '../../../components/SideBar/Filter'
import SearchSidebar from '../../../components/SideBar/SearchSideBar'
import {
  LunarCalendarFormat,
  formatDate,
  getSurroundingDateskhuhoinoidia,
  CalendarFormat,
  getSurroundingDateskhuhoinoidia1
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
} from '../SearchLayoutFunction'
import { useNavigate } from 'react-router-dom'
function SearchKhuHoi () {
  const {
    cityfrom,
    cityto,
    searchData,
    mafrom,
    mato,
    date,
    returnDate,
    mangnguoi,
    setSearchData,
    setdate,
    setreturnDate,
    setflightdata,
    setflightdata2
  } = useToast()
  const navigate = useNavigate()
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null)
  const [visibleDetailIndex2, setVisibleDetailIndex2] = useState(null)

  const [hangmaybay, sethangmaybay] = useState([])
  const [phantrams, setphantram] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedFlight1, setSelectedFlight1] = useState(null)
  const { previousTwoDays, nextTwoDays } = getSurroundingDateskhuhoinoidia(date)
  const { previousTwoDays1, nextTwoDays1 } =
    getSurroundingDateskhuhoinoidia1(returnDate)

  const [filters, setFilters] = useState({
    sortBy: 'abay-suggest',
    airlines: []
  })

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
      console.log(data)
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

  const flights1 = applyFilters(searchData.outBound.data.flights, filters)
  const flights2 = applyFilters(searchData.inBound.data.flights, filters)

  const handleSearch = async date => {
    try {
      const requestData = {
        departure: mafrom,
        arrival: mato,
        date: formatDate(date),
        adults: mangnguoi[0]?.songuoi,
        children: mangnguoi[1]?.songuoi || 0,
        infants: mangnguoi[2]?.songuoi || 0,
        returnDate: formatDate(returnDate)
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

  const handleSearch1 = async returnDate => {
    try {
      const requestData = {
        departure: mafrom,
        arrival: mato,
        date: formatDate(date),
        adults: mangnguoi[0]?.songuoi,
        children: mangnguoi[1]?.songuoi || 0,
        infants: mangnguoi[2]?.songuoi || 0,
        returnDate: formatDate(returnDate)
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
        setreturnDate(returnDate)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectFlight1 = flight => {
    setSelectedFlight(flight)
    setflightdata(flight)
    if (selectedFlight1) {
      navigate('/datvekhuhoi')
    }
  }

  const handleSelectFlight2 = flight => {
    setSelectedFlight1(flight)
    setflightdata2(flight)
    if (selectedFlight) {
      navigate('/datvekhuhoi')
    }
  }

  return (
    <div className='search-layout'>
      <div className='content-wrapper'>
        <div className='main-content'>
          <div className='price-info'>
            Giá vé chưa gồm thuế và phí
            <br />
            Ghi chú:
            <span className='note'>
              <img src='./hanhly.png' alt='baggage' style={{ width: '18px' }} />
              <img src='./suatan.jpg' alt='meal' style={{ width: '18px' }} />
              giá vé đã bao gồm hành lý và suất ăn
            </span>
          </div>
          <div className='flight-list'>
            <div className='flight-go'>
              <div className='section-header orange'>
                <h3>
                  {cityfrom} <img src='./air-plane.png' alt='arrow' /> {cityto}
                </h3>
                <p>{LunarCalendarFormat(date)}</p>
              </div>

              <div className='tabs'>
                {previousTwoDays.map((day, index) => {
                  const isPastDate =
                    new Date(day) < new Date().setHours(0, 0, 0, 0)

                  return (
                    <div
                      key={index}
                      className={`date ${isPastDate ? 'disabled' : ''}`}
                      onClick={
                        !isPastDate ? () => handleSearch(day) : undefined
                      }
                    >
                      {CalendarFormat(day)}
                      <br />
                    </div>
                  )
                })}
                <div className={`date ${date ? 'active' : ''}`}>
                  {CalendarFormat(date)}
                  <br />
                </div>
                {nextTwoDays.map((day, index) => (
                  <div
                    key={index}
                    className={`date`}
                    onClick={() => handleSearch(day)}
                  >
                    {CalendarFormat(day)}
                    <br />
                  </div>
                ))}
              </div>

              <div className='flight-table'>
                {Array.isArray(searchData.outBound.data.flights) &&
                  flights1.map((flight, index) => (
                    <div
                      key={index}
                      className={`divflightrow ${
                        selectedFlight === flight ? 'addflightrow' : ''
                      }`}
                      onClick={() => handleSelectFlight1(flight)}
                    >
                      <div className='flight-row-khuhoi'>
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=''
                            style={{
                              width: '55px'
                            }}
                          />
                        </span>
                        <span className='flight-name'>
                          {flight.flightNumber}
                        </span>
                        <span className='flight-time'>
                          {flight?.departureTime}
                        </span>
                        <span className='flight-price'>
                          {phantrams.length > 0
                            ? (
                                parseInt(flight.price.replace(/,/g, ''), 10) -
                                (parseInt(flight.price.replace(/,/g, ''), 10) *
                                  phantrams[0].phantram) /
                                  100
                              ).toLocaleString()
                            : 'Đang tải...'}
                        </span>
                        <img
                          src='./collaspe.png'
                          onClick={e => {
                            e.stopPropagation()
                            toggleDetails(
                              index,
                              flight,
                              setVisibleDetailIndex,
                              setSelectedFlight,
                              visibleDetailIndex,
                              setflightdata
                            )
                          }}
                        />
                        <button className='select-button'>Chọn</button>
                      </div>
                      {visibleDetailIndex === index && (
                        <div
                          className='flight-detail-content'
                          onClick={e => e.stopPropagation()}
                        >
                          <div>
                            <table width='100%' cellSpacing='0' cellPadding='0'>
                              <tbody className='view-detail-flight'>
                                <tr>
                                  <td
                                    valign='top'
                                    style={{
                                      width: '25%',
                                      textAlign: 'center'
                                    }}
                                  >
                                    <p>
                                      <b style={{ fontSize: '14px' }}>
                                        {`${cityfrom}`}
                                      </b>
                                    </p>
                                    <p>
                                      <b>{selectedFlight?.departureTime}</b>,
                                      {formatDate(date)}
                                    </p>
                                    <p>{`${mafrom}`}</p>
                                  </td>
                                  <td
                                    className='duration-info-container'
                                    style={{
                                      textAlign: 'center',
                                      fontSize: '12px',
                                      width: '20%'
                                    }}
                                  >
                                    <p style={{ paddingRight: '5px' }}>
                                      {calculateDuration(
                                        selectedFlight?.departureTime,
                                        selectedFlight?.arrivalTime
                                      )}
                                    </p>
                                    <p>
                                      <img
                                        src='/01-point.png'
                                        alt='Flight Path'
                                      />
                                    </p>
                                    <p
                                      style={{
                                        paddingRight: '5px',
                                        marginTop: '-10px'
                                      }}
                                    >
                                      <p style={{ fontSize: '13px' }}>
                                        Máy bay: Airbus
                                      </p>
                                    </p>
                                  </td>
                                  <td
                                    valign='top'
                                    style={{
                                      width: '25%',
                                      textAlign: 'center'
                                    }}
                                  >
                                    <p>
                                      <b style={{ fontSize: '13px' }}>
                                        {`${cityto}`}
                                      </b>
                                    </p>
                                    <p>
                                      <b>{selectedFlight?.arrivalTime}</b>,
                                      {formatDate(date)}
                                    </p>
                                    <p>{`${mato}`}</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <td style={{ width: '30%' }}>
                              <table
                                width='100%'
                                cellPadding='0'
                                cellSpacing='0'
                              >
                                <tbody>
                                  <tr>
                                    <td style={{ textAlign: 'left' }}>
                                      <img
                                        align='absmiddle'
                                        src={getAirlineImage(
                                          selectedFlight.airlineCode,
                                          hangmaybay
                                        )}
                                        alt='Airline Logo'
                                      />
                                    </td>
                                    <td
                                      style={{
                                        lineHeight: '18px',
                                        padding: 0
                                      }}
                                    >
                                      {getAirlineName(
                                        selectedFlight.airlineCode,
                                        hangmaybay
                                      )}{' '}
                                      <br />
                                      Chuyến bay:
                                      {selectedFlight.flightNumber}
                                      <br />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <table width='100%' className='price-break'>
                              <tbody>
                                <tr className='title-b'>
                                  <td align='center' className='header'>
                                    Loại
                                  </td>
                                  <td align='center' className='header'>
                                    S.L
                                  </td>
                                  <td align='center' className='header'>
                                    Giá/vé
                                  </td>
                                  <td align='center' className='header'>
                                    Thuế,Phí
                                  </td>
                                  <td align='center' className='header'>
                                    T.Giá
                                  </td>
                                </tr>
                                {mangnguoi.map((item, index) => (
                                  <tr key={index}>
                                    <td align='center' className='pax'>
                                      {item.name}
                                    </td>
                                    <td align='center' className='pax'>
                                      {item.songuoi}
                                    </td>
                                    <td align='center' className='pax'>
                                      {(
                                        parseInt(
                                          selectedFlight.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          item.songuoi -
                                        ((parseInt(
                                          selectedFlight.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          phantrams[0].phantram) /
                                          100) *
                                          item.songuoi
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {(
                                        ((parseInt(
                                          selectedFlight.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          item.songuoi -
                                          ((parseInt(
                                            selectedFlight.price.replace(
                                              /,/g,
                                              ''
                                            ),
                                            10
                                          ) *
                                            phantrams[0].phantram) /
                                            100) *
                                            item.songuoi) *
                                          30) /
                                        100
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {HandelTonggia(
                                        parseInt(
                                          selectedFlight.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          item.songuoi -
                                          ((parseInt(
                                            selectedFlight.price.replace(
                                              /,/g,
                                              ''
                                            ),
                                            10
                                          ) *
                                            phantrams[0].phantram) /
                                            100) *
                                            item.songuoi,
                                        item
                                      ).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className='flight-back'>
              <div className='section-header blue'>
                <h3>
                  {cityto} <img src='./air-plane.png' alt='arrow' /> {cityfrom}
                </h3>
                <p>{LunarCalendarFormat(returnDate)}</p>
              </div>

              <div className='tabs'>
                {previousTwoDays1.map((day, index) => {
                  const isPastDate =
                    new Date(day) < new Date().setHours(0, 0, 0, 0)

                  return (
                    <div
                      key={index}
                      className={`date ${isPastDate ? 'disabled' : ''}`}
                      onClick={
                        !isPastDate ? () => handleSearch1(day) : undefined
                      }
                    >
                      {CalendarFormat(day)}
                      <br />
                    </div>
                  )
                })}
                <div className={`date ${returnDate ? 'active' : ''}`}>
                  {CalendarFormat(returnDate)}
                  <br />
                </div>
                {nextTwoDays1.map((day, index) => (
                  <div
                    key={index}
                    className={`date`}
                    onClick={() => handleSearch1(day)}
                  >
                    {CalendarFormat(day)}
                    <br />
                  </div>
                ))}
              </div>

              <div className='flight-table'>
                {Array.isArray(searchData.inBound.data.flights) &&
                  flights2.map((flight, index) => (
                    <div
                      key={index}
                      className={`divflightrow ${
                        selectedFlight1 === flight ? 'addflightrow' : ''
                      }`}
                      onClick={() => handleSelectFlight2(flight)}
                    >
                      <div className='flight-row-khuhoi'>
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=''
                            style={{
                              width: '55px'
                            }}
                          />
                        </span>
                        <span className='flight-name'>
                          {flight.flightNumber}
                        </span>
                        <span className='flight-time'>
                          {flight?.departureTime}
                        </span>
                        <span className='flight-price'>
                          {phantrams.length > 0
                            ? (
                                parseInt(flight.price.replace(/,/g, ''), 10) -
                                (parseInt(flight.price.replace(/,/g, ''), 10) *
                                  phantrams[0].phantram) /
                                  100
                              ).toLocaleString()
                            : 'Đang tải...'}
                        </span>
                        <img
                          src='./collaspe.png'
                          onClick={e => {
                            e.stopPropagation()
                            toggleDetails(
                              index,
                              flight,
                              setVisibleDetailIndex2,
                              setSelectedFlight1,
                              visibleDetailIndex2,
                              setflightdata2
                            )
                          }}
                        ></img>
                        <button className='select-button1'>Chọn</button>
                      </div>
                      {visibleDetailIndex2 === index && (
                        <div
                          className='flight-detail-content'
                          onClick={e => e.stopPropagation()}
                        >
                          <div>
                            <table width='100%' cellSpacing='0' cellPadding='0'>
                              <tbody className='view-detail-flight'>
                                <tr>
                                  <td
                                    valign='top'
                                    style={{
                                      width: '25%',
                                      textAlign: 'center'
                                    }}
                                  >
                                    <p>
                                      <b style={{ fontSize: '14px' }}>
                                        {`${cityfrom}`}
                                      </b>
                                    </p>
                                    <p>
                                      <b>{selectedFlight1?.departureTime}</b>,
                                      {formatDate(date)}
                                    </p>
                                    <p>{`${mafrom}`}</p>
                                  </td>
                                  <td
                                    className='duration-info-container'
                                    style={{
                                      textAlign: 'center',
                                      fontSize: '12px',
                                      width: '20%'
                                    }}
                                  >
                                    <p style={{ paddingRight: '5px' }}>
                                      {calculateDuration(
                                        selectedFlight1?.departureTime,
                                        selectedFlight1?.arrivalTime
                                      )}
                                    </p>
                                    <p>
                                      <img
                                        src='/01-point.png'
                                        alt='Flight Path'
                                      />
                                    </p>
                                    <p
                                      style={{
                                        paddingRight: '5px',
                                        marginTop: '-10px'
                                      }}
                                    >
                                      <p style={{ fontSize: '13px' }}>
                                        Máy bay: Airbus
                                      </p>
                                    </p>
                                  </td>
                                  <td
                                    valign='top'
                                    style={{
                                      width: '25%',
                                      textAlign: 'center'
                                    }}
                                  >
                                    <p>
                                      <b style={{ fontSize: '14px' }}>
                                        {`${cityto}`}
                                      </b>
                                    </p>
                                    <p>
                                      <b>{selectedFlight1?.arrivalTime}</b>,
                                      {formatDate(date)}
                                    </p>
                                    <p>{`${mato}`}</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <td style={{ width: '30%' }}>
                              <table
                                width='100%'
                                cellPadding='0'
                                cellSpacing='0'
                              >
                                <tbody>
                                  <tr>
                                    <td style={{ textAlign: 'left' }}>
                                      <img
                                        align='absmiddle'
                                        src={getAirlineImage(
                                          selectedFlight1.airlineCode,
                                          hangmaybay
                                        )}
                                        alt='Airline Logo'
                                      />
                                    </td>
                                    <td
                                      style={{
                                        lineHeight: '18px',
                                        padding: 0
                                      }}
                                    >
                                      {getAirlineName(
                                        selectedFlight1.airlineCode,
                                        hangmaybay
                                      )}{' '}
                                      <br />
                                      Chuyến bay:
                                      {selectedFlight1.flightNumber}
                                      <br />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <table width='100%' className='price-break'>
                              <tbody>
                                <tr className='title-b'>
                                  <td align='center' className='header'>
                                    Loại
                                  </td>
                                  <td align='center' className='header'>
                                    S.L
                                  </td>
                                  <td align='center' className='header'>
                                    Giá/vé
                                  </td>
                                  <td align='center' className='header'>
                                    Thuế,Phí
                                  </td>
                                  <td align='center' className='header'>
                                    T.Giá
                                  </td>
                                </tr>
                                {mangnguoi.map((item, index) => (
                                  <tr key={index}>
                                    <td align='center' className='pax'>
                                      {item.name}
                                    </td>
                                    <td align='center' className='pax'>
                                      {item.songuoi}
                                    </td>
                                    <td align='center' className='pax'>
                                      {(
                                        parseInt(
                                          selectedFlight1.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          item.songuoi -
                                        ((parseInt(
                                          selectedFlight1.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          phantrams[0].phantram) /
                                          100) *
                                          item.songuoi
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {(
                                        ((parseInt(
                                          selectedFlight1.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          item.songuoi -
                                          ((parseInt(
                                            selectedFlight1.price.replace(
                                              /,/g,
                                              ''
                                            ),
                                            10
                                          ) *
                                            phantrams[0].phantram) /
                                            100) *
                                            item.songuoi) *
                                          30) /
                                        100
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {HandelTonggia(
                                        parseInt(
                                          selectedFlight1.price.replace(
                                            /,/g,
                                            ''
                                          ),
                                          10
                                        ) *
                                          item.songuoi -
                                          ((parseInt(
                                            selectedFlight1.price.replace(
                                              /,/g,
                                              ''
                                            ),
                                            10
                                          ) *
                                            phantrams[0].phantram) /
                                            100) *
                                            item.songuoi,
                                        item
                                      ).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className='filter-sidebar'>
          <FilterComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            setFilters={setFilters}
          />
          <SearchSidebar />
        </div>
      </div>
    </div>
  )
}

export default SearchKhuHoi
