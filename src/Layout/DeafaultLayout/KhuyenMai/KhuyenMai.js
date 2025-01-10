import React, { useState, useEffect } from "react";
import "./KhuyenMai.scss";
import SearchSideBar from "../../../components/SideBar/SearchSideBar";
import axios from "axios";
import { Link } from "react-router-dom";

const KhuyenMai = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const BLOGS_PER_PAGE = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://webmaybay.vercel.app/getblog/Tin khuyến mại`
        );
        const fetchedBlogs = response.data;

        setBlogs(fetchedBlogs);
        setTotalPages(Math.ceil(fetchedBlogs.length / BLOGS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                  <b>{blogs.length} </b>
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
                    <React.Fragment key={page}>
                      {index > 0 &&
                        page !== filteredPages[index - 1] + 1 && (
                          <span>...</span>
                        )}
                      <a
                        className={`pagingItem ${
                          page === currentPage ? "current-page" : ""
                        }`}
                        href="#"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </a>
                    </React.Fragment>
                  ))}

                {currentPage < totalPages && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
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
            {paginatedBlogs.map((news) => (
              <li key={news._id}>
                <Link to={`/getkhuyenmai/${news._id}`}>
                
               
                  <img
                    src={"https://static2.abay.vn/Images/2024/12/31/uu-dai-tet-bamboo-2025-compressed.jpg"}
                    width="203"
                    height="124"
                    className="smallImg"
                    alt={news.tieude}
                  />
                
                <div className="wrapContentNews">
                  <span className="Newspost">{news.date}</span>
                  <h5 className="titleTintuc">
                    <a href={news.link || "#"}>{news.tieude}</a>
                  </h5>
                  <p className="contentNews">{news.descripton}</p>
                </div>
                <div className="clr"></div>
                 
                </Link>
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
                  <b>{blogs.length} </b>
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
                    <React.Fragment key={page}>
                      {index > 0 &&
                        page !== filteredPages[index - 1] + 1 && (
                          <span>...</span>
                        )}
                      <a
                        className={`pagingItem ${
                          page === currentPage ? "current-page" : ""
                        }`}
                        href="#"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </a>
                    </React.Fragment>
                  ))}

                {currentPage < totalPages && (
                  <a
                    className="pagingItem"
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
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
