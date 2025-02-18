/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
import './SearchQuocTe.scss'
import { useToast } from '../../../components/useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import FilterComponent from '../../../components/SideBar/Filter'
import SearchSidebar from '../../../components/SideBar/SearchSideBar'
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
  HandelTonggia,
  calculateDuration
} from '../SearchLayoutFunction'
function SearchQuocTe () {
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
  const { previousTwoDays, nextTwoDays } = getSurroundingDates(date)
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null)
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

  const flights1 = applyFilters(searchData?.data, filters)
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
              {previousTwoDays.map((day, index) => {
                const isPastDate =
                  new Date(day) < new Date().setHours(0, 0, 0, 0)

                return (
                  <div
                    key={index}
                    className={`date ${isPastDate ? 'disabled' : ''}`}
                    onClick={!isPastDate ? () => handleSearch(day) : undefined}
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
              {Array.isArray(searchData?.data) && searchData?.data.length > 0 ? (
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
                      <div className='flight-info-quocte'>
                        <span className='flight-code-quocte'>
                          {mafrom} - {mato}
                        </span>
                      </div>
                      <div className='flight-info-quocte'>
                        <span className='flight-time-chang-quocte'>
                          {flight.outbound.departureTime} -{' '}
                          {flight.outbound.arrivalTime}
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
                              flight.outbound.departureTime,
                              flight.outbound.arrivalTime
                            )}
                          </div>
                        </div>
                      </div>

                      <div
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
                        style={{ display: 'flex' }}
                      >
                        <div
                          style={{
                            color: '#143a83',
                            fontSize: '13px',
                            paddingRight: '5px'
                          }}
                        >
                          Chi tiết
                        </div>
                        <img src='./collaspe.png' />
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
                                  style={{ width: '25%', textAlign: 'right' }}
                                >
                                  <p>
                                    <b style={{ fontSize: '14px' }}>
                                      {`${cityfrom} (${mafrom})`}
                                    </b>
                                  </p>
                                  <p>
                                    <b>
                                      {selectedFlight.outbound.departureTime}
                                    </b>
                                    ,{formatDate(date)}
                                  </p>
                                  <p>{`${cityfrom}`}</p>
                                </td>
                                <td
                                  className='duration-info-container'
                                  style={{
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    width: '20%'
                                  }}
                                >
                                  <p style={{ paddingRight: '25px' }}>
                                    {calculateDuration(
                                      selectedFlight.outbound.departureTime,
                                      selectedFlight.outbound.arrivalTime
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
                                      paddingRight: '25px',
                                      marginTop: '-10px'
                                    }}
                                  >
                                    <b>Máy bay: Airbus A321</b>
                                  </p>
                                </td>
                                <td valign='top' style={{ width: '25%' }}>
                                  <p>
                                    <b style={{ fontSize: '14px' }}>
                                      {`${cityto} (${mato})`}
                                    </b>
                                  </p>
                                  <p>
                                    <b>{selectedFlight.outbound.arrivalTime}</b>
                                    ,{formatDate(date)}
                                  </p>
                                  <p>{`${cityto}`}</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table width='100%' className='price-break'>
                            <tbody>
                              <tr className='title-b'>
                                <td align='center' className='header'>
                                  Loại hành khách
                                </td>
                                <td align='center' className='header'>
                                  Số lượng vé
                                </td>
                                <td align='center' className='header'>
                                  Giá mỗi vé
                                </td>
                                <td align='center' className='header'>
                                  Thuế & Phí
                                </td>
                                <td align='center' className='header'>
                                  Tổng giá
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
                                      selectedFlight.totalPrice * item.songuoi -
                                      ((selectedFlight.totalPrice *
                                        phantrams[0].phantram) /
                                        100) *
                                        item.songuoi
                                    ).toLocaleString()}
                                  </td>
                                  <td align='center' className='pax'>
                                    {(
                                      ((selectedFlight.totalPrice *
                                        item.songuoi -
                                        ((selectedFlight.totalPrice *
                                          phantrams[0].phantram) /
                                          100) *
                                          item.songuoi) *
                                        30) /
                                      100
                                    ).toLocaleString()}
                                  </td>
                                  <td align='center' className='pax'>
                                    {HandelTonggia(
                                      selectedFlight.totalPrice * item.songuoi -
                                        ((selectedFlight.totalPrice *
                                          phantrams[0].phantram) /
                                          100) *
                                          item.songuoi,
                                      item
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                              <tr class='total-b'>
                                <td align='right' colSpan='4' class='footer'>
                                  <b>
                                    <t>Tổng giá</t> {totalPeople} người
                                  </b>
                                </td>
                                <td
                                  colSpan={1}
                                  align='center'
                                  class='footer pb-price'
                                >
                                  {totalPrice.toLocaleString()} VNĐ
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className='nodulieu'>không có dữ liệu</div>
              )}
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

export default SearchQuocTe
