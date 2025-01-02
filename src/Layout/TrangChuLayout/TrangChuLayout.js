import { useState, useEffect } from "react";
import "./TrangChuLayout.scss";
import Loading from "../../components/Loading/Loading";
import { Link, useLocation } from "react-router-dom";
import FlightBookingForm from "../../components/FlyBookingForm/FlyBookingForm";
import HinhThuc from "./HinhThuc/HinhThuc";
import CauHoiThuongGap from "./CauHoiThuongGap/CauHoiThuongGap";
function TrangChuLayout() {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchdata = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://baominh.shop/sanpham");
      const data = await response.json();
      if (response.ok) {
        setdata(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
          <div className="working-hours-container">
            <div className="icon-container">
              <img
                src="/10h20icon-18dec18.png"
                alt="clock icon"
                className="icon"
              />
            </div>
            <div className="text-container">
              <p className="working-hours-text">
                <span className="highlight">Giờ làm việc:</span> từ 0h-24h, liên
                tục không nghỉ, kể cả chủ nhật, các ngày lễ tết
              </p>
              <p className="contact-text">
                Quý khách có bất kì thắc mắc hoặc cần trợ giúp, vui lòng gọi
                tổng đài <span className="highlight">1900 6091</span>
              </p>
            </div>
          </div>
          <FlightBookingForm />
          
          <HinhThuc/>

          <CauHoiThuongGap/>
         
        </div>
      )}
    </div>
  );
}

export default TrangChuLayout;
