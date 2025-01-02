import React, { useState } from "react";
import "./FlyBookingForm.scss";

function FlightBookingForm() {
  const [departure, setDeparture] = useState("Tp Hồ Chí Minh");
  const [arrival, setArrival] = useState("Hà Nội");
  const [departureDate, setDepartureDate] = useState("2025-01-03");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đã tìm kiếm chuyến bay!");
  };

  return (
    <div className="booking-container">
      <div className="flight-form">
        <h2>
          <img src="/Plane.png" alt="Plane" className="plane-icon" />
          VÉ MÁY BAY GIÁ RẺ
        </h2>
        <div className="line7"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label class="diemdi" title="Chọn điểm đi">
                Điểm đi
              </label>
              <input
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
            <div>⇌</div>
            <div className="form-group">
              <label class="diemden" title="Chọn điểm đến">
                Điểm đến
              </label>
              <input
                type="text"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Ngày đi</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Ngày về</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row-people">
            <div className="form-group">
              <label>Người lớn</label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Trẻ em</label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Em bé</label>
              <select
                value={infants}
                onChange={(e) => setInfants(Number(e.target.value))}
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="line7"></div>
          <div className="form-footer">
            <a href="https://youtube.com" className="help-link">
              Xem video hướng dẫn
            </a>
            <div type="submit" className="search">
              <img src="/SearcFlyBtn.png" alt="Plane" className="plane-icon" />
              <p>Tìm chuyến bay</p>
            </div>
          </div>
        </form>
      </div>

      <div className="promo-banner">
        <img src="/187.gif" alt="Đặt vé trên mobile" className="promo-image" />
        <div className="promo-content">
          <h3>Vé máy bay giá rẻ khách đặt mới nhất</h3>
          <ul className="flight-prices">
            <li>
              Hà Nội - Đà Nẵng: <b>539,000₫</b> <span>Bamboo Airways</span>
            </li>
            <li>
              Hà Nội - Hải Phòng: <b>489,000₫</b> <span>Vietnam Airlines</span>
            </li>
            <li>
              Tp Hồ Chí Minh - Nha Trang: <b>190,000₫</b>{" "}
              <span>VietjetAir</span>
            </li>
            <li>
              Hà Nội - Tp Hồ Chí Minh: <b>25,000₫</b>{" "}
              <span>Vietravel Airlines</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FlightBookingForm;
