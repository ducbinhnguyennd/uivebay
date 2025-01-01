import React, { useEffect } from "react";
import "./LienHe.scss";
import { Helmet } from "react-helmet";

const LienHe = () => {
    
    return (
        
        <div id="lienHe">
            <Helmet>
        <title>{"Liên Hệ - Đồ Thờ Đồ Gỗ Công Hương"}</title>
        <meta name="description" content={"Đồ Thờ Công Hương luôn sẵn sàng lắng nghe và hỗ trợ bạn! Nếu bạn có bất kỳ câu hỏi, yêu cầu hoặc cần tư vấn về các sản phẩm đồ thờ và đồ gỗ mỹ nghệ, hãy liên hệ ngay. Đội ngũ của chúng tôi cam kết mang đến cho bạn dịch vụ tốt nhất. 📍 Địa chỉ: Ngã 3 Cát Đằng, Yên Tiến, Ý Yên, Nam Định 📞 Hotline: 0985963784"} />
        <meta name="keywords" content={"Đồ Thờ Công Hương, Làng nghề Cát Đằng, Yên Tiến, Ý Yên, Nam Định, Làm Mộc, Tạc Tượng, Tu Sửa Đình Chùa, Nhà Thờ"} />
      </Helmet>
            <div className="lienhe-title">Liên hệ</div>
            <div className="contact-info">
                <div id="name-contact">
                    Cơ sở sản xuất đồ thờ - đồ gỗ <span className="red">Đồ thờ Công Hương</span>
                </div>

                <p className="description">
                    Địa chỉ: <br />
                    <a href="https://maps.app.goo.gl/z3xmqsCTZzZCacS4A"
            target="_blank"
            rel="noopener noreferrer" className="address-lienhe">
            Cơ sở 1: Ngã 3 Cát Đằng, Xã Yên Tiến, Huyện Ý Yên, Tỉnh Nam Định
          </a>
          <br />
                    <a href="https://maps.app.goo.gl/KZkD3xqo1Mgpsypt8"
                        target="_blank"
                        rel="noopener noreferrer" className="address-lienhe">
                        Cơ sở 2: Ngã 3 Cát Đằng đi về hướng Ninh Bình 300m, Xã Yên Tiến, Huyên Ý Yên, Tỉnh Nam Định
                    </a>
                </p>
                <p className="description">
                    Hotline: <span className="red">0985.963.784 - 0982.560.805</span>
                </p>
                <p className="description">
                    Tên chủ cơ sở: <span className="bold">Anh Công</span>
                </p>
                <p className="description">
                    Fanpage:{" "}
                    <a
                        href="https://www.facebook.com/dothoconghuong/"
                        className="red">
                        https://www.facebook.com/dothoconghuong/
                    </a>
                </p>
                <p className="description">
                    Email: <span className="red">ducbinhnguyennd@gmail.com</span>
                </p>
            </div>
        </div>
    );
};

export default LienHe;
