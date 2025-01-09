import React, { useEffect, useState } from "react";
import "./ThongTinChuyenKhoan.scss";

const ThongTinChuyenKhoan = () => {
  const [bankInfo, setBankInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankInfo = async () => {
      try {
        const response = await fetch("https://demovemaybay.shop/getnganhang");
        if (!response.ok) {
          throw new Error("Failed to fetch bank information");
        }
        const data = await response.json();
        setBankInfo(data[0]); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBankInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="thongTinChuyenKhoan-container">
      <h1 style={{ color: "#00428b", fontSize: "20px", padding: "15px 10px" }}>
        THÔNG TIN CHUYỂN KHOẢN
      </h1>
      <div className="thongTinChuyenKhoan">
        <div className="thongTinChuyenKhoan-logo">
          <img
            src={bankInfo.image}
            alt="Bank Logo"
            style={{
              width: "130px",
              marginRight: "15px",
            }}
          />
        </div>
        <div className="thongTinChuyenKhoan-content">
          <div style={{ fontWeight: "bold", color: "#666", fontSize: "14px" }}>
            {bankInfo.tendaydu} - {bankInfo.tennganhang}
          </div>
          <div className="text-infor-bank">
            Tên tài khoản: <span>{bankInfo.tentaikhoan}</span>
          </div>
          <div className="text-infor-bank">
            Số tài khoản: <span>{bankInfo.sotaikhoan}</span>
          </div>
          <div className="text-infor-bank">
            Chi Nhánh: <span>{bankInfo.chinhanh}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThongTinChuyenKhoan;
