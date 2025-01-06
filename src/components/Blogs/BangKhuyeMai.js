import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPromotion = () => {
  const [news, setNews] = useState([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    fetch('https://webmaybay.vercel.app/getblog/Tin khuyến mại')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="rightColumn">
      <div className="htdv" style={{ border: 'none', width: '300px', boxSizing: 'border-box', position: 'relative', top: '0px' }} id="divTinKhuyenMai">
        <h3>Tin khuyến mại</h3>
        <ul className="news_container">
          {news.length > 0 ? news.map((item) => (
            <li key={item._id}>
                <Link to={`/getkhuyenmai/${item._id}`}><h5 className="news_title">{item.tieude}</h5></Link>
              <div className="news_wrap">
              <img src="https://static2.abay.vn/Images/2024/12/31/uu-dai-tet-bamboo-2025-compressed.jpg" className="news_image" alt={item.tieude} />
                <div className="news_content">Chỉ còn vài tiếng nữa, năm mới 2025 sẽ chính thức bắt đầu, mở ra biết bao háo hức và ước vọng. Thật tuyệt vời khi trong thời điểm thiêng liêng này ...</div>
              </div>
            </li>
          )) : <p>Loading...</p>}
        </ul>
      </div>
    </div>
  );
};

export default NewsPromotion;
