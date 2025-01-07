import React, { useState } from 'react';
import './ChiTietDonHang.scss'; 
const ChiTietDonHang = () => {
  const [hoadon, setHoadon] = useState({
    mahoadon: 'HD123456',
    namenguoibay: 'Nguyen Van A',
    phone: '0987654321',
    email: 'nguyenvana@example.com',
    ngaybay: '2025-01-10',
    hang: 'Vietnam Airlines',
    chuyenbay: 'VN123',
    cityfrom: 'Hà Nội',
    cityto: 'TP Hồ Chí Minh',
    hourfrom: '08:00',
    hourto: '10:30',
    treem: 1,
    tresosinh: 0,
    nguoilon: 2,
    kygui: true,
    hanhlykygui: '20kg',
    pricekygui: 200000,
    xuathoadon: true,
    masothue: '123456789',
    tencongty: 'Công ty ABC',
    diachi: '123 Đường ABC, Hà Nội',
    ghichu: 'Yêu cầu thêm chỗ ngồi',
    themkhach: true,
    sokhachthem: 1,
    tienve: 1500000,
    tongtien: 1700000,
    trangthai: 'Đã thanh toán',
    ngaytao: '2025-01-07',
  });

  return (
    <div className='chitiethoadon'>
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
        <span className="hoadon-label">Hãng:</span>
        <span className="hoadon-value">{hoadon.hang}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Chuyến bay:</span>
        <span className="hoadon-value">{hoadon.chuyenbay}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Điểm đi:</span>
        <span className="hoadon-value">{hoadon.cityfrom}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Điểm đến:</span>
        <span className="hoadon-value">{hoadon.cityto}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Giờ khởi hành:</span>
        <span className="hoadon-value">{hoadon.hourfrom}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Giờ đến:</span>
        <span className="hoadon-value">{hoadon.hourto}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Trẻ em:</span>
        <span className="hoadon-value">{hoadon.treem}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Người lớn:</span>
        <span className="hoadon-value">{hoadon.nguoilon}</span>
      </div>
      <div className="hoadon-info">
        <span className="hoadon-label">Tiền vé:</span>
        <span className="hoadon-value">{hoadon.tienve.toLocaleString()} VND</span>
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
