import React from "react";
import "./FooterMB.scss"; 

const FooterMB = () => {
  return (
    <div className="footermb">
      <ul className="ul-footermb">
        <li className="tcenter">
          <a href="/lien-he">Liên hệ Abay</a>
        </li>
        <li></li>
      </ul>
      <div className="footermb-content">
        <p className="phone">Tổng đài hỗ trợ 19006091</p>
        <p>Công ty vé máy bay trực tuyến ABAY</p>
        <p className="mt10">
          Số ĐKKD <span>0105795184</span> - Mã số thuế <span>0105795184</span>
        </p>
        <p className="mt10">© 2012 ABAY Copyright. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default FooterMB;
