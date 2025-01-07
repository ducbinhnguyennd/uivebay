import React, { useState } from "react";
import "./DefaultLayoutMB.scss";
import HeaderMB from "./HeaderMB/HeaderMB";
import FooterMB from "./FooterMb/FooterMB";

function DeafaultLayoutMB({ children }) {
  return (
    <div className="container-default">
      <div className="header-navbar">
        <HeaderMB />
      </div>
      <div className="content-mb">{children}</div>
      <FooterMB />
    </div>
  );
}
export default DeafaultLayoutMB;
