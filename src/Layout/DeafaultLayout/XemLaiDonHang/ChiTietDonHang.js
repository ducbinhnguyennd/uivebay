import React from "react";
import { useLocation } from "react-router-dom";
import "./ChiTietDonHang.scss";

const ChiTietDonHang = () => {
  const { state: hoadon } = useLocation();

  if (!hoadon) {
    return <div>Không có dữ liệu hóa đơn!</div>;
  }

  return (
    <div className="chitiethoadon">
      <div className="hoadon-container">
        <h1 className="hoadon-title">Hóa Đơn Chi Tiết</h1>
        <div className="hoadon-info">
          <span className="hoadon-label">Mã hóa đơn:</span>
          <span className="hoadon-value">{hoadon.mahoadon}</span>
        </div>
        <div className="hoadon-info">
          <span className="hoadon-label">Họ tên người bay:</span>
          <span className="hoadon-value">{hoadon.namenguoibay}</span>
        </div>
        <div className="hoadon-info">
          <span className="hoadon-label">Số điện thoại:</span>
          <span className="hoadon-value">{hoadon.phone}</span>
        </div>
        <div className="hoadon-info">
          <span className="hoadon-label">Email:</span>
          <span className="hoadon-value">{hoadon.email}</span>
        </div>
        <div className="hoadon-info">
          <span className="hoadon-label">Ngày bay:</span>
          <span className="hoadon-value">{hoadon.ngaybay}</span>
        </div>
        <div className="hoadon-info">
          <span className="hoadon-label">Chuyến bay:</span>
          <span className="hoadon-value">{hoadon.chuyenbay}</span>
        </div>
        <div className="hoadon-info">
          <span className="hoadon-label">Tổng tiền:</span>
          <span className="hoadon-value">{hoadon.tongtien.toLocaleString()} VND</span>
        </div>
        <div className="hoadon-info">
          <span className="hoadon-label">Trạng thái thanh toán:</span>
          <span className="hoadon-value">{hoadon.trangthai}</span>
        </div>
      </div>
    </div>
  );
};

export default ChiTietDonHang;
