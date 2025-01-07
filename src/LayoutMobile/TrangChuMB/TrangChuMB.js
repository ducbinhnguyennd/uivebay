import "./TrangChuMB.scss";
import SearchMB from "../componentsMB/SearchMB/SearchMB";
import { useState } from "react";
function TrangChuMB() {
  const items = [
    {
      href: "/",
      imgSrc: "/pay.png",
      imgAlt: "thanh toán trực tuyến vé máy bay",
      text: "Thanh toán trực tuyến",
    },
    {
      href: "/xem-lai-don-hang",
      imgSrc: "/order.png",
      imgAlt: "xem lại booking vé máy bay giá rẻ đã đặt",
      text: "Xem lại đơn hàng",
    },
    {
      href: "/",
      imgSrc: "/review.png",
      imgAlt: "khách hàng",
      text: "Khách hàng nói về\nChúng tôi",
    },
    {
      href: "/",
      imgSrc: "/faq.png",
      imgAlt: "câu hỏi về cách săn vé máy bay giá rẻ",
      text: "Câu hỏi thường gặp",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="trangchuMB">
      <SearchMB />
      <div class="lydoboxHome">
        <h4>6 lý do đặt vé máy bay tại Abay:</h4>
        <ul>
          <li>Luôn bán đúng giá</li>
          <li>Xuất hóa đơn trong ngày</li>
          <li>Xác nhận đặt vé sau 1 phút</li>
          <li>Phục vụ 24/7 không nghỉ 19006091</li>
          <li>Dịch vụ sau bán hàng chuyên nghiệp</li>
          <li>Cty vé máy bay online đầu tiên, 10 năm kn</li>
        </ul>
      </div>
      <div class="lydoboxHome">
        <li>Vé máy bay giá rẻ tất cả các hãng:</li>
        <li>Vietjet , Vietnam Airlines, BamBoo, Vietravel.</li>
        <li>Hỗ trợ khách hàng từ 0h-24h (không nghỉ),</li>
        <li>kể cả chủ nhật, các ngày lễ tết.</li>
        <li style={{ color: "#333" }}>
          Tổng đài hỗ trợ 0h-24h:{" "}
          {/* <a href="tel:19006091" class="orangered nounderline">
            1900 6091
          </a> */}
        </li>
      </div>
      <div class="div1 boxHome">
        <h4>Chat với chúng tôi</h4>
        <h4>&nbsp;</h4>
        <div>
          <a target="_blank" href="http://m.me/abay.vn">
            <img alt="chat để hỏi giá vé máy bay" src="/messenger.png" />
            <p>Messenger</p>
          </a>
          <a target="_blank" href="http://zalo.me/456531854228413332">
            <img alt="chat zalo để tìm vé máy bay giá rẻ" src="/zalo.png" />
            <p>Zalo</p>
          </a>
          <a target="_blank" href="viber://add?number=%2B84912888753">
            <img
              alt="chat viber để check bảng giá vé máy bay"
              src="/viber.png"
            />
            <p>Viber</p>
          </a>
          <a target="_blank" href="skype:abay.chat1?chat">
            <img alt="chat skype để săn vé máy bay giá rẻ" src="/skype.png" />
            <p>Skype</p>
          </a>
        </div>
      </div>
      <div class="div2 boxHome">
        <div class="rowmb">
          <div class="col11">
            <h4>Liên hệ qua email</h4>
          </div>
          <div class="col11 tcenter">
            <h4>Liên hệ qua tổng đài</h4>
          </div>
        </div>
        <div class="rowmb">
          <div class="col11">
            <a href="mailto:contact@abay.vn" class="nounderline">
              contact@abay.vn
            </a>
          </div>
          <div class="col11 tcenter">
            <h4>1900 6091</h4>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            style={{
              textDecoration: "none",
              flex: "0 1 calc(50% - 8px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.imgSrc}
              alt={item.imgAlt}
              style={{
                width: "48px",
                height: "48px",
                marginBottom: "8px",
              }}
            />
            <div
              style={{
                fontSize: "14px",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              {item.text.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
      <div className="lydoboxHome">
        <h4>Câu hỏi thường gặp !</h4>
        <ul className="qtQuestionmb" style={{ listStyle: "none" }}>
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
              question: "Tôi bị mất chứng minh thư thì có được bay không?",
              answer:
                "Bạn bị mất chứng minh thư thì có thể dùng một số loại giấy tờ khác để thay thế như : hộ chiếu, bằng lái xe, giấy xác nhận nhân thân...",
            },
          ].map((item, index) => (
            <li key={index} id={`item-${index}`} className="faq-item">
              <div style={{  fontSize: "16px" }} onClick={() => toggleAnswer(index)}>{item.question}</div>
              {activeIndex === index && (
                <div>
                  <p style={{
                    color: "blue",
                  }}>{item.answer}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TrangChuMB;
