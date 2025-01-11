import React from "react";
import "./HeaderMB.scss"; 

const HeaderMB = () => {
  const toggleMenu = () => {
    const menuContent = document.getElementById("menu-content");
    if (menuContent) {
      menuContent.classList.toggle("active");
    }
  };

  return (
    <header>
      <div className="divtop">
        <a className="logolink" href="/">
          <img
            className="logoimg"
            src="/logo.png"
            alt="Vé máy bay giá rẻ ABAY"
          />
        </a>
        <span className="sotongdai">Tổng đài hỗ trợ 19006091</span>
        <span id="menu-link" onClick={toggleMenu}></span>
      </div>
      <div id="menu-content">
        <ul>
          <li>
            <a href="/">Trang chủ Abay</a>
          </li>
          <li>
            <a href="/xem-lai-don-hang">
              <strong>Xem lại đơn hàng</strong>
            </a>
          </li>
          <li>
            <a href="/thongtinchuyenkhoan">Hướng dẫn thanh toán</a>
          </li>
          {/* <li>
            <a href="/gioi-thieu">Giới thiệu Abay</a>
          </li> */}
          <li>
            <a href="/lien-he">Liên hệ Abay</a>
          </li>
          {/* <li>
            <a href="/khach-hang-noi-ve-chung-toi">
              Khách hàng nói về chúng tôi
            </a>
          </li> */}
        </ul>
      </div>
      <div className="title-oneway">
        Đặt vé máy bay nội địa &amp; quốc tế
      </div>
    </header>
  );
};

export default HeaderMB;
