import React, { useState } from "react";
import "./KhuyenMai.scss";
import SearchSideBar from "../../../components/SideBar/SearchSideBar";
const KhuyenMai = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const newsItems = [
    {
      id: 1,
      date: "31 Tháng 12 năm 2024",
      title:
        "“Mừng năm mới bay cao, chào 2025 rực rỡ” cùng Bamboo Airways – Book ưu đãi ngay thôi!",
      description:
        "Chỉ còn vài tiếng nữa, năm mới 2025 sẽ chính thức bắt đầu, mở ra biết bao háo hức và ước vọng. Thật tuyệt vời khi trong thời điểm thiêng liêng này, bạn có thể chạm tay tới những miền đất mới với nhiều trải nghiệm thú vị và đáng nhớ. Cùng ABAY cập nhật ngay ưu đãi hấp dẫn đang được Bamboo Airways triển khai bạn nhé.",
      link: "/tin-tuc/mung-nam-moi-bay-cao-chao-2025-ruc-ro-cung-bamboo-airways-book-uu-dai-ngay-thoi.aspx",
      imgSrc:
        "https://static2.abay.vn/Images/2024/12/31/uu-dai-tet-bamboo-2025-compressed.jpg",
      imgAlt:
        "“Mừng năm mới bay cao, chào 2025 rực rỡ” cùng Bamboo Airways – Book ưu đãi ngay thôi!",
    },
  ];

  return (
    <div className="khuyenmai-container">
      <div className="khuyenmai">
        <div className="form-paging margin-top-10px">
          <div className="form-paging-top">
            <div className="form-paging-top-left"></div>
            <div className="form-paging-top-bg"></div>
            <div className="form-paging-top-right"></div>
          </div>
          <div className="form-paging-bg">
            <div className="form-paging-bg-top">
              <div className="total-result">
                <p>
                  <b>1000 </b>
                  <span>results</span>
                  <span>
                    (<span>page</span> {currentPage}/{totalPages})
                  </span>
                </p>
              </div>
              <div className="result-paging">
                {currentPage > 1 && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </a>
                )}

                {[...Array(totalPages)]
                  .map((_, index) => index + 1)
                  .filter((page) => {
                    // Chỉ hiển thị các trang liên quan
                    const isFirstOrLastPage = page === 1 || page === totalPages;
                    const isNearbyPage = Math.abs(page - currentPage) <= 1;
                    return isFirstOrLastPage || isNearbyPage;
                  })
                  .map((page, index, filteredPages) => (
                    <>
                      {/* Thêm dấu "..." nếu cần */}
                      {index > 0 && page !== filteredPages[index - 1] + 1}
                      <a
                        key={page}
                        className={`pagingItem ${
                          page === currentPage ? "current-page" : ""
                        }`}
                        data-value={page}
                        href="#"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </a>
                    </>
                  ))}

                {currentPage < totalPages && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1 <= totalPages
                          ? currentPage + 1
                          : currentPage
                      )
                    }
                  >
                    Next
                  </a>
                )}

                {currentPage < totalPages - 1 && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    Last
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="form-paging-bottom">
            <div className="form-paging-bottom-left"></div>
            <div className="form-paging-bottom-bg"></div>
            <div className="form-paging-bottom-right"></div>
          </div>
        </div>

        <div id="listTintuc">
          <ul>
            {newsItems.map((news) => (
              <li key={news.id}>
                <a href={news.link}>
                  <img
                    src={news.imgSrc}
                    width="203"
                    height="124"
                    className="smallImg"
                    alt={news.imgAlt}
                  />
                </a>
                <div className="wrapContentNews">
                  <span className="Newspost">{news.date}</span>
                  <h5 className="titleTintuc">
                    <a href={news.link}>{news.title}</a>
                  </h5>
                  <p className="contentNews">{news.description}</p>
                </div>
                <div className="clr"></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-paging margin-top-10px">
          <div className="form-paging-top">
            <div className="form-paging-top-left"></div>
            <div className="form-paging-top-bg"></div>
            <div className="form-paging-top-right"></div>
          </div>
          <div className="form-paging-bg">
            <div className="form-paging-bg-top">
              <div className="total-result">
                <p>
                  <b>1000 </b>
                  <span>results</span>
                  <span>
                    (<span>page</span> {currentPage}/{totalPages})
                  </span>
                </p>
              </div>
              <div className="result-paging">
                {currentPage > 1 && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </a>
                )}

                {[...Array(totalPages)]
                  .map((_, index) => index + 1)
                  .filter((page) => {
                    const isFirstOrLastPage = page === 1 || page === totalPages;
                    const isNearbyPage = Math.abs(page - currentPage) <= 1;
                    return isFirstOrLastPage || isNearbyPage;
                  })
                  .map((page, index, filteredPages) => (
                    <>
                      {index > 0 && page !== filteredPages[index - 1] + 1 }
                      <a
                        key={page}
                        className={`pagingItem ${
                          page === currentPage ? "current-page" : ""
                        }`}
                        data-value={page}
                        href="#"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </a>
                    </>
                  ))}

                {currentPage < totalPages && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1 <= totalPages
                          ? currentPage + 1
                          : currentPage
                      )
                    }
                  >
                    Next
                  </a>
                )}

                {currentPage < totalPages - 1 && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    Last
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="form-paging-bottom">
            <div className="form-paging-bottom-left"></div>
            <div className="form-paging-bottom-bg"></div>
            <div className="form-paging-bottom-right"></div>
          </div>
        </div>
      </div>
      <div className="khuyenmai-sidebar">
        <SearchSideBar />
      </div>
    </div>
  );
};

export default KhuyenMai;
