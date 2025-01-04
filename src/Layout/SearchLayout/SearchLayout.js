import { useState, useEffect } from 'react'
import './SearchLayout.scss'
import { useToast } from '../../components/useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import FilterComponent from '../../components/SideBar/Filter'
import SearchSidebar from '../../components/SideBar/SearchSideBar'
import {
  LunarCalendarFormat,
  formatDate
} from '../../components/LunarCalendarFormat/LunarCalendarFormat'
import {
  applyFilters,
  handleFiltersChange
} from '../../components/FilterChuyenBay/FilterChuyenBay'
import {
  toggleDetails,
  getAirlineImage,
  getAirlineName,
  handleDateClick,
  HandelTonggia,
  calculateDuration
} from './SearchLayoutFunction'
function SearchLayout () {
  const { cityfrom, cityto, searchData, mafrom, mato, date, returnDate } = useToast()
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

  const fetchhang = async () => {
    try {
      const response = await fetch('http://localhost:8080/gethangmaybay')
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
      const response = await fetch('http://localhost:8080/getphantram')
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

            <div className='flight-options'>
              {(activeDate === 'Thứ Bảy' || activeDate === 'Thứ Hai') &&
                Array.isArray(searchData.outBound.data.flights) &&
                flights1.map((flight, index) => (
                  <div
                    key={index}
                    onClick={() => navigate('/datve')}
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
                        <span className='flight-code'>
                          {flight.flightNumber}
                        </span>
                        <span className='flight-time'>
                          {flight.departureTime} - {flight.arrivalTime}
                        </span>
                      </div>

                      <div className='flight-price'>
                        {phantrams.length > 0
                          ? (
                              (parseInt(flight.price.replace(/,/g, ''), 10) *
                                phantrams[0].phantram) /
                              100
                            ).toLocaleString()
                          : 'Đang tải...'}
                      </div>
                      <button
                        className='flight-details'
                        onClick={e => {
                          e.stopPropagation()
                          toggleDetails(
                            index,
                            flight,
                            setVisibleDetailIndex,
                            setSelectedFlight,
                            visibleDetailIndex
                          )
                        }}
                      >
                        {visibleDetailIndex === index
                          ? 'Ẩn chi tiết'
                          : 'Chi tiết'}
                      </button>
                      <button className='select-flight'>
                        {flight.chooseText}
                      </button>
                    </div>
                    {visibleDetailIndex === index && (
                      <div className='flight-detail-content' onClick={(e) => e.stopPropagation()}>
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
                                    <b>{selectedFlight.departureTime}</b>,
                                    {formatDate(date)}
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
                                      selectedFlight.departureTime,
                                      selectedFlight.arrivalTime
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
                                    <b>{selectedFlight.arrivalTime}</b>,
                                    {formatDate(date)}
                                  </p>
                                  <p>{`${cityto}`}</p>
                                </td>
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
                                          <b>{selectedFlight.flightNumber}</b>
                                          <br />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
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
                              <tr>
                                <td align='center' className='pax'>
                                  Người lớn
                                </td>
                                <td align='center' className='pax'>
                                  1
                                </td>
                                <td align='center' className='pax'>
                                  {(
                                    (parseInt(
                                      selectedFlight.price.replace(/,/g, ''),
                                      10
                                    ) *
                                      phantrams[0].phantram) /
                                    100
                                  ).toLocaleString()}
                                </td>
                                <td align='center' className='pax'>
                                  {(
                                    (((parseInt(
                                      selectedFlight.price.replace(/,/g, ''),
                                      10
                                    ) *
                                      phantrams[0].phantram) /
                                      100) *
                                      30) /
                                    100
                                  ).toLocaleString()}
                                </td>
                                <td align='center' className='pax'>
                                  {HandelTonggia(
                                    parseInt(
                                      selectedFlight.price.replace(/,/g, ''),
                                      10
                                    ),
                                    phantrams
                                  ).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Baggage Conditions */}
                          <table
                            cellPadding='0'
                            cellSpacing='0'
                            style={{ width: '45%' }}
                          >
                            <tbody>
                              <tr className='title'>
                                <td colSpan='2' style={{ fontSize: '12px' }}>
                                  Điều Kiện Hành Lý
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '120px' }}>
                                  Hành Lý Xách Tay
                                </td>
                                <td>7kg</td>
                              </tr>
                              <tr>
                                <td style={{ width: '120px' }}>
                                  Hành Lý Ký Gửi
                                </td>
                                <td>Vui lòng chọn ở bước tiếp theo</td>
                              </tr>
                            </tbody>
                          </table>

                          <table
                            cellPadding='0'
                            cellSpacing='0'
                            style={{ width: '45%' }}
                          >
                            <tbody>
                              <tr className='title'>
                                <td colSpan='2' style={{ fontSize: '12px' }}>
                                  Điều Kiện Về Vé
                                </td>
                              </tr>
                              <tr>
                                <td>- Áp dụng đổi vé mất phí</td>
                              </tr>
                              <tr>
                                <td>- Áp dụng hoàn vé mất phí</td>
                              </tr>
                              <tr>
                                <td>- Không áp dụng đổi tên</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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

export default SearchLayout
