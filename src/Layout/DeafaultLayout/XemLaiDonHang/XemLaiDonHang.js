import React, { useState } from "react";
import "./XemLaiDonHang.scss";
const XemLaiDonHang = () => {
  return (
    <div className="XemLaiDonHang">
      
          <div className="con">
            <form >
              <table style={{ margin: "auto" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", lineHeight: "24px" }}>
                      <div>
                        Bạn muốn xem chuyến bay đã đặt, gửi yêu cầu xuất hóa đơn
                        VAT, hay mua thêm hành lý, chỗ ngồi, suất ăn,...
                      </div>
                      <div>vui lòng nhập vào số điện thoại sử dụng đặt vé:</div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <input
                        name="contactPhone"
                        id="contactPhone"
                        type="tel"
                        className="ocheck"
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
