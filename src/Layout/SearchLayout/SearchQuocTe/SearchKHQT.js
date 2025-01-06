/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import "./SearchKHQT.scss";
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
function SearchKHQT() {
  const {
    cityfrom,
    cityto,
    searchData,
    mafrom,
    mato,
    date,
    returnDate,
    mangnguoi,
  } = useToast();
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null);
  const [hangmaybay, sethangmaybay] = useState([]);
  const [phantrams, setphantram] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: "abay-suggest",
    airlines: [],
  });
  const navigate = useNavigate();
  console.log(searchData);

  const fetchhang = async () => {
    try {
      const response = await fetch(
        "https://webmaybay.vercel.app/gethangmaybay"
      );
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

  const totalPeople = mangnguoi.reduce(
    (total, item) => total + item.songuoi,
    0
  );

  const totalPrice = mangnguoi.reduce((total, item) => {
    if (!selectedFlight || !selectedFlight.price) {
      return total;
    }
    const pricePerTicket =
      (parseInt(selectedFlight.price.replace(/,/g, ""), 10) *
        phantrams[0].phantram) /
      100;
    const taxAndFee = (pricePerTicket * 30) / 100;
    return total + pricePerTicket * item.songuoi + taxAndFee * item.songuoi;
  }, 0);

  return (
    <div className="search-layout">
      <div className="content-wrapper">
        <div className="main-content">
          <div className="flight-booking">
            <div className="booking-header">
              <div className="route-info">
                <span className="city">{cityfrom}</span>&nbsp;
                <img src="/plane1.png" alt="plane" style={{ width: "15px" }} />
                &nbsp;
                <span className="city">{cityto}</span>
                <br />
                <div className="date-info">
                  <span className="selected-date">
                    {LunarCalendarFormat(date)}
                  </span>
                </div>
              </div>
              <div className="route-info">
                <span className="city">{cityto}</span>&nbsp;
                <img src="/plane1.png" alt="plane" style={{ width: "15px" }} />
                &nbsp;
                <span className="city">{cityfrom}</span>
                <br />
                <div className="date-info">
                  <span className="selected-date">
                    {LunarCalendarFormat(date)}
                  </span>
                </div>
              </div>
            </div>

            <div class="captions-container">
              {" "}
              <label>Ghi chú:</label>
              <div class="caption-option">
                <div class="option-container">
                  <div class="stop-points-container">
                    <div class="stop-points-line stop-points-0">
                      <div class="straight-line"></div>
                    </div>
                  </div>
                </div>
                <label>Bay thẳng</label>
              </div>
              <div class="caption-option">
                <div class="option-container">
                  <div class="stop-points-container">
                    <div class="stop-points-line stop-points-1">
                      <div class="straight-line"></div>
                      <span class="circle">1</span>
                    </div>
                  </div>
                </div>
                <label>điểm dừng</label>
              </div>
              <div class="caption-option stop-points-2">
                <div class="option-container">
                  <div class="stop-points-container">
                    <div class="stop-points-line stop-points-2">
                      <div class="straight-line"></div>
                      <span class="circle">2</span>
                    </div>
                  </div>
                </div>
                <label>điểm dừng</label>
              </div>
            </div>

            <div className="flight-options-quocte">
              {Array.isArray(searchData.outBound.data.flights) &&
                flights1.map((flight, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/datve")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flight-row-quocte">
                      <div className="flight-info-quocte-logo">
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="flight-info-quocte">
                        <span className="flight-code-quocte">
                          {mafrom} - {mato}
                        </span>
                      </div>
                      <div className="flight-info-quocte">
                        <span className="flight-time-chang-quocte">
                          {flight.departureTime} - {flight.arrivalTime}
                        </span>
                      </div>
                      <div className="flight-info-quocte">
                        <div
                          style={{
                            display: "flex",
                            fontSize: "12px",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          Thời gian bay:
                          <div className="flight-time-quocte">
                            {calculateDuration(
                              flight.departureTime,
                              flight.arrivalTime
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDetails(
                            index,
                            flight,
                            setVisibleDetailIndex,
                            setSelectedFlight,
                            visibleDetailIndex
                          );
                        }}
                        style={{ display: "flex" }}
                      >
                        <div
                          style={{
                            color: "#143a83",
                            fontSize: "13px",
                            paddingRight: "5px",
                          }}
                        >
                          Chi tiết
                        </div>
                        <img src="./collaspe.png" />
                      </div>
                      <div className="flight-price-quocte">
                        {phantrams.length > 0
                          ? (
                              (parseInt(flight.price.replace(/,/g, ""), 10) *
                                phantrams[0].phantram) /
                              100
                            ).toLocaleString() + "đ"
                          : "Đang tải..."}
                      </div>
                      <button className="select-button">Chọn</button>
                    </div>
                    {visibleDetailIndex === index && (
                      <div
                        className="flight-detail-content"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <table width="100%" cellSpacing="0" cellPadding="0">
                            <tbody className="view-detail-flight">
                              <tr>
                                <td
                                  valign="top"
                                  style={{ width: "25%", textAlign: "right" }}
                                >
                                  <p>
                                    <b style={{ fontSize: "14px" }}>
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
                                  className="duration-info-container"
                                  style={{
                                    textAlign: "center",
                                    fontSize: "12px",
                                    width: "20%",
                                  }}
                                >
                                  <p style={{ paddingRight: "25px" }}>
                                    {calculateDuration(
                                      selectedFlight.departureTime,
                                      selectedFlight.arrivalTime
                                    )}
                                  </p>
                                  <p>
                                    <img
                                      src="/01-point.png"
                                      alt="Flight Path"
                                    />
                                  </p>
                                  <p
                                    style={{
                                      paddingRight: "25px",
                                      marginTop: "-10px",
                                    }}
                                  >
                                    <b>Máy bay: Airbus A321</b>
                                  </p>
                                </td>
                                <td valign="top" style={{ width: "25%" }}>
                                  <p>
                                    <b style={{ fontSize: "14px" }}>
                                      {`${cityto} (${mato})`}
                                    </b>
                                  </p>
                                  <p>
                                    <b>{selectedFlight.arrivalTime}</b>,
                                    {formatDate(date)}
                                  </p>
                                  <p>{`${cityto}`}</p>
                                </td>
                                <td style={{ width: "30%" }}>
                                  <table
                                    width="100%"
                                    cellPadding="0"
                                    cellSpacing="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          <img
                                            align="absmiddle"
                                            src={getAirlineImage(
                                              selectedFlight.airlineCode,
                                              hangmaybay
                                            )}
                                            alt="Airline Logo"
                                          />
                                        </td>
                                        <td
                                          style={{
                                            lineHeight: "18px",
                                            padding: 0,
                                          }}
                                        >
                                          {getAirlineName(
                                            selectedFlight.airlineCode,
                                            hangmaybay
                                          )}{" "}
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

                          <table width="100%" className="price-break">
                            <tbody>
                              <tr className="title-b">
                                <td align="center" className="header">
                                  Loại hành khách
                                </td>
                                <td align="center" className="header">
                                  Số lượng vé
                                </td>
                                <td align="center" className="header">
                                  Giá mỗi vé
                                </td>
                                <td align="center" className="header">
                                  Thuế & Phí
                                </td>
                                <td align="center" className="header">
                                  Tổng giá
                                </td>
                              </tr>
                              {mangnguoi.map((item, index) => (
                                <tr key={index}>
                                  <td align="center" className="pax">
                                    {item.name}
                                  </td>
                                  <td align="center" className="pax">
                                    {item.songuoi}
                                  </td>
                                  <td align="center" className="pax">
                                    {(
                                      ((parseInt(
                                        selectedFlight.price.replace(/,/g, ""),
                                        10
                                      ) *
                                        phantrams[0].phantram) /
                                        100) *
                                      item.songuoi
                                    ).toLocaleString()}
                                  </td>
                                  <td align="center" className="pax">
                                    {(
                                      ((((parseInt(
                                        selectedFlight.price.replace(/,/g, ""),
                                        10
                                      ) *
                                        phantrams[0].phantram) /
                                        100) *
                                        30) /
                                        100) *
                                      item.songuoi
                                    ).toLocaleString()}
                                  </td>
                                  <td align="center" className="pax">
                                    {HandelTonggia(
                                      parseInt(
                                        selectedFlight.price.replace(/,/g, ""),
                                        10
                                      ),
                                      phantrams,
                                      item
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                              <tr class="total-b">
                                <td align="right" colspan="4" class="footer">
                                  <b>
                                    <t>Tổng giá</t> {totalPeople} người
                                  </b>
                                </td>
                                <td
                                  colspan={1}
                                  align="center"
                                  class="footer pb-price"
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
                ))}
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

export default SearchKHQT;
