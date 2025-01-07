import React from "react";
import "./LienHeMB.scss";
function LienHeMB() {

  const handleFileChange = () => {
    // Logic for handling file changes or form submission
    console.log("File submitted");
    return false;
  };

  return (
    <div
      style={{

        paddingTop: "20px",
        textAlign: "center",
        padding: "5px 10px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ margin: "0 auto", textAlign: "left" }}>
        
    
     
              
                <h5 className="CompName">Công ty vé máy bay trực tuyến ABAY</h5>
                <h6 className="textTT">Địa chỉ Văn phòng tại Hà Nội</h6>
                <p className="add">324 Phố Huế, Quận Hai Bà Trưng, Hà Nội</p>
                <p className="text">
                  <b>Hotline:</b> 19006091
                </p>
                <p className="text">
                  <b>Email:</b>{" "}
                  <a href="mailto:contact@abay.vn" style={{ color: "#0c5dd6" }}>contact@abay.vn</a>
                </p>
                <div className="line"></div>
                <h6 className="textTT">
                  Địa chỉ Văn phòng tại Tp. Hồ Chí Minh
                </h6>
                <p className="add">52 Huỳnh Khương Ninh, Q1, Tp Hồ Chí Minh</p>
                <p className="text">
                  <b>Hotline:</b> 19006091
                </p>
                <p className="text">
                  <b>Email:</b>{" "}
                  <a href="mailto:contact@abay.vn" style={{ color: "#0c5dd6" }}>contact@abay.vn</a>
                </p>
               
                <h5 className="CompName1">&nbsp;</h5>
                <h6 className="textTT">Thông tin liên hệ</h6>
                {[
                  "Thắc mắc & góp ý",
                  "Phàn nàn & khiếu nại",
                  "Liên hệ hóa đơn",
                  "Liên hệ thanh toán",
                  "Liên hệ đặt vé nội địa",
                  "Liên hệ đặt vé quốc tế",
                  "Liên hệ hợp tác",
                  "Liên hệ khác",
                ].map((label, index) => (
                  <p key={index}>
                    <label>{label}:</label> <span>19006091</span>
                  </p>
                ))}
              
     
              
          
         
                <div
                  className="pax-order-related"
                  style={{ height: "200px" }}
                >
                  <div>
                    <label htmlFor="pax-name">
                      Tên người gửi <span className="require">( * )</span>
                    </label>
                    <br />
                    <input
                      name="ctl00$cphMain$ctl00$txtPaxName"
                      type="text"
                      id="cphMain_ctl00_txtPaxName"
                      style={{ padding: "3px 5px" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="pax-phone-number">
                      Số điện thoại <span className="require">( * )</span>
                    </label>
                    <br />
                    <input
                      name="ctl00$cphMain$ctl00$txtPhone"
                      type="text"
                      id="cphMain_ctl00_txtPhone"
                      style={{ padding: "3px 5px" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="pax-email">Email</label>
                    <br />
                    <input
                      name="ctl00$cphMain$ctl00$txtEmail"
                      type="text"
                      id="cphMain_ctl00_txtEmail"
                      style={{ padding: "3px 5px" }}
                    />
                  </div>
                </div>
                <div className="pax-order-related">
                  <div>
                    <label htmlFor="pax-order-related-file">Chứng từ</label>
                    <br />
                    <input
                      type="file"
                      name="ctl00$cphMain$ctl00$fileAttach"
                      id="cphMain_ctl00_fileAttach"
                    />
                  </div>
                  <div>
                    <label htmlFor="pax-order-note">
                      Nội dung gửi <span className="require">( * )</span>
                    </label>
                    <br />
                    <textarea
                      name="ctl00$cphMain$ctl00$txtNoiDung"
                      rows="5"
                      cols="20"
                      id="cphMain_ctl00_txtNoiDung"
                      placeholder="Quý khách vui lòng ghi rõ mã đơn hàng, vd: DH 1234567"
                      style={{ padding: "5px" }}
                    ></textarea>
                  </div>
                </div>
             
              
         
           
              <td colSpan="2">
                <div style={{ textAlign: "center" }}>
                  <input
                    type="submit"
                    name="ctl00$cphMain$ctl00$btnGuiLienHe"
                    value="Gửi nội dung"
                    onClick={handleFileChange}
                    id="cphMain_ctl00_btnGuiLienHe"
                    style={{
                      padding: "10px 5px",
                      borderRadius: "5px",
                      backgroundColor: "orange",
                      color: "white",
                      textAlign: "center",
                      border: "none",
                    }}
                  />
                </div>
              </td>
            
         

      </div>
    </div>
  );
}

export default LienHeMB;
