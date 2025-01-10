/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { useToast } from '../../components/useToast/ToastContext'
import { CalendarFormat } from '../../components/LunarCalendarFormat/LunarCalendarFormat'
import DatGhe from './DatGhe'

import './ThanhToan.scss'
const ThanhToan = () => {
  const { hoadon,sethoadon } = useToast()
  const [selectedSeat, setSelectedSeat] = useState('')
  const [tiendatghe, settiendatghe] = useState(0)
  const [datghe, setdatghe] = useState(false)

  return (
    <div className='divthanhtoantong'>
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
                      {(hoadon.tongtien + tiendatghe).toLocaleString()}
                    </strong>{' '}
                    <button>Copy</button>
                  </p>
                  <p>
                    Nội dung: {hoadon.mahoadon} {hoadon.tongtien}{' '}
                    <button>Copy</button>
                  </p>
                  <p>Ngân hàng: MBBANK</p>
                  <p>
                    Số TK: 2220198032222 <button>Copy</button>
                  </p>
                </div>
                <div className='qr-code'>
                  <div style={{ fontSize: '11px' }}>
                    Mở App Ngân hàng để quét mã QR
                  </div>
                  <img
                    src={`https://img.vietqr.io/image/MB-2220198032222-compact2.png?amount=${
                      hoadon.tongtien
                    }&addInfo=${`${hoadon.mahoadon} ${hoadon.tongtien}`}&accountName=NGUYEN NGOC CHIEN`}
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
                {hoadon.cityfrom} ➔ {hoadon.cityto}
              </p>
              <div className='divanhhang'>
                <p>{hoadon.chuyenbay}</p>
              </div>
              <p>Anh: {hoadon.namelienhe}</p>

              <p>
                Hành lý: 7kg hành lý xách tay
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
          <DatGhe
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            tiendatghe={tiendatghe}
            settiendatghe={settiendatghe}
            name={hoadon.namelienhe}
            datghe={datghe}
            setdatghe={setdatghe}
            idhoadon={hoadon._id}
            hoadondatghe={hoadon.datghe}
            hoadonghe={hoadon.ghe}
            sethoadon={sethoadon}
            hoadon={hoadon}
          />
        </div>
      </div>
    </div>
  )
}
export default ThanhToan
