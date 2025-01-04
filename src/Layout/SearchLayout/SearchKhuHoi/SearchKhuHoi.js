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
  const { cityfrom, cityto, searchData, mafrom, mato, date, returnDate } =
    useToast();
  const [activeDate, setActiveDate] = useState("Thứ Bảy");
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null);
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
      const response = await fetch("http://localhost:8080/gethangmaybay");
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
      const response = await fetch("http://localhost:8080/getphantram");
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

  const dates = [
    { day: "Thứ Hai", date: "06/01", price: "868,000đ" },
    { day: "Thứ Ba", date: "06/01", price: "868,000đ" },
    { day: "Thứ Tư", date: "01/01", price: "" },
    { day: "Thứ Năm", date: "02/01", price: "" },
    { day: "Thứ Sáu", date: "03/01", price: "1,010,000đ" },
    { day: "Thứ Bảy", date: "04/01", price: "868,000đ" },
    { day: "Chủ Nhật", date: "05/01", price: "1,008,000đ" },
  ];

  const flights1 = applyFilters(searchData.outBound.data.flights, filters);

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
                    className={`tab ${
                      selectedTab === tab.label ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.label)}
                  >
                    <div>{tab.label}</div>
             
                  </div>
                ))}
              </div>

              <div className="flight-table">
                <div className="flight-row">
                  <span className="flight-name">VN6071</span>
                  <span className="flight-time">18:35</span>
                  <span className="flight-price">1,149,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
                <div className="flight-row">
                  <span className="flight-name">VN197</span>
                  <span className="flight-time">19:10</span>
                  <span className="flight-price">1,149,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
                <div className="flight-row">
                  <span className="flight-name">VN195</span>
                  <span className="flight-time">18:35</span>
                  <span className="flight-price">1,299,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
                <div className="flight-row">
                  <span className="flight-name">VJ519</span>
                  <span className="flight-time">22:10</span>
                  <span className="flight-price">1,720,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
              </div>
            </div>
            <div className="flight-back">
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
                    className={`tab ${
                      selectedTab === tab.label ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.label)}
                  >
                    <p>{tab.label}</p>
                    <p>{tab.price}</p>
                  </div>
                ))}
              </div>

              <div className="flight-table">
                <div className="flight-row">
                  <span className="flight-name">VN6071</span>
                  <span className="flight-time">18:35</span>
                  <span className="flight-price">1,149,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
                <div className="flight-row">
                  <span className="flight-name">VN197</span>
                  <span className="flight-time">19:10</span>
                  <span className="flight-price">1,149,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
                <div className="flight-row">
                  <span className="flight-name">VN195</span>
                  <span className="flight-time">18:35</span>
                  <span className="flight-price">1,299,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
                <div className="flight-row">
                  <span className="flight-name">VJ519</span>
                  <span className="flight-time">22:10</span>
                  <span className="flight-price">1,720,000đ</span>
                  <button className="select-button">Chọn</button>
                </div>
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
