import React, { useEffect, useState } from "react";
import "./ThongTinChuyenKhoan.scss";

const ThongTinChuyenKhoan = () => {
  return (
    <div className="thongTinChuyenKhoan-container">
      <h1 style={{ color: "#00428b", fontSize: "20px", padding: "15px 10px" }}>
        THÔNG TIN CHUYỂN KHOẢN
      </h1>
      <div className="thongTinChuyenKhoan">
        <div className="thongTinChuyenKhoan-logo">
          <img
            src="./VCB.png"
            style={{
              width: "130px",
              marginRight: "15px",
            }}
          />
        </div>
        <div className="thongTinChuyenKhoan-content">
          <div style={{ fontWeight: "bold", color: "#666", fontSize: "14px" }}>
            Ngân hàng TMCP Ngoại thương Việt Nam - Vietcombank
          </div>
          <div className="text-infor-bank">
            Tên tài khoản: <span>Công ty TNHH vé máy bay trực tuyến Abay</span>
          </div>
          <div className="text-infor-bank">
            Số tài khoản : <span>Công ty TNHH vé máy bay trực tuyến Abay</span>
          </div>
          <div className="text-infor-bank">
            Chi Nhánh <span>Công ty TNHH vé máy bay trực tuyến Abay</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThongTinChuyenKhoan;
