import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="container">
      <div id="newFooter">
        <div className="floatL Question">
          <p className="headU bold-font-white">Bạn còn thắc mắc?</p>
          <ul className="listFAQ">
            <li><a rel="nofollow" href="/lien-he">Liên hệ</a></li>
            <li><a rel="nofollow" href="/huong-dan-thanh-toan">Hướng dẫn thanh toán</a></li>
            <li><a rel="nofollow" href="/thong-tin-chuyen-khoan">Thông tin chuyển khoản</a></li>
            <li><a rel="nofollow" href="/huong-dan-su-dung">Hướng dẫn đặt vé</a></li>
            <li><a rel="nofollow" href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</a></li>
            <li><a rel="nofollow" href="/cham-soc-khach-hang">Chăm sóc khách hàng</a></li>
            <li><a href="/tu-van-khach-hang" rel="nofollow">Trang tư vấn</a></li>
          </ul>
        </div>
        <div className="floatL aboutUs">
          <p className="headU bold-font-white">Về chúng tôi</p>
          <ul className="listFAQ">
            <li><a rel="nofollow" href="/gioi-thieu">Giới thiệu về ABAY</a></li>
            <li><a rel="nofollow" href="/cac-don-vi-hop-tac">Các đơn vị hợp tác</a></li>
            <li><a rel="nofollow" href="/co-hoi-hop-tac">Cơ hội hợp tác</a></li>
            <li><a rel="nofollow" href="/cau-truc-trang-web">Cấu trúc trang web</a></li>
            <li><a href="/dieu-khoan-su-dung" rel="nofollow">Điều khoản sử dụng</a></li>
            <li><a href="/chinh-sach-bao-mat" rel="nofollow">Chính sách bảo mật</a></li>
            <li><a href="/tin-tuc">Tin tức</a></li>
          </ul>
        </div>
        <div className="floatL Dathang" style={{ width: '150px' }}>
          <p className="headU bold-font-white">Quản lý đặt hàng</p>
          <ul className="listFAQ">
            <li><a rel="nofollow" href="/xem-lai-booking">Xem đơn hàng</a></li>
            <li><a target="_blank" rel="nofollow" href="/_WEB/DonHang/Page/Payment.aspx">Pay Online</a></li>
          </ul>
        </div>
        <div className="floatL" style={{ width: '200px', height: '140px' }}>
          <a rel="nofollow" href="https://www.facebook.com/abay.vn">
            <img src="/Facebook.png" alt="https://www.facebook.com/abay.vn" className="imgSocial" />
          </a>
          <a href="https://twitter.com/Abay_vn" rel="nofollow">
            <img src="/Twitter.png" alt="https://twitter.com/Abay_vn" className="imgSocial" />
          </a>
        </div>
        <div className="floatR" style={{ backgroundColor: '#fff', borderRadius: '8px', opacity: 0.9 }}>
          <a rel="nofollow" target="_blank" href="http://online.gov.vn/CustomWebsiteDisplay.aspx?DocId=8640">
            <img src="/BoCongThuong.png" alt="Đã thông báo Bộ Công Thương" className="imgBCT" />
          </a>
        </div>
        <div className="clr"></div>
        <div className="mainFooter">
          <div className="floatL hanoiFooter">
            <img src="/Saigon.jpg" alt="ABAY TẠI Tp Hồ Chí Minh" className="imgVP" />
            <p>
              <span className="uppercase-white">ABAY TẠI Tp Hồ Chí Minh</span>
              <br />
              52 Huỳnh Khương Ninh, P.Ða Kao, Q1, Tp Hồ Chí Minh <br />
              Website: <a href="https://www.abay.vn" className="link">www.abay.vn</a> - Email:{' '}
              <a href="mailto:contact@abay.vn" className="link">contact@abay.vn</a>
              <br />
              Tel: (+024) 7300 6091 - Fax: (+028) 38 48 7160
            </p>
          </div>
          <div className="floatL hanoiFooter">
            <img src="/hanoi.jpg" alt="ABAY TẠI HÀ NỘI" className="imgVP" />
            <p>
              <span className="uppercase-white">ABAY TẠI HÀ NỘI</span>
              <br />
              324 Phố Huế, Q.Hai Bà Trưng, Hà Nội <br />
              Website: <a href="https://www.abay.vn" className="link">www.abay.vn</a> - Email:{' '}
              <a href="mailto:contact@abay.vn" className="link">contact@abay.vn</a>
              <br />
              Tel: (+024) 7300 6091 - Fax: (+024) 35 33 5403
            </p>
          </div>
          <div className="clr"></div>
        </div>
        <p className="copyright">
          Công ty TNHH <a href="https://www.abay.vn" className="link">vé máy bay</a> trực tuyến{' '}
          <a href="https://www.abay.vn" className="link">ABAY</a> <br />
          Số ĐKKD 0105795184 - Mã số thuế 0105795184 <br />© 2012 ABAY Copyright. All Rights Reserved
        </p>
      </div>
      <div className="clr"></div>
    </div>
  );
};

export default Footer;
