import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetail.scss';
import FlightBookingForm from '../FlyBookingForm/FlyBookingForm';
import NewsPromotion from './BangKhuyeMai';

const BlogDetail = () => {
  const { idblog } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`https://webmaybay.vercel.app/getchitietblog/${idblog}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết blog:', error);
      }
    };

    fetchBlogDetail();
  }, [idblog]);

  if (!blog) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="blog-detail">
        <FlightBookingForm />
      <div className='blog-container'>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.noidung }}
      ></div>
      <div>
        <NewsPromotion/>
      </div>
      </div>
    </div>
  );
};

export default BlogDetail;
