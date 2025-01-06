/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useToast } from '../../components/useToast/ToastContext'
import { CalendarFormat } from '../../components/LunarCalendarFormat/LunarCalendarFormat'
import { getAirlineImage } from '../SearchLayout/SearchLayoutFunction'

import './ThanhToan.scss'
const ThanhToan = () => {
  const { showToast, hoadon, flightdata, cityfrom, cityto } = useToast()
  const [hangmaybay, sethangmaybay] = useState([])

  const fetchhang = async () => {
    try {
      const response = await fetch('https://webmaybay.vercel.app/gethangmaybay')
      const data = await response.json()
      if (response.ok) {
        sethangmaybay(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchhang()
  }, [])

  const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <div className='accordion'>
        <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
        {isOpen && <div className='accordion-content'>{children}</div>}
      </div>
    )
  }
  return (
    <div>
      <div className='tatcadonhang'>Xem tất cả đơn hàng</div>
      <div className='container-thanhtoan'>
        <div className='thanhtoan'>
          <div className='order-details'>
            <h3>Đơn hàng: {hoadon.mahoadon}</h3>
            <p>Tình trạng: đợi thanh toán</p>
            <div className='support-options'>
              <label>
                <img src='./phone2.png' style={{ marginRight: '5px' }} /> Nếu
                quý khách cần Abay gọi tư vấn thêm?
                <br />
                vui lòng đánh dấu vào ô dưới đây:
              </label>
              <label>
                <input type='checkbox' /> Hãy gọi cho tôi ngay bây giờ
              </label>
            </div>
          </div>
          <div className='payment-methods'>
            <h4>Chọn hình thức thanh toán</h4>
            <div>
              <label>
                <input type='radio' name='payment' /> Chuyển khoản
              </label>
              <div className='bank-details'>
                <div className='bank-info'>
                  <p>Tên TK: CT TNHH vé máy bay trực tuyến Abay</p>
                  <p>
                    Số tiền:{' '}
                    <strong style={{ color: 'red' }}>
                      {hoadon.tongtien.toLocaleString()}
                    </strong>{' '}
                    <button>Copy</button>
                  </p>
                  <p>
                    Nội dung: DH5004690 <button>Copy</button>
                  </p>
                  <p>Ngân hàng: Vietcombank</p>
                  <p>
                    Số TK: 0021000257522 <button>Copy</button>
                  </p>
                </div>
                <div className='qr-code'>
                  <div style={{ fontSize: '11px' }}>
                    Mở App Ngân hàng để quét mã QR
                  </div>
                  <img
                    src='./qrthanhtoan.png'
                    alt=''
                    style={{ width: '200px' }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label>
                <input type='radio' name='payment' /> QR Code
              </label>
            </div>
            <div>
              <label>
                <input type='radio' name='payment' /> ATM Card (thẻ nội địa)
              </label>
            </div>
          </div>
          <div className='flight-details'>
            <div>
              <p>
                {cityfrom} ➔ {cityto}
              </p>
              <div className='divanhhang'>
                <img
                  src={`${getAirlineImage(flightdata.airlineCode, hangmaybay)}`}
                />{' '}
                <p>{hoadon.chuyenbay}</p>
              </div>
              <p>Anh: {hoadon.namenguoibay}</p>

              <p>
                Hành lý:{' '}
                {hoadon.hanhlykygui &&
                  hoadon.hanhlykygui.replace(
                    /Mua (\d+kg).*$/,
                    '$1 hành lý ký gửi'
                  )}
              </p>
            </div>
            <div>
              {CalendarFormat(hoadon.ngaybay)} <br /> {hoadon.hourfrom} -{' '}
              {hoadon.hourto}
            </div>
          </div>
        </div>
        <div className='faq-hdtt'>
          <Accordion title='Hướng dẫn upload chứng từ'>
            <p>
              Trong trường hợp việc cập nhật tình trạng thanh toán có thể bị
              trễ, Quý khách vui lòng sử dụng tiện ích này để xác nhận việc đã
              thanh toán cho Abay.
            </p>
          </Accordion>
          <Accordion title='Nhập thẻ hội viên Bông sen vàng'>
            <p>
              Nếu quý khách đã có thẻ BSV, vui lòng click vào "Tiếp tục" để nhập
              số thẻ Tiếp tục Quý khách chưa có thẻ BSV? xem hướng dẫn
            </p>
          </Accordion>
          <Accordion title='Gửi yêu cầu thay đổi vé'>
            <p>
              Điều kiện vé (xem chi tiết)
              <br />
              - Áp dụng hoàn vé mất phí - Không áp dụng đổi tên - Áp dụng đổi vé
              mất phí
              <br />
              Quý khách cần đổi ngày, giờ bay, đổi tên, đổi hành trình,...
              <br />
              vui lòng gửi yêu cầu tại đây (click)
            </p>
          </Accordion>
          <Accordion title='Gửi yêu cầu hoàn vé'>
            <p>Nội dung hoàn vé...</p>
          </Accordion>
          <Accordion title='Gửi yêu cầu xuất hóa đơn VAT'>
            <p>Nội dung hóa đơn...</p>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default ThanhToan
