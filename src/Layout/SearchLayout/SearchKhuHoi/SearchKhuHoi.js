import { useState, useEffect } from "react";
import "./SearchKhuHoi.scss";
import { useToast } from "../../../components/useToast/ToastContext";
import { useNavigate } from "react-router-dom";
import FilterComponent from "../../../components/SideBar/Filter";
import SearchSidebar from "../../../components/SideBar/SearchSideBar";
import {
  LunarCalendarFormat,
  formatDate,
} from "../../../components/LunarCalendarFormat/LunarCalendarFormat";
import {
  applyFilters,
  handleFiltersChange,
} from "../../../components/FilterChuyenBay/FilterChuyenBay";
import {
  toggleDetails,
  getAirlineImage,
  getAirlineName,
  handleDateClick,
  HandelTonggia,
  calculateDuration,
} from "../SearchLayoutFunction";
function SearchKhuHoi() {
  const { cityfrom, cityto, searchData, mafrom, mato, date, returnDate, mangnguoi } =
    useToast();
  const [visibleDetailIndexOut, setVisibleDetailIndexOut] = useState(null); // Bảng đi
const [selectedFlightOut, setSelectedFlightOut] = useState(null);

const [visibleDetailIndexIn, setVisibleDetailIndexIn] = useState(null); // Bảng về
const [selectedFlightIn, setSelectedFlightIn] = useState(null);

  const [hangmaybay, sethangmaybay] = useState([]);
  const [phantrams, setphantram] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: "abay-suggest",
    airlines: [],
  });
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("T.Bay 04/01");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const fetchhang = async () => {
    try {
      const response = await fetch("https://webmaybay.vercel.app/gethangmaybay");
      const data = await response.json();
      if (response.ok) {
        sethangmaybay(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchphantram = async () => {
    try {
      const response = await fetch("https://webmaybay.vercel.app/getphantram");
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setphantram(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(returnDate);
  useEffect(() => {
    fetchhang();
    fetchphantram();
  }, []);


  const flights1 = applyFilters(searchData.outBound.data.flights, filters);
  const flights2 = applyFilters(searchData.inBound.data.flights, filters);

  const totalPeople = mangnguoi.reduce((total, item) => total + item.songuoi, 0)

  const totalPrice = mangnguoi.reduce((total, item) => {
    if (!selectedFlight || !selectedFlight.price) {
      return total
    }
    const pricePerTicket =
      (parseInt(selectedFlight.price.replace(/,/g, ''), 10) *
        phantrams[0].phantram) /
      100
    const taxAndFee = (pricePerTicket * 30) / 100
    return total + pricePerTicket * item.songuoi + taxAndFee * item.songuoi
  }, 0)
  return (
    <div className="search-layout">
      <div className="content-wrapper">
        <div className="main-content">
          <div className="price-info">
            Giá vé chưa gồm thuế và phí
            <br />
            Ghi chú:
            <span className="note">
              <img src="./hanhly.png" alt="baggage" style={{ width: "18px" }} />
              <img src="./suatan.jpg" alt="meal" style={{ width: "18px" }} />
              giá vé đã bao gồm hành lý và suất ăn
            </span>
          </div>
          <div className="flight-list">
            <div className="flight-go">
              <div className="section-header orange">
                <h3>
                  {cityfrom} <img src="./air-plane.png" alt="arrow" /> {cityto}
                </h3>
                <p>Thứ Bảy 04/01/2025, tức ngày 5 âm lịch</p>
              </div>

              <div className="tabs">
                {[
                  { label: "T.Năm 02/01", price: "1,028,000đ" },
                  { label: "T.Sáu 03/01", price: "490,000đ" },
                  { label: "T.Bay 04/01", price: "1,028,000đ" },
                  { label: "C.Nhật 05/01", price: "490,000đ" },
                  { label: "T.Hai 06/01", price: "490,000đ" },
                ].map((tab) => (
                  <div
                    key={tab.label}
                    className={`tab ${selectedTab === tab.label ? "active" : ""
                      }`}
                    onClick={() => handleTabClick(tab.label)}
                  >
                    <div>{tab.label}</div>

                  </div>
                ))}
              </div>

              <div className="flight-table">
                {Array.isArray(searchData.outBound.data.flights) &&
                  flights1.map((flight, index) => (
                    <div>
                      <div className="flight-row-khuhoi" key={index}>
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=''

                            style={{
                              width: "55px"
                            }}
                          />
                        </span>
                        <span className="flight-name">{flight.flightNumber}</span>
                        <span className="flight-time">{flight?.departureTime}</span>
                        <span className="flight-price">{phantrams.length > 0
                          ? (
                            (parseInt(flight.price.replace(/,/g, ''), 10) *
                              phantrams[0].phantram) /
                            100
                          ).toLocaleString()
                          : 'Đang tải...'}</span>
                        <img
                          src="./collaspe.png"
                          onClick={e => {
                            e.stopPropagation()
                            toggleDetails(
                              index,
                              flight,
                              setVisibleDetailIndexOut,
                              setSelectedFlight,
                              visibleDetailIndexOut
                            )
                          }}
                        /> 
                        <button className="select-button">Chọn</button>
                      </div>
                      {visibleDetailIndexOut === index && (
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
                                    style={{ width: '25%', textAlign: 'center' }}
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
                                      <p style={{ fontSize: "13px" }}>Máy bay: Airbus</p>
                                    </p>
                                  </td>
                                  <td valign='top' style={{ width: '25%',textAlign: "center" }}>
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
                                        ((parseInt(
                                          selectedFlight.price.replace(/,/g, ''),
                                          10
                                        ) *
                                          phantrams[0].phantram) /
                                          100) *
                                        item.songuoi
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {(
                                        ((((parseInt(
                                          selectedFlight.price.replace(/,/g, ''),
                                          10
                                        ) *
                                          phantrams[0].phantram) /
                                          100) *
                                          30) /
                                          100) *
                                        item.songuoi
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {HandelTonggia(
                                        parseInt(
                                          selectedFlight.price.replace(/,/g, ''),
                                          10
                                        ),
                                        phantrams,
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
            <div className="flight-back">
              <div className="section-header blue">
                <h3>
                  {cityto} <img src="./air-plane.png" alt="arrow" /> {cityfrom}
                </h3>
                <p>Thứ Bảy 04/01/2025, tức ngày 5 âm lịch</p>
              </div>

              <div className="tabs">
                {[
                  { label: "T.Năm 02/01", price: "1,028,000đ" },
                  { label: "T.Sáu 03/01", price: "490,000đ" },
                  { label: "T.Bay 04/01", price: "1,028,000đ" },
                  { label: "C.Nhật 05/01", price: "490,000đ" },
                  { label: "T.Hai 06/01", price: "490,000đ" },
                ].map((tab) => (
                  <div
                    key={tab.label}
                    className={`tab ${selectedTab === tab.label ? "active1" : ""
                      }`}
                    onClick={() => handleTabClick(tab.label)}
                  >
                    <div>{tab.label}</div>

                  </div>
                ))}
              </div>

              <div className="flight-table">
                {Array.isArray(searchData.inBound.data.flights) &&
                  flights2.map((flight, index) => (
                    <div>
                      <div className="flight-row-khuhoi" key={index}>
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=''

                            style={{
                              width: "55px"
                            }}
                          />
                        </span>
                        <span className="flight-name">{flight.flightNumber}</span>
                        <span className="flight-time">{flight?.departureTime}</span>
                        <span className="flight-price">{phantrams.length > 0
                          ? (
                            (parseInt(flight.price.replace(/,/g, ''), 10) *
                              phantrams[0].phantram) /
                            100
                          ).toLocaleString()
                          : 'Đang tải...'}</span>
                        <img
                          src="./collaspe.png"
                          onClick={e => {
                            e.stopPropagation()
                            toggleDetails(
                              index,
                              flight,
                              setVisibleDetailIndexIn,
                              setSelectedFlight,
                              visibleDetailIndexIn
                            )
                          }}
                        >

                        </img>
                        <button className="select-button1">Chọn</button>
                      </div>
                      {visibleDetailIndexIn === index && (
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
                                    style={{ width: '25%', textAlign: 'center' }}
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
                                      <p style={{ fontSize: "13px" }}>Máy bay: Airbus</p>
                                    </p>
                                  </td>
                                  <td valign='top' style={{ width: '25%', textAlign: 'center' }}>
                                    <p>
                                      <b style={{ fontSize: '14px' }}>
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
                                        ((parseInt(
                                          selectedFlight.price.replace(/,/g, ''),
                                          10
                                        ) *
                                          phantrams[0].phantram) /
                                          100) *
                                        item.songuoi
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {(
                                        ((((parseInt(
                                          selectedFlight.price.replace(/,/g, ''),
                                          10
                                        ) *
                                          phantrams[0].phantram) /
                                          100) *
                                          30) /
                                          100) *
                                        item.songuoi
                                      ).toLocaleString()}
                                    </td>
                                    <td align='center' className='pax'>
                                      {HandelTonggia(
                                        parseInt(
                                          selectedFlight.price.replace(/,/g, ''),
                                          10
                                        ),
                                        phantrams,
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

        <div className="filter-sidebar">
          <FilterComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            setFilters={setFilters}
          />
          <SearchSidebar />
        </div>
      </div>
    </div>
  );
}

export default SearchKhuHoi;
