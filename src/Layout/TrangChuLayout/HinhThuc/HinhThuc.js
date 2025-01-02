import React, { useState } from "react";
import "./HinhThuc.scss";

function HinhThuc() {
  return (
    <div className="hinhthuc">
      <div className="service-method">
        <div className="payment-method">
          <h3 className="big-font-normal">
            &nbsp;
            <br />{" "}
            <span className="big-font-header">
              Các hình thức mua vé máy bay giá rẻ
            </span>
          </h3>
          <div className="blank10"></div>
          <div className="line7"></div>
          <ul>
            <li>
              <img
                src="/bgNumber1.png"
                className="number"
                alt="Ve may bay Abay - Hình thức mua vé trực tuyến"
              />{" "}
              <span className="insideLi">
                {" "}
                Trực tiếp lên website, nhanh nhất - tiện nhất
              </span>
            </li>
            <li>
              <img
                src="/bgNumber2.png"
                className="number2"
                alt="Ve may bay Abay - Hinh thuc mua ve qua chat"
              />{" "}
              <span className="insideLi">Qua chat</span>
              <div className="chatList">
                <a
                  onClick={() =>
                    window.open("https://www.zopim.com/livechat/abay.vn")
                  }
                >
                  <img src="/zopim.png" alt="Chat tren website" />
                </a>{" "}
                <a target="_blank" href="//m.me/abay.vn">
                  <img src="/messenger.png" alt="Chat qua Facebook Messeger" />
                </a>{" "}
                <a
                  target="_blank"
                  href="/tin-tuc/huong-dan-cach-lien-he-voi-abay-qua-zalo.aspx"
                >
                  <img src="/zalo.png" alt="Chat qua Zalo" />
                </a>{" "}
                <a
                  target="_blank"
                  href="/tin-tuc/cach-lien-he-voi-abay-qua-viber.aspx"
                >
                  <img src="/viber.png" alt="Chat qua Viber" />
                </a>{" "}
                <a href="skype:abay.chat1?chat">
                  <img src="/skype.png" alt="" />
                </a>
              </div>
            </li>
            <li>
              <img
                src="/bgNumber3.png"
                className="number3"
                alt="Ve may bay Abay - Goi dien thoai"
              />{" "}
              <span className="insideLi">Gọi điện thoại cho Abay</span>
              <br />{" "}
              <img
                src="/phone.png"
                className="floatL imgDienThoai"
                alt="Lien he qua dien thoai"
              />{" "}
              <span className="bold-font-cyan txtTongDai">
                Tổng đài:{" "}
                <a className="telTD" href="tel:19006091">
                  {" "}
                  1900 6091{" "}
                </a>{" "}
              </span>
              <div className="clr"></div>
            </li>
            <li>
              <img
                src="/bgNumber4.png"
                className="number4"
                alt="Ve may bay Abay - Hình thức mua vé trực tiếp"
              />{" "}
              <span className="insideLi">
                {" "}
                Đến trực tiếp văn phòng Abay Tại Hà Nội và Sài Gòn
              </span>
              <div className="blank10"></div>
              <div id="addVP">
                <div className="blank10"></div>
                <a
                  href="/_WEB/PageSub/BanDoAbay/Ban-do-Abay.aspx?City=HAN"
                  className="AddHN lightview"
                  rel="nofollow"
                  data-lightview-options="width: 1000, height: 520"
                >
                  {" "}
                  <img
                    src="/Van-Phong-Abay-Tai-Ha-Noi.png"
                    alt="Ve may bay Abay - ban do van phong tai Ha Noi"
                    className="imgBanDo"
                  />{" "}
                </a>{" "}
                <a
                  href="/_WEB/PageSub/BanDoAbay/Ban-do-Abay.aspx?City=SGN"
                  className="AddSG lightview"
                  rel="nofollow"
                  data-lightview-options="width: 1000, height: 520"
                >
                  {" "}
                  <img
                    src="/Van-Phong-Abay-Tai-Sai-Gon.png"
                    alt="Vé máy bay Abay - bản đồ văn phòng tại Hồ Chí Minh"
                    className="imgBanDo"
                  />{" "}
                </a>
              </div>
              <span className="viewoffice">
                Xin click vào ảnh để xem địa chỉ bản đồ
              </span>
              <div className="clr"></div>
            </li>
          </ul>
        </div>
        <div className="service">
          <div className="Pttt">
            <p className="big-font-normal">
              &nbsp;
              <br />{" "}
              <span className="big-font-header">Các hình thức thanh toán</span>
            </p>
            <div className="blank10"></div>
            <div className="line7"></div>
            <ul className="wPttt">
              <li>
                <div className="imgPttt">
                  <img
                    className="thumb imgTaiVP"
                    src="/abaylogo.png"
                    alt="Thanh toán tại vp Abay"
                    title="Thanh toán tại văn phòng Abay"
                  />
                </div>
                <p>
                  <b>Thanh toán bằng tiền mặt tại Văn phòng Abay</b>
                  <br />{" "}
                  <span>
                    Sau khi đặt hàng thành công, Quý khách vui lòng qua văn
                    phòng Abay để thanh toán và nhận vé.
                  </span>
                </p>
                <div className="clr"></div>
              </li>
            <div className="line7"></div>
              <li>
                <div className="imgPttt">
                  <img
                    className="thumb imgQR"
                    src="/Icon_QR.png"
                    alt="Thanh toán bằng QR Code"
                    title="Thanh toán bằng QR Code"
                  />
                </div>
                <p>
                  <b>Thanh toán bằng QR Code</b>
                  <br />{" "}
                  <span>
                    Quét QR code bằng ứng dụng của ngân hàng hoặc ví điện tử.
                  </span>
                </p>
                <div className="clr"></div>
              </li>
            <div className="line7"></div>
              <li>
                <div className="imgPttt">
                  <img
                    className="thumb imgThe"
                    src="/iconThe.png"
                    alt="Thanh toán qua cổng thanh toán điện tử"
                    title="Thanh toán qua cổng thanh toán điện tử"
                  />
                </div>
                <p>
                  <b>Thanh toán qua cổng thanh toán điện tử</b>
                  <br />{" "}
                  <span>
                    Quý khách có thể thanh toán ngay (trực tuyến) qua cổng
                    ZaloPay và OnePay.
                  </span>
                </p>
                <div className="clr"></div>
              </li>
            <div className="line7"></div>
              <li>
                <div className="imgPttt">
                  <img
                    className="thumb imgPayoo"
                    src="/Payoo.png"
                    alt="Thanh toán qua điểm giao dịch, cửa hàng tiện ích"
                    title="Thanh toán qua điểm giao dịch, cửa hàng tiện ích"
                  />
                </div>
                <p>
                  <b>Thanh toán qua các cửa hàng tiện ích</b>
                  <br />{" "}
                  <span>
                    Quý khách có thể qua các điểm giao dịch, cửa hàng tiện ích
                    ngay gần nhà để thanh toán
                  </span>
                </p>
                <div className="clr"></div>
              </li>
            <div className="line7"></div>
              <li style={{ borderBottom: "none !important" }}>
                <div className="imgPttt">
                  <img
                    className="thumb imgBank"
                    src="/bank.jpg"
                    alt="Thanh toán qua chuyển khoản"
                    title="Thanh toán qua chuyển khoản cho Abay"
                  />
                </div>
                <p>
                  <b>Thanh toán qua chuyển khoản</b>
                  <br />{" "}
                  <span>
                    Quý khách có thể thanh toán bằng cách chuyển khoản trực tiếp
                    tại ngân hàng, qua thẻ ATM, hoặc qua Internet banking.
                  </span>
                </p>
                
                <div className="clr"></div>
              </li>
              <div className="imgCk">
                  <img
                    src="/PartnerV2.jpg"
                    alt="Argibank, Techcombank, Bidv, ACB,..."
                    className="imgbank"
                    title="Các ngân hàng"
                  />
                </div>
            </ul>
            <div className="clr"></div>
          </div>
        </div>
        <div className="clr"></div>
      </div>
    </div>
  );
}

export default HinhThuc;
