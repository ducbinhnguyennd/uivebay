/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import ModalBig from '../../../../components/ModalBig/ModalBig'
import './ChiTietHoaDon.scss'

function ChitiethoadonAdmin ({ isOpen, onClose, idhoadon }) {
  const [data, setData] = useState(null)

  const fetchHoadon = async () => {
    try {
      const response = await fetch(
        `http://localhost:3013/getchitiethoadon/${idhoadon}`
      )
      const result = await response.json()
      if (response.ok) {
        setData(result)
      } else {
        console.log('Đã xảy ra lỗi')
      }
    } catch (error) {
      console.error('Lỗi:', error)
    }
  }

  useEffect(() => {
    if (idhoadon) {
      fetchHoadon()
    }
  }, [idhoadon])

  if (!isOpen) return null


  return (
    <ModalBig isOpen={isOpen} onClose={onClose}>
      <div className='modal-contentHoadon'>
        <h2>Chi Tiết Hóa Đơn</h2>
        {data ? (
          <div className='hoadon-details'>
            <div className='hoadon-section'>
              <h3>Thông Tin Chung</h3>
              <p>
                <strong>Mã Hóa Đơn:</strong> {data.mahoadon}
              </p>
              <p>
                <strong>Người Liên Hệ:</strong> {data.namelienhe}
              </p>
              <p>
                <strong>Điện Thoại:</strong> {data.phone}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Ngày Tạo:</strong> {data.ngaytao}
              </p>
            </div>

            <div className='hoadon-section'>
              <h3>Chi Tiết Chuyến Bay</h3>
              <p>
                <strong>Hãng:</strong> {data.hang}
              </p>
              <p>
                <strong>Điểm Đi:</strong> {data.cityfrom}
              </p>
              <p>
                <strong>Điểm Đến:</strong> {data.cityto}
              </p>
              <p>
                <strong>Giờ Bay:</strong> {data.hourfrom} - {data.hourto}
              </p>
              {data.ngayve && (
                <>
                  <p>
                    <strong>Ngày Về:</strong> {data.ngayve}
                  </p>
                  <p>
                    <strong>Giờ Bay Về:</strong> {data.hourvefrom} -{' '}
                    {data.hourveto}
                  </p>
                </>
              )}
            </div>

            <div className='hoadon-section'>
              <h3>Hành Khách</h3>
              {data.khachbay.length > 0 ? (
                <table className='khachbay-table'>
                  <thead>
                    <tr>
                      <th>Tên Hành Khách</th>
                      <th>Đối Tượng</th>
                      <th>Hành Lý Ký Gửi</th>
                      <th>Giá Ký Gửi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.khachbay.map((khach, index) => (
                      <tr key={index}>
                        <td>{khach.namebay}</td>
                        <td>{khach.doituong}</td>
                        <td>
                          {khach.kygui ? `${khach.hanhlykygui}` : 'Không'}
                        </td>
                        <td>
                          {khach.pricekygui
                            ? khach.pricekygui.toLocaleString('vi-VN')
                            : '0'}{' '}
                          VND
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Không có hành khách.</p>
              )}
            </div>

            <div className='hoadon-section'>
              <h3>Chi Phí</h3>
              <p>
                <strong>Tiền Vé:</strong> {data.tienve.toLocaleString('vi-VN')}{' '}
                VND
              </p>
              {data.tienveve && (
                <p>
                  <strong>Tiền Vé Về:</strong>{' '}
                  {data.tienveve.toLocaleString('vi-VN')} VND
                </p>
              )}
              {data.datghe && (
                <>
                  <p>
                    <strong>Ghế đặt:</strong>{' '}
                    {data.ghe.toLocaleString('vi-VN')}
                  </p>

                  <p>
                    <strong>Tiền Đặt Ghế:</strong>{' '}
                    {data.tiendatghe.toLocaleString('vi-VN')} VND
                  </p>
                </>
              )}
              <p>
                <strong>Tổng Tiền:</strong>{' '}
                {data.tongtien.toLocaleString('vi-VN')} VND
              </p>
            </div>

            {data.ghichu && (
              <div className='hoadon-section'>
                <h3>Ghi Chú</h3>
                <p>{data.ghichu}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
    </ModalBig>
  )
}

export default ChitiethoadonAdmin
