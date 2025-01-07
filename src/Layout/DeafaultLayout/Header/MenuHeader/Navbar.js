import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menus, setMenus] = useState({
    veNoiDia: [],
    veQuocTe: [],
    veTheoHang: []
  })

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [noiDia, quocTe, theoHang] = await Promise.all([
          fetch('https://demovemaybay.shop/getblog/Vé nội địa').then(res =>
            res.json()
          ),
          fetch('https://demovemaybay.shop/getblog/Vé quốc tế').then(res =>
            res.json()
          ),
          fetch('https://demovemaybay.shop/getblog/Vé theo hãng').then(res =>
            res.json()
          )
        ])
        setMenus({
          veNoiDia: noiDia,
          veQuocTe: quocTe,
          veTheoHang: theoHang
        })
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu menu:', error)
      }
    }

    fetchMenus()
  }, [])

  return (
    <div className='navbar'>
      <ul className='navbar-menu'>
        <li className='homeIco2'>
          <a className='nonedoted homeIco2' href='/'>
            <img
              src='/homeIcon.png'
              alt='Vé máy bay Abay - Trang chủ'
              className='homeIcon'
            />
          </a>
        </li>
        <li>
          <a href='/'>Trang chủ</a>
        </li>
        <li className='dropdown'>
          <a href='/ve-noi-dia' className='dropdown-toggle'>
            Vé nội địa
          </a>
          <ul className='dropdown-menu'>
            {menus.veNoiDia.map(item => (
              <li key={item._id}>
                <Link to={`/getchitietblog/${item._id}`}>{item.tieude}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className='dropdown'>
          <a href='/ve-quoc-te' className='dropdown-toggle'>
            Vé quốc tế
          </a>
          <ul className='dropdown-menu'>
            {menus.veQuocTe.map(item => (
              <li key={item._id}>
                <Link to={`/getchitietblog/${item._id}`}>{item.tieude}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className='dropdown'>
          <a href='#' className='dropdown-toggle'>
            Vé theo hãng
          </a>
          <ul className='dropdown-menu'>
            {menus.veTheoHang.map(item => (
              <li key={item._id}>
                <Link to={`/getchitietblog/${item._id}`}>{item.tieude}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <a href='/xem-lai-don-hang'>Xem lại đơn hàng</a>
        </li>
        <li>
          <a href='/tien-ich'>Tiện ích</a>
        </li>
        <li>
          <a href='/tin-khuyen-mai'>Tin khuyến mãi</a>
        </li>
        <li>
          <a href='/gioi-thieu'>Giới thiệu</a>
        </li>
        <li>
          <a href='/lien-he'>Liên hệ</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
