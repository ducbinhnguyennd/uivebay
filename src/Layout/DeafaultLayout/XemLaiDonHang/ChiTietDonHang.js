import React from 'react'
import { useLocation } from 'react-router-dom'
import './ChiTietDonHang.scss'
import { formatDate } from '../../../components/LunarCalendarFormat/LunarCalendarFormat'
import { useToast } from '../../../components/useToast/ToastContext'
import { useNavigate } from 'react-router-dom'

const ChiTietDonHang = () => {
  const { state: hoadon } = useLocation()
  const { sethoadon } = useToast()
  const navigate = useNavigate()

  if (!hoadon) {
    return <div>không có dữ liệu</div>
  }
  const handleRowClick = item => {
    if (item.trangthai === 'Chờ thanh toán') {
      sethoadon(item)
      navigate('/thanhtoan')
    }
  }

  return (
    <div className='chitiethoadon'>
      <h3>Hóa đơn chi tiết</h3>
       <div className="table-container">
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
              <tr key={item._id} onClick={() => handleRowClick(item)}>
                <td data-label='STT'>{index + 1}</td>
                <td data-label='Mã hóa đơn'>{item.mahoadon}</td>
                <td data-label='Tên người liên hệ'>{item.namelienhe}</td>
                <td data-label='Số điện thoại'>{item.phone}</td>
                <td data-label='Email'>{item.email}</td>
                <td data-label='Ngày bay'>{formatDate(item.ngaybay)}</td>
                <td data-label='Chuyến bay'>{item.chuyenbay}</td>
                <td data-label='Tổng tiền'>{item.tongtien.toLocaleString()}</td>
                <td data-label='Trạng thái thanh toán'>{item.trangthai}</td>
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
    </div>
  )
}

export default ChiTietDonHang
