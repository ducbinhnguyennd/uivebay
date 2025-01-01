import React from 'react';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-menu">
      <li class="homeIco2"><a class="nonedoted homeIco2" href="/"> <img src="/homeIcon.png" alt="Vé máy bay Abay - Trang chủ" class="homeIcon"/></a></li>
        <li><a href="/trang-chu">Trang chủ</a></li>
        <li><a href="/ve-noi-dia">Vé nội địa</a></li>
        <li><a href="/ve-quoc-te">Vé quốc tế</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle">Vé theo hãng</a>
          <ul className="dropdown-menu">
            <li><a href="/vietnam-airlines">Vé máy bay Vietnam Airlines</a></li>
            <li><a href="/pacific-airlines">Vé máy bay Pacific Airlines</a></li>
            <li><a href="/vietjet-air">Vé máy bay Vietjet Air</a></li>
            <li><a href="/bamboo-airways">Vé máy bay Bamboo Airways</a></li>
            <li><a href="/vietravel-airlines">Vé máy bay Vietravel Airlines</a></li>
          </ul>
        </li>
        <li><a href="/xem-lai-don-hang">Xem lại đơn hàng</a></li>
        <li><a href="/tien-ich">Tiện ích</a></li>
        <li><a href="/tin-khuyen-mai">Tin khuyến mãi</a></li>
        <li><a href="/gioi-thieu">Giới thiệu</a></li>
        <li><a href="/lien-he">Liên hệ</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
