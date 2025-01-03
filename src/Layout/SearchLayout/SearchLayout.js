import { useState,useEffect } from "react";
import "./SearchLayout.scss";
import { useToast } from "../../components/useToast/ToastContext";
import FilterComponent from "../../components/SideBar/Filter";
import SearchSidebar from "../../components/SideBar/SearchSideBar";
function SearchLayout() {
  const { cityfrom, cityto, searchData } = useToast();
  console.log(searchData);
  const [activeDate, setActiveDate] = useState("Thứ Bảy");
  const [visibleDetailIndex, setVisibleDetailIndex] = useState(null);
  const [hangmaybay, sethangmaybay] = useState([])
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

  useEffect(() => {
    fetchhang()
  }, [])
  const dates = [
    { day: "Thứ Hai", date: "06/01", price: "868,000đ" },
    { day: "Thứ Ba", date: "06/01", price: "868,000đ" },
    { day: "Thứ Tư", date: "01/01", price: "" },
    { day: "Thứ Năm", date: "02/01", price: "" },
    { day: "Thứ Sáu", date: "03/01", price: "1,010,000đ" },
    { day: "Thứ Bảy", date: "04/01", price: "868,000đ" },
    { day: "Chủ Nhật", date: "05/01", price: "1,008,000đ" },
  ];

  const flights = [
    {
      code: "VU750",
      time: "05:45 - 07:55",
      price: "868,000đ",
      details: [
        "Thời gian bay: 2 giờ 10 phút",
        "Hãng hàng không: Vietravel Airlines",
        "Loại vé: Economy",
        "Số ghế: 12A",
      ],
    },
    {
      code: "VU794",
      time: "20:45 - 22:55",
      price: "868,000đ",
      details: [
        "Thời gian bay: 2 giờ 10 phút",
        "Hãng hàng không: Vietravel Airlines",
        "Loại vé: Economy",
        "Số ghế: 15C",
      ],
    },
  ];

  const handleDateClick = (day) => {
    setActiveDate(day);
  };

  const toggleDetails = (index) => {
    setVisibleDetailIndex(visibleDetailIndex === index ? null : index);
  };
  const getAirlineImage = airlineCode => {
    const airline = hangmaybay.find(h => h.mahangmaybay === airlineCode)
    return airline ? airline.image : ''
  }
  
  return (
    <div className="search-layout">
      <div className="content-wrapper">
        {/* Phần bên trái */}
        <div className="main-content">
        <div className='flight-booking'>
      <div className='booking-header'>
        <div className='route-info'>
          <span className='city'>{cityfrom}</span>&nbsp;
          <img src='/plane1.png' alt='plane' style={{ width: '15px' }} />
          &nbsp;
          <span className='city'>{cityto}</span>
          <br />
          <div className='date-info'>
            <span className='selected-date'>Thứ Bảy 04/01/2025</span>, tức ngày
            5 âm lịch
          </div>
        </div>
        <div className='price-info'>
          Giá vé chưa gồm thuế và phí
          <br />
          <span className='note'>
            <img src='./hanhly.png' alt='baggage' style={{ width: '18px' }} />
            <img src='./suatan.jpg' alt='meal' style={{ width: '18px' }} />
            giá vé đã bao gồm hành lý và suất ăn
          </span>
        </div>
      </div>

      <div className='date-selection'>
        {dates.map(({ day, date, price }) => (
          <div
            key={day}
            className={`date ${activeDate === day ? 'active' : ''}`}
            onClick={() => handleDateClick(day)}
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
          searchData.outBound.data.flights.map((flight, index) => (
            <div key={index}>
              <div className='flight-row'>
                <div className='flight-info'>
                    <span>
                        <img src={getAirlineImage(flight.airlineCode)} alt="" />
                    </span>
                  <span className='flight-code'>{flight.flightNumber}</span>
                  <span className='flight-time'>
                    {flight.departureTime} - {flight.arrivalTime}
                  </span>
                </div>
                <div className='flight-price'>{flight.price}</div>
                <button
                  className='flight-details'
                  onClick={() => toggleDetails(index)}
                >
                  {visibleDetailIndex === index ? 'Ẩn chi tiết' : 'Chi tiết'}
                </button>
                <button className='select-flight'>{flight.chooseText}</button>
              </div>
              {visibleDetailIndex === index && (
                <div className='flight-detail-content'>
                  <p>Chi tiết chuyến bay:</p>
                  <ul>
                    {flights.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
        </div>

        {/* Phần bên phải */}
        <div className="filter-sidebar">
          <FilterComponent />
          <SearchSidebar/>
        </div>
      </div>
    </div>
  );
}

export default SearchLayout;
