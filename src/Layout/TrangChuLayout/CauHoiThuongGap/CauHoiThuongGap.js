import React, { useState } from "react";
import "./CauHoiThuongGap.scss";

function CauHoiThuongGap() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="review-faq">
            <div className="saying">
                <a href="/khach-hang-noi-ve-chung-toi" className="CustSay">
                    Khách hàng nói về chúng tôi
                </a>
                <ul>
                    <li>
                        <img
                            src="/MessagesIcon.png"
                            alt="Nhận xét"
                            className="imgReview"
                        />
                        <p>
                            Minh cam abay nhieu luon tao nhieu thuan loi cho khach
                            hang,doi ngu nhan vien tan tinh,chu dao
                            <br />{" "}
                            <span className="nameKH">
                                nham trong thuy - 098360XXXX
                            </span>
                        </p>
                        <div className="clr"></div>
                    </li>
                    <li>
                        <img
                            src="/MessagesIcon.png"
                            alt="Nhận xét"
                            className="imgReview"
                        />
                        <p>
                            Đây là lần đầu tiên mình đặt vé máy bay trực tuyến qua
                            Abay.vn. Đây là 1 hình thức đặt vé và thanh toán cực kỳ
                            thuận tiện và nhanh chón ...
                            <br />{" "}
                            <span className="nameKH">
                                Phạm Văn Đức - 097798XXXX
                            </span>
                        </p>
                        <div className="clr"></div>
                    </li>
                    <li>
                        <img
                            src="/MessagesIcon.png"
                            alt="Nhận xét"
                            className="imgReview"
                        />
                        <p>
                            Đây là lần đầu tiên mình đặt vé máy bay trực tuyến qua
                            Abay.vn. Đây là 1 hình thức đặt vé và thanh toán cực kỳ
                            thuận tiện và nhanh chón ...
                            <br />{" "}
                            <span className="nameKH">
                                Phạm Văn Đức - 097798XXXX
                            </span>
                        </p>
                        <div className="clr"></div>
                    </li>
                    <li>
                        <img
                            src="/MessagesIcon.png"
                            alt="Nhận xét"
                            className="imgReview"
                        />
                        <p>
                            Đây là lần đầu tiên mình đặt vé máy bay trực tuyến qua
                            Abay.vn. Đây là 1 hình thức đặt vé và thanh toán cực kỳ
                            thuận tiện và nhanh chón ...
                            <br />{" "}
                            <span className="nameKH">
                                Phạm Văn Đức - 097798XXXX
                            </span>
                        </p>
                        <div className="clr"></div>
                    </li>
                    <li>
                        <img
                            src="/MessagesIcon.png"
                            alt="Nhận xét"
                            className="imgReview"
                        />
                        <p>
                            Đây là lần đầu tiên mình đặt vé máy bay trực tuyến qua
                            Abay.vn. Đây là 1 hình thức đặt vé và thanh toán cực kỳ
                            thuận tiện và nhanh chón ...
                            <br />{" "}
                            <span className="nameKH">
                                Phạm Văn Đức - 097798XXXX
                            </span>
                        </p>
                        <div className="clr"></div>
                    </li>
                    <li>
                        <img
                            src="/MessagesIcon.png"
                            alt="Nhận xét"
                            className="imgReview"
                        />
                        <p>
                            Đây là lần đầu tiên mình đặt vé máy bay trực tuyến qua
                            Abay.vn. Đây là 1 hình thức đặt vé và thanh toán cực kỳ
                            thuận tiện và nhanh chón ...
                            <br />{" "}
                            <span className="nameKH">
                                Phạm Văn Đức - 097798XXXX
                            </span>
                        </p>
                        <div className="clr"></div>
                    </li>
                  
          
                </ul>
                <a href="/khach-hang-noi-ve-chung-toi" className="Viewmoree">
                    Xem thêm
                </a>
                <div className="clr"></div>
            </div>
            <div className="QuestionU">
                <h4>Câu hỏi thường gặp</h4>
                <ul className="qtQuestion faq-items" style={{listStyle: "none"}}>
                    {[
                        {
                            question:
                                "Khi đi máy bay tôi được mang theo bao nhiêu kg hành lý xách tay?",
                            answer:
                                "Quy định về hành lý xách tay khi đi máy bay\n- Hạng vé Skyboss của VietJet Air bạn sẽ có 10kg hành lý xách tay miễn phí.\n- Hạng vé Business của Bamboo Airways bạn sẽ có 14kg hành lý xách tay miễn phí.\nCác hạng vé còn lại bạn sẽ được mang 7kg hành lý xách tay miễn phí mỗi người.",
                        },
                        {
                            question:
                                "Tôi có được mang theo thịt tươi sống và hải sản theo hành lý lên máy bay không?",
                            answer:
                                "Đối với hành lý là thịt tươi sống và hải sản, bạn cần tuân thủ quy định của hãng hàng không. Vui lòng đọc chi tiết hướng dẫn tại đây.",
                        },
                        {
                            question:
                                "Tôi bị mất chứng minh thư thì có được bay không?",
                            answer:
                                "Bạn bị mất chứng minh thư thì có thể dùng một số loại giấy tờ khác để thay thế như : hộ chiếu, bằng lái xe, giấy xác nhận nhân thân...",
                        },
                        
                    ].map((item, index) => (
                        <li
                            key={index}
                            id={`item-${index}`}
                            className="faq-item"
                        >
                            <h3
                                className="question"
                                onClick={() => toggleAnswer(index)}
                            >
                                ›› {item.question}
                            </h3>
                            {activeIndex === index && (
                                <div className="answer">
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div class="clr"></div>
        </div>
    );
}

export default CauHoiThuongGap;
