import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./XemLaiDonHang.scss";

const XemLaiDonHang = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert("Vui lòng nhập số điện thoại!");
      return;
    }

    try {
       const response = await axios.post("https://demovemaybay.shop/searchhoadon", { query: phone  });

      if (response.data) {
        navigate("/chitietdonhang", { state: response.data });
      } else {
        alert("Không tìm thấy hóa đơn với số điện thoại này!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="XemLaiDonHang">
      <div className="con">
        <form onSubmit={handleSearch}>
          <table style={{ margin: "auto" }}>
            <tbody>
              <tr>
                <td style={{ padding: "10px", lineHeight: "24px" }}>
                  <div>
                    Bạn muốn xem chuyến bay đã đặt, gửi yêu cầu xuất hóa đơn
                    VAT, hay mua thêm hành lý, chỗ ngồi, suất ăn,...
                  </div>
                  <div>Vui lòng nhập vào số điện thoại sử dụng đặt vé:</div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <input
                    name="contactPhone"
                    id="contactPhone"
                    type="tel"
                    className="ocheck"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }} className="tcenter">
                  <button type="submit" className="btnContinue">
                    Tiếp tục
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default XemLaiDonHang;
