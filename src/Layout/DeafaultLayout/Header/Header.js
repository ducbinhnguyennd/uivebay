import React, { useState } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchKeyword.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchKeyword)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (

    <div id="header">
      <a href="/" class="logo" title="Ve may bay, dai ly ve may bay abay">
      <i>Vé máy bay giá rẻ Phục vụ 24/7</i>
      </a>
      <div class="dienthoai"><div class="cskhTrangchu">
        <img src="/tong-dai-24h-18dec18.png" class="imgtongdai" alt="Dịch vụ chăm sóc khách hàng Abay"/> 
        <span class="contentTextcskhTrangchu"><p class="title">Tổng đài hỗ trợ: <b class="mainNumber"></b></p><p class="message">Giờ làm việc: <b style={{fontWeight:"bold"}}>0h-24h</b> (không nghỉ)</p></span></div></div>
        <div class="clr"></div>
        </div>
  );
};

export default Header;
