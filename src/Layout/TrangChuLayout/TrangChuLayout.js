import { useState, useEffect } from "react";
import "./TrangChuLayout.scss";
import Loading from "../../components/Loading/Loading";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link,useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

function TrangChuLayout() {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
  const convertToSlug = (str) => {
    const slug = str
      .toLowerCase()
      .normalize("NFD") // Chuyển đổi sang dạng ký tự cơ bản
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu '-'
      .replace(/[^\w\-]+/g, "") // Loại bỏ các ký tự không phải chữ và số
      .replace(/\-\-+/g, "-") // Loại bỏ dấu '-' thừa
      .replace(/^-+/, "") // Loại bỏ dấu '-' ở đầu chuỗi
      .replace(/-+$/, ""); // Loại bỏ dấu '-' ở cuối chuỗi

    // Chuyển chữ cái đầu tiên thành hoa
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div>
      <Helmet>
        <title>{"Đồ Thờ Đồ Gỗ Công Hương - Ý Yên Nam Định"}</title>
        <meta name="description" content={"Đồ Thờ Đồ Gỗ Công Hương tọa lạc tại Ngã 3 Cát Đằng, xã Yên Tiến, huyện Ý Yên, tỉnh Nam Định, nơi nổi tiếng với các sản phẩm đồ thờ và đồ gỗ mỹ nghệ cao cấp. Với truyền thống lâu đời của làng nghề Ý Yên, Nam Định, nơi đây được biết đến như một trung tâm chế tác đồ thờ, đồ gỗ với sự khéo léo, tinh tế trong từng sản phẩm."} />
        <meta name="keywords" content={"Đồ Thờ Công Hương, Làng nghề Cát Đằng, Yên Tiến, Ý Yên, Nam Định, Làm Mộc, Tạc Tượng, Tu Sửa Đình Chùa, Nhà Thờ"} />
      </Helmet>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
         
          
          
        </div>
      )}
    </div>
  );
}

export default TrangChuLayout;
