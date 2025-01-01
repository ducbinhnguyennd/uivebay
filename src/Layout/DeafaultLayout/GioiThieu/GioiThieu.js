import React from "react";
import "./GioiThieu.scss";

const GioiThieu = () => {
  return (
    <div id="gioithieu">
      <div className="gioi-thieu-title">Về chúng tôi</div>
      <p>
        Đồ Thờ Công Hương là cơ sở sản xuất gỗ thuộc làng nghề Cát Đằng - Yên
        Tiến - Ý Yên - Nam Định. Cơ sở với hàng chục năm kinh nghiệm, sản xuất
        các dòng sản phẩm làm nên thương hiệu như: đồ thờ phong thủy, nội thất,
        mỹ nghệ... được làng bằng các chất liệu gỗ tốt, quý hiếm như: gỗ hương,
        gỗ trắc, gỗ sưa, gỗ Tử Đàn Ấn Độ.
      </p>
      <p>
        Đến với Công Hương với đội ngũ sản xuất có tay nghề cao, nhiều năm hoạt
        động trong ngành, luôn cam kết cho ra các dòng sản phẩm đẹp nhất, phù
        hợp nhất đối với quý khách hàng.
      </p>
      <div className="gioithieu-image">
        <img
          src="https://media.loveitopcdn.com/26706/thumb/1200x1200/tham-khao-ngay-bo-suu-tap-hinh-anh-ban-tho-dep-sang-xin-ban-chay-nhat-3.jpg?zc=1"
          alt=""
          className="image-gt"
        />
        <p className="caption">
          Giới thiệu về xưởng sản xuất đồ thờ Công Hương
        </p>
      </div>
      <p>
        Tất cả sản phẩm của shop làm ra đều xuất phát từ cái TÂM của một người
        con có truyền thống 3 đời làm nghề mỹ nghệ. Với kinh nghiệm và sự uy tín
        của mình, shop Công Hương mong muốn giữ đến những người đam mê đồ gỗ mỹ
        nghệ những sản phẩm hoàn hảo nhất, giá trị nhất về thời gian và tinh
        thần.
      </p>
      <p>
        Đối với công nghệ mỹ nghệ sẽ có vô vàn cách để làm ra 1 sản phẩm mà chỉ
        trong nghìn mẫu thiết kế: Dụng cụ, tạo chất hoàn thiện, PU, kích thước,
        chất liệu gỗ... Đối với nhiều khách hàng không biết rất dễ mua phải hàng
        kém chất lượng. Sản phẩm có giá trị lâu dài và trường tồn được với thời
        gian hay không phụ thuộc rất nhiều vào độ tinh xảo và chất nét trên từng
        sản phẩm cũng như chất liệu.
      </p>
      <p>
        Hiện tại chủ cơ sở là chú Công và em là Đức Bình quản lý. Nếu mọi người
        có bất kỳ thắc mắc gì thì hãy liên hệ trực tiếp với chúng tôi qua số
        điện thoại:
      </p>
      <p>
        <b>0985963784</b> (Anh Công) và <b>0982560805</b> (Chị Hương)
      </p>
      <div className="contact-info">
        <h3>ĐỒ THỜ CÔNG HƯƠNG</h3>
        <p>Địa chỉ: ngã ba Cát Đằng, Yên Tiến, Ý Yên, Nam Định</p>
        <p>
          Fanpage:{" "}
          <a href="https://www.facebook.com/dothoconghuong/" className="gioithieu-red">
            https://www.facebook.com/dothoconghuong/
          </a>
        </p>
      </div>
    </div>
  );
};

export default GioiThieu;
