/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import "./SearchNoiDiaKHMB.scss";
import { useToast } from "../../../components/useToast/ToastContext";
// import { useNavigate } from 'react-router-dom'
import FilterComponent from "../../../components/SideBar/Filter";
import {
  LunarCalendarFormat,
  formatDate,
  CalendarFormatMB,
  getSurroundingDateskhuhoinoidia,
  CalendarFormat,
  getSurroundingDateskhuhoinoidia1,
} from "../../../components/LunarCalendarFormat/LunarCalendarFormat";
import {
  applyFilters,
  handleFiltersChange,
} from "../../../components/FilterChuyenBay/FilterChuyenBay";
import {
  toggleDetails,
  getAirlineImage,
  getAirlineName,
  HandelTonggia,
  calculateDuration,
} from "../../../Layout/SearchLayout/SearchLayoutFunction";
import { useNavigate } from 'react-router-dom'
import FilterMB from "../../componentsMB/FilterMobile/FilterMB";

function SearchNoiDiaKHMB() {
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
  } = useToast();
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null);
  const [visibleDetailIndex2, setVisibleDetailIndex2] = useState(null);

  const [hangmaybay, sethangmaybay] = useState([]);
  const [phantrams, setphantram] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedFlight1, setSelectedFlight1] = useState(null);
  const { previousTwoDays, nextTwoDays } =
    getSurroundingDateskhuhoinoidia(date);
  const { previousTwoDays1, nextTwoDays1 } =
    getSurroundingDateskhuhoinoidia1(returnDate);
    const navigate = useNavigate()
  const [filters, setFilters] = useState({
    sortBy: "abay-suggest",
    airlines: [],
  });

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

  const handleSearch = async (date) => {
    try {
      const requestData = {
        departure: mafrom,
        arrival: mato,
        date: formatDate(date),
        adults: mangnguoi[0]?.songuoi,
        children: mangnguoi[1]?.songuoi || 0,
        infants: mangnguoi[2]?.songuoi || 0,
        returnDate: formatDate(returnDate),
      };

      const response = await fetch(
        "https://wooordersystem.store/order-woo/api/getInfoFlights",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setSearchData(data);
        setdate(date);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch1 = async (returnDate) => {
    try {
      const requestData = {
        departure: mafrom,
        arrival: mato,
        date: formatDate(date),
        adults: mangnguoi[0]?.songuoi,
        children: mangnguoi[1]?.songuoi || 0,
        infants: mangnguoi[2]?.songuoi || 0,
        returnDate: formatDate(returnDate),
      };

      const response = await fetch(
        "https://wooordersystem.store/order-woo/api/getInfoFlights",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setSearchData(data);
        setreturnDate(returnDate);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
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
    <div className="search-layout">
      <div className="content-wrapper">
        <div className="main-content">
        <FilterMB
            filters={filters}
            onFiltersChange={handleFiltersChange}
            setFilters={setFilters}
          />
          <div className="price-infomb">
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
                  {mafrom} <img src="./air-plane.png" alt="arrow" /> {mato}
                </h3>
              </div>

              <div className="tabs">
                {previousTwoDays.map((day, index) => {
                  const isPastDate =
                    new Date(day) < new Date().setHours(0, 0, 0, 0);

                  return (
                    <div
                      key={index}
                      className={`datemb ${isPastDate ? "disabled" : ""}`}
                      onClick={
                        !isPastDate ? () => handleSearch(day) : undefined
                      }
                    >
                      {CalendarFormatMB(day)}
                      <br />
                    </div>
                  );
                })}
                <div className={`datemb ${date ? "active" : ""}`}>
                  {CalendarFormatMB(date)}
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

              <div className="flight-table">
                {Array.isArray(searchData.outBound.data.flights) &&
                  flights1.map((flight, index) => (
                    <div
                    key={index}
                    className={`divflightrow ${
                      selectedFlight === flight ? 'addflightrow' : ''
                    }`}
                    onClick={() => handleSelectFlight1(flight)}
                  >
                      <div className="flight-row-khuhoi" key={index}>
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=""
                            style={{
                              width: "45px",
                            }}
                          />
                        </span>

                        <span className="flight-timemb">
                          {flight?.departureTime}
                        </span>
                        <span className="flight-pricemb">
                          {phantrams.length > 0
                            ? (
                                parseInt(flight.price.replace(/,/g, ""), 10) -
                                (parseInt(flight.price.replace(/,/g, ""), 10) *
                                  phantrams[0].phantram) /
                                  100
                              ).toLocaleString()
                            : "Đang tải..."}
                        </span>
                        <button
                          className="select-flightmb"
                          style={{
                            backgroundColor: "#e67e00",
                          }}
                        >
                          {flight.chooseText === "Hạng Thương Gia"
                            ? "T.Gia"
                            : "Chọn"}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flight-back">
              <div className="section-header blue">
                <h3>
                  {mato} <img src="./air-plane.png" alt="arrow" /> {mafrom}
                </h3>
              </div>

              <div className="tabs">
                {previousTwoDays1.map((day, index) => {
                  const isPastDate =
                    new Date(day) < new Date().setHours(0, 0, 0, 0);

                  return (
                    <div
                      key={index}
                      className={`datemb ${isPastDate ? "disabled" : ""}`}
                      onClick={
                        !isPastDate ? () => handleSearch1(day) : undefined
                      }
                    >
                      {CalendarFormatMB(day)}
                      <br />
                    </div>
                  );
                })}
                <div className={`datemb ${returnDate ? "active" : ""}`}>
                  {CalendarFormatMB(returnDate)}
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

              <div className="flight-table">
                {Array.isArray(searchData.inBound.data.flights) &&
                  flights2.map((flight, index) => (
                    <div
                      key={index}
                      className={`divflightrow ${
                        selectedFlight1 === flight ? 'addflightrow' : ''
                      }`}
                      onClick={() => handleSelectFlight2(flight)}
                    >
                      <div className="flight-row-khuhoi" key={index}>
                        <span>
                          <img
                            src={getAirlineImage(
                              flight.airlineCode,
                              hangmaybay
                            )}
                            alt=""
                            style={{
                              width: "45px",
                            }}
                          />
                        </span>

                        <span className="flight-timemb">
                          {flight?.departureTime}
                        </span>
                        <span className="flight-pricemb">
                          {phantrams.length > 0
                            ? (
                                parseInt(flight.price.replace(/,/g, ""), 10) -
                                (parseInt(flight.price.replace(/,/g, ""), 10) *
                                  phantrams[0].phantram) /
                                  100
                              ).toLocaleString()
                            : "Đang tải..."}
                        </span>
                        <button
                          className="select-flightmb"
                          style={{
                            backgroundColor: "#e67e00",
                          }}
                        >
                          {flight.chooseText === "Hạng Thương Gia"
                            ? "T.Gia"
                            : "Chọn"}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchNoiDiaKHMB;
