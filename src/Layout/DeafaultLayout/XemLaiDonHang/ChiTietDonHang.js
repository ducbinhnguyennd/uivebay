import React from 'react'
import { useLocation } from 'react-router-dom'
import './ChiTietDonHang.scss'

const ChiTietDonHang = () => {
  const { state: hoadon } = useLocation()

  if (!hoadon) {
    return <div>Không có dữ liệu hóa đơn!</div>
  }

  return (
    <div className='chitiethoadon'>
      <table border='1'>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã hóa đơn</th>
            <th>Tên người liên hệ</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Ngày bay</th>
            <th>Chuyến bay</th>
            <th>Tổng tiền</th>
            <th>Trạng thái thanh toán</th>
          </tr>
        </thead>
        <tbody>
          {hoadon.length > 0 ? (
            hoadon.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.mahoadon}</td>
                <td>{item.namelienhe}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.ngaybay}</td>
                <td>{item.chuyenbay}</td>
                <td>{item.tongtien.toLocaleString()}</td>
                <td>{item.trangthai}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ChiTietDonHang
