/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
// import './SearchKHQTMB.scss'

import { useToast } from "../../../components/useToast/ToastContext";
import { useNavigate } from "react-router-dom";
import FilterComponent from "../../../components/SideBar/Filter";
import SearchSidebar from "../../../components/SideBar/SearchSideBar";
import {
  LunarCalendarFormat,
  formatDate,
} from "../../../components/LunarCalendarFormat/LunarCalendarFormat";
import {
  applyFiltersQT,
  handleFiltersChangeQT,
} from "../../../components/FilterChuyenBay/FilterChuyenBay";
import {
  toggleDetails,
  getAirlineImage,
  getAirlineName,
  handleDateClick,
  HandelTonggia,
  calculateDuration,
} from "../../../Layout/SearchLayout/SearchLayoutFunction";
import FilterMB from "../../componentsMB/FilterMobile/FilterMB";
function SearchKHQTMB() {
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
      const response = await fetch("https://demovemaybay.shop/gethangmaybay");
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
      const response = await fetch("https://demovemaybay.shop/getphantram");
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

  const flights1 = applyFiltersQT(searchData.data, filters);

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
                    {LunarCalendarFormat(returnDate)}
                  </span>
                </div>
              </div>
            </div>
            <FilterMB
            filters={filters}
            onFiltersChange={handleFiltersChangeQT}
            setFilters={setFilters}
          />
            {/* <div class="captions-container">
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
            </div> */}

            <div className="flight-options-quocte">
              {Array.isArray(searchData.data) &&
                flights1.map((flight, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/datve")}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <div className="flight-row-quoctekh">
                        <div className="flight-left">
                          <div className="flight-left1">
                            Đi:
                            <div style={{paddingLeft:"5px",paddingRight:"5px", display:"flex"}}>
                            <div className="flight-info-quocte-timekhmb">
                              <span className="flight-time-chang-quoctemb">
                                {flight.outbound.departureTime} <br /> {mafrom}
                              </span>
                            </div>
                            <div class="stop-points-container"><div class="stop-points-line stop-points-0"><div class="straight-line"></div></div></div>
                            <div className="flight-info-quocte-timekhmb">
                              <span className="flight-time-chang-quoctemb">
                                {flight.outbound.arrivalTime} <br /> {mato}
                              </span>
                            </div>
                            </div>
                            <div className="flight-info-quocte">
                              <div className="flight-time-quocte">
                                {calculateDuration(
                                  flight.outbound.departureTime,
                                  flight.outbound.arrivalTime
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flight-left2">
                            Về:
                            <div style={{paddingLeft:"5px",paddingRight:"5px", display:"flex"}}>
                            <div className="flight-info-quocte-timekhmb">
                              <span className="flight-time-chang-quoctemb">
                                {flight.inbound.departureTime} <br />
                                {mato}
                              </span>
                            </div>
                            <div class="stop-points-container"><div class="stop-points-line stop-points-0"><div class="straight-line"></div></div></div>

                            <div className="flight-info-quocte-timekhmb">
                              <span className="flight-time-chang-quoctemb">
                                {flight.inbound.arrivalTime} <br />
                                {mafrom}
                              </span>
                            </div>
                            </div>

                            <div className="flight-info-quocte">
                              <div className="flight-time-quocte">
                                {calculateDuration(
                                  flight.inbound.departureTime,
                                  flight.inbound.arrivalTime
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flight-right">
                          <div className="flight-price-quoctekh">
                            {phantrams.length > 0
                              ? (
                                  (parseInt(
                                    flight.totalPrice.replace(/,/g, ""),
                                    10
                                  ) *
                                    phantrams[0].phantram) /
                                  100
                                ).toLocaleString() + "đ"
                              : "Đang tải..."}
                          </div>
                          <button className="select-button">Chọn</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchKHQTMB;
