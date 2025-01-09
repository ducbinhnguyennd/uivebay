/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DatVe.scss'
import { useToast } from '../../components/useToast/ToastContext'
import {
  getAirlineName,
  calculateDuration
} from '../SearchLayout/SearchLayoutFunction'
import { CalendarFormat } from '../../components/LunarCalendarFormat/LunarCalendarFormat'

function ThongTinDatVeQT () {
  const [isRemarkChecked, setIsRemarkChecked] = useState(false)
  const [hangmaybay, sethangmaybay] = useState([])
  const [namelienhe, setnamelienhe] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')

  const [xuathoadon, setxuathoadon] = useState(false)
  const [masothue, setmasothue] = useState('')
  const [tencongty, settencongty] = useState('')
  const [diachi, setdiachi] = useState('')
  const [ghichu, setghichu] = useState('')
  const [themkhach, setthemkhach] = useState(false)
  const [valuethemkhach, setvaluethemkhach] = useState('')
  const [sokhachthem, setsokhachthem] = useState(0)
  const [phantrams, setphantram] = useState([])

  const navigate = useNavigate()

  const handleInvoiceChange = () => setxuathoadon(!xuathoadon)
  const handleRemarkChange = () => setIsRemarkChecked(!isRemarkChecked)
  const {
    flightdata,
    date,
    mafrom,
    mato,
    tienve,
    mangnguoi,
    showToast,
    sethoadon,
    settienve,
    cityto,
    cityfrom,
    setmangnguoi
  } = useToast()

  const initialKhachhangs = mangnguoi.flatMap(nguoi =>
    Array.from({ length: nguoi.songuoi }, () => ({
      namebay: '',
      doituong: nguoi.name,
      kygui: false,
      hanhlykygui: '',
      pricekygui: 0
    }))
  )

  const [khachhangs, setkhachhangs] = useState(initialKhachhangs)
  const tongSoNguoi = mangnguoi.reduce(
    (total, nguoi) => total + nguoi.songuoi,
    0
  )
  const tongPriceKygui = khachhangs.reduce(
    (total, khach) => total + khach.pricekygui,
    0
  )

  const getFlatIndex = (index, idx) =>
    mangnguoi.slice(0, index).reduce((acc, nguoi) => acc + nguoi.songuoi, 0) +
    idx

    const handleAddGuests = numberOfGuests => {
  setmangnguoi(prev => [
    ...prev,
    { songuoi: numberOfGuests, name: 'Người lớn' }
  ])

  setkhachhangs(prev => [
    ...prev,
    ...Array.from({ length: numberOfGuests }, () => ({
      namebay: '',
      doituong: '',
      kygui: false,
      hanhlykygui: '',
      pricekygui: 0
    }))
  ])
}

const handleValueChange = e => {
  const selectedValue = e.target.value
  const match = selectedValue.match(/\d+/)
  const numberOfGuests = match ? parseInt(match[0], 10) : 0

  if (numberOfGuests > 0) {
    handleAddGuests(numberOfGuests)
  }
}


  const fetchhang = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/gethangmaybay')
      const data = await response.json()
      if (response.ok) {
        sethangmaybay(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchphantram = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getphantram')
      const data = await response.json()
      if (response.ok) {
        setphantram(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchhang()
    fetchphantram()
  }, [phantrams, hangmaybay])

  useEffect(() => {
    if (
      !flightdata ||
      !flightdata.totalPrice ||
      !phantrams ||
      phantrams.length === 0
    )
      return

    const totalPrice2 = mangnguoi.reduce((total, item) => {
      const pricePerTicket =
        flightdata.totalPrice -
        (flightdata.totalPrice * phantrams[0].phantram) / 100

      const taxAndFee = (pricePerTicket * 30) / 100
      return total + pricePerTicket * item.songuoi + taxAndFee * item.songuoi
    }, 0)

    settienve(totalPrice2)
  }, [flightdata, mangnguoi, phantrams])

  const validate = () => {
    let valid = true
    if (phone) {
      valid = true
    } else {
      valid = false
      showToast('Vui lòng nhập số điện thoại', 'warning')
    }
    if (email) {
      valid = true
    } else {
      valid = false
      showToast('Vui lòng nhập email', 'warning')
    }
    if (xuathoadon) {
      if (masothue) {
        valid = true
      } else {
        valid = false
        showToast('Vui lòng nhập mả số thuế', 'warning')
      }
      if (tencongty) {
        valid = true
      } else {
        valid = false
        showToast('Vui lòng nhập tên công ty', 'warning')
      }
      if (diachi) {
        valid = true
      } else {
        valid = false
        showToast('Vui lòng nhập địa chỉ', 'warning')
      }
    }
    if (isRemarkChecked) {
      if (ghichu) {
        valid = true
      } else {
        valid = false
        showToast('Vui lòng nhập ghi chú', 'warning')
      }
    }
    return valid
  }

  const handledatve = async () => {
    if (!validate()) {
      return
    }
    try {
      const response = await fetch('https://demovemaybay.shop/posthoadon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          namelienhe,
          phone,
          email,
          ngaybay: date,
          cityfrom: mafrom,
          cityto: mato,
          hourfrom: flightdata.outbound.departureTime,
          hourto: flightdata.outbound.arrivalTime,
          xuathoadon,
          masothue,
          tencongty,
          diachi,
          ghichu,
          tienve,
          khachhangs
        })
      })
      if (response.ok) {
        const data = await response.json()
        sethoadon(data)
        navigate('/thanhtoan')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div id='main-datve'>
      <table id='tbl-passenger'>
        <tbody>
          <tr>
            <td class='ctr-passenger1'>
              <table className='flight-page'>
                <tbody>
                  <tr>
                    <td className='col-left'>
                      <table>
                        <tbody>
                          <tr>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginRight: '40px'
                              }}
                            >
                              <span>
                                <span className='bold'>{cityfrom}</span>
                                {`(${mafrom})`}
                              </span>
                              <img
                                src='/arrow-right-black.png'
                                style={{ width: '11px', padding: 0 }}
                                alt='arrow-right'
                              />
                              <span>
                                <span className='bold'>{cityto}</span>
                                {`(${mato})`}
                              </span>
                            </div>
                            <td
                              style={{
                                textAlign: 'right',
                                width: '1%',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <span className='txtFlightDate bold'>
                                {CalendarFormat(date)}
                              </span>
                            </td>
                            <td style={{ paddingRight: '40px' }}></td>
                          </tr>
                          <tr>
                            <td>
                              <span
                                style={{
                                  verticalAlign: 'baseline',
                                  display: 'inline-block',
                                  paddingRight: '20px',
                                  float: 'right'
                                }}
                              >
                                {calculateDuration(
                                  flightdata.outbound.departureTime,
                                  flightdata.outbound.arrivalTime
                                )}
                              </span>
                            </td>
                            <td
                              style={{
                                textAlign: 'right',
                                width: '1%',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <span className='bold'>
                                {flightdata.outbound.departureTime}
                              </span>{' '}
                              - <span>{flightdata.outbound.arrivalTime}</span>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td
                              colSpan='2'
                              style={{
                                color: 'orangered',
                                fontSize: '0.9em',
                                textAlign: 'center'
                              }}
                            ></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className='col-right'>
                      <table id='tbl-breakdown'>
                        <tbody>
                          <tr>
                            <td>
                              <table className='tbl-price'>
                                <tbody>
                                  <tr id='cphMainColumn_ctl00_usrPriceD_trAdt'>
                                    <td className='col-title'>Tiền vé </td>
                                    <td className='col-calculator'>
                                      &nbsp;
                                      x {tongSoNguoi}
                                    </td>
                                    <td className='col-equal'>=</td>
                                    <td className='col-price'>
                                      {tienve.toLocaleString()}
                                      <span className='currency'>đ</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table className='tbl-baggage'>
                                <tbody>
                                  <tr>
                                    <td className='col-title'>Hành lý</td>
                                    <td className='col-calculator'></td>
                                    <td className='col-equal'>=</td>
                                    <td className='col-price'>
                                      <span className='p-baggage'>
                                        {tongPriceKygui.toLocaleString()}
                                      </span>{' '}
                                      <span className='currency'>đ</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table className='tbl-price'>
                                <tbody>
                                  <tr>
                                    <td>Tổng giá vé = </td>
                                    <td
                                      colSpan='2'
                                      className='total-price'
                                      style={{ color: '#e84e0f' }}
                                    >
                                      <span className='t-price'>
                                        {(
                                          tienve + tongPriceKygui
                                        ).toLocaleString()}
                                      </span>{' '}
                                      <span className='currency'>đ</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='2'>
                      <table
                        style={{ width: '100%' }}
                        className='noteflightinfo pt20'
                      >
                        <tbody>
                          <tr>
                            <td>{mafrom}</td>
                          </tr>
                          <tr>
                            <td>{mato}</td>
                          </tr>
                          <tr>
                            <td style={{ whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'inline-block' }}>Máy Bay:</div>
                              <div
                                style={{
                                  display: 'inline-block',
                                  fontWeight: 'bold',
                                  marginRight: '10px'
                                }}
                              >
                                &nbsp;(Airbus A321)
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan='2' className='ctr-passenger'>
              <table className='passenger-page'>
                <tbody>
                  <tr>
                    <td className='col-left'>
                      <p className='title'>
                        Họ và tên người bay{' '}
                        <span
                          style={{
                            textTransform: 'none',
                            fontWeight: 'normal'
                          }}
                        >
                          (vd: Nguyen Van An)
                        </span>
                      </p>
                    </td>
                    <td className='col-right'>
                      <p className='title'>Hành lý ký gửi</p>
                    </td>
                  </tr>
                  {mangnguoi.map((nguoi, index) =>
                    Array.from({ length: nguoi.songuoi }).map((_, idx) => (
                      <tr key={`${index}-${idx}`}>
                        <td
                          className='col-left'
                          style={{ verticalAlign: 'top' }}
                        >
                          <table className='passenger-info'>
                            <tbody>
                              <tr>
                                <td style={{ paddingTop: '4px' }}>
                                  <select
                                    name='ctl00e'
                                    id={`passenger_title_${index}_${idx}`}
                                    style={{ width: '96px' }}
                                    value={
                                      khachhangs[getFlatIndex(index, idx)]
                                        ?.doituong || ''
                                    }
                                    onChange={e => {
                                      const updatedValue = e.target.value
                                      setkhachhangs(prev => {
                                        const newKhachhangs = [...prev]
                                        newKhachhangs[
                                          getFlatIndex(index, idx)
                                        ].doituong = updatedValue
                                        return newKhachhangs
                                      })
                                    }}
                                  >
                                    <option value='Người lớn'>Người lớn</option>
                                    <option value='Trẻ em'>Trẻ em</option>
                                    <option value='Trẻ sơ sinh'>
                                      Trẻ sơ sinh
                                    </option>
                                  </select>
                                </td>
                                <td
                                  colSpan='2'
                                  style={{
                                    paddingLeft: '4px',
                                    paddingTop: '4px'
                                  }}
                                >
                                  <input
                                    type='text'
                                    maxLength='100'
                                    className='letterOnly i-require new LastNamePassengerFlight passenger-name'
                                    placeholder={`Họ và tên người bay`}
                                    value={
                                      khachhangs[getFlatIndex(index, idx)]
                                        ?.namebay || ''
                                    }
                                    onChange={e => {
                                      const updatedValue = e.target.value
                                      setkhachhangs(prev => {
                                        const newKhachhangs = [...prev]
                                        newKhachhangs[
                                          getFlatIndex(index, idx)
                                        ].namebay = updatedValue
                                        return newKhachhangs
                                      })
                                    }}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td
                          className='col-right'
                          style={{ verticalAlign: 'top' }}
                        >
                          <div className='baggage-container'>
                            <select
                              className='cbo-baggage out-baggage'
                              value={
                                khachhangs[getFlatIndex(index, idx)]
                                  ?.hanhlykygui || 'Mua thêm ký gửi'
                              }
                              onChange={e => {
                                const selectedOption = e.target.value
                                const match = selectedOption.match(
                                  /(\d+)kg\s-\s([\d,.]+)/
                                )
                                setkhachhangs(prev => {
                                  const newKhachhangs = [...prev]
                                  const flatIndex = getFlatIndex(index, idx)

                                  if (!newKhachhangs[flatIndex]) {
                                    newKhachhangs[flatIndex] = {}
                                  }

                                  if (match) {
                                    const price = parseInt(
                                      match[2].replaceAll(',', ''),
                                      10
                                    )
                                    newKhachhangs[flatIndex].kygui = true
                                    newKhachhangs[flatIndex].hanhlykygui =
                                      selectedOption
                                    newKhachhangs[flatIndex].pricekygui = price
                                  } else {
                                    newKhachhangs[flatIndex].kygui = false
                                    newKhachhangs[flatIndex].hanhlykygui =
                                      'Mua thêm ký gửi'
                                    newKhachhangs[flatIndex].pricekygui = 0
                                  }

                                  return newKhachhangs
                                })
                              }}
                            >
                              <option value='Mua thêm ký gửi'>
                                Mua thêm ký gửi
                              </option>
                              <option value='Mua 20kg - 266,000 đ'>
                                Mua 20kg - 266,000 đ
                              </option>
                              <option value='Mua 30kg - 374,000 đ'>
                                Mua 30kg - 374,000 đ
                              </option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                  <tr>
                    <td
                      className='col-left'
                      style={{ paddingTop: '20px', paddingLeft: '4px' }}
                    >
                      <div className='KetquaItem noneMargin_borderTop baggage-info'>
                        <p className='baggageText title-baggage-a'></p>
                        <div
                          style={{
                            backgroundColor: 'lightyellow',
                            padding: '5px',
                            borderRadius: '5px',
                            maxWidth: '300px',
                            display: 'none'
                          }}
                          className='no-baggage-out'
                        >
                          Giá vé chưa bao gồm hành lý ký gửi.
                          <br />
                          Mua hành lý bây giờ, hoặc có thể mua sau.
                        </div>
                      </div>
                    </td>
                    <td className='col-right' style={{ paddingTop: '10px' }}>
                      <div>
                        <select
                          name='ctl00$cphMainColumn$ctl00$usrPassengerInfoD$cboAddOrRemovePax'
                          id='cphMainColumn_ctl00_usrPassengerInfoD_cboAddOrRemovePax'
                          value={valuethemkhach}
                          onChange={handleValueChange}
                        >
                          <option selected value=''>
                            Thêm khách
                          </option>
                          <option value='Thêm 1 khách'>Thêm 1 khách</option>
                          <option value='Thêm 2 khách'>Thêm 2 khách</option>
                          <option value='Thêm 3 khách'>Thêm 3 khách</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              colspan='2'
              style={{ verticalAlign: 'top' }}
              className='ctr-contact'
            >
              <table className='passenger-page contact-page'>
                <tbody>
                  <tr>
                    <td className='col-left'>
                      <p className='title'>Thông tin liên hệ</p>
                    </td>
                    <td className='col-right'></td>
                  </tr>
                  <tr>
                    <td className='col-left'>
                      <table className='contact-info'>
                        <tbody>
                          <tr>
                            <td style={{ width: '96px' }}>Tên liên hệ</td>
                            <td>
                              <input
                                name='ctl00$cphMainColumn$ctl00$usrContactInfoD$txtFullName'
                                type='text'
                                maxlength='50'
                                id='cphMainColumn_ctl00_usrContactInfoD_txtFullName'
                                className='name-contact'
                                value={namelienhe}
                                onChange={e => setnamelienhe(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Điện thoại{' '}
                              <span
                                className='required'
                                style={{ color: '#F00' }}
                              >
                                *
                              </span>
                            </td>
                            <td>
                              <input
                                name='ctl00$cphMainColumn$ctl00$usrContactInfoD$txtMobilePhone'
                                type='text'
                                maxlength='20'
                                id='cphMainColumn_ctl00_usrContactInfoD_txtMobilePhone'
                                className='phone-contact'
                                value={phone}
                                onChange={e => setphone(e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className='col-right'>
                      <table className='contact-info'>
                        <tbody>
                          <tr>
                            <td>
                              <span id='cphMainColumn_ctl00_usrContactInfoD_lblEmail'>
                                Email
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                name='ctl00$cphMainColumn$ctl00$usrContactInfoD$txtEmailContact'
                                type='text'
                                maxlength='100'
                                id='cphMainColumn_ctl00_usrContactInfoD_txtEmailContact'
                                className='mail-contact'
                                value={email}
                                onChange={e => setemail(e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan='2'
                      className='invoice'
                      style={{ paddingTop: '10px' }}
                    >
                      <input
                        id='cphMainColumn_ctl00_usrContactInfoD_chkIsInvoice'
                        type='checkbox'
                        name='ctl00$cphMainColumn$ctl00$usrContactInfoD$chkIsInvoice'
                        checked={xuathoadon}
                        onChange={handleInvoiceChange}
                      />
                      <label for='cphMainColumn_ctl00_usrContactInfoD_chkIsInvoice'>
                        Yêu cầu xuất hóa đơn
                      </label>
                    </td>
                  </tr>
                  {xuathoadon && (
                    <tr>
                      <td colspan='2'>
                        <table>
                          <tbody>
                            <tr id='invoice_details' className='contact-input'>
                              <td>
                                <table
                                  style={{
                                    width: '100%',
                                    border: '1px solid #d7d7d7',
                                    padding: '5px'
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td colspan='2'>
                                        <label for=''>Mã số thuế</label>
                                        <br />
                                        <input
                                          name='ctl00$cphMainColumn$ctl00$usrContactInfoD$txtTax'
                                          type='text'
                                          maxlength='50'
                                          id='cphMainColumn_ctl00_usrContactInfoD_txtTax'
                                          className='new i-require txtTaxCode'
                                          style={{ width: '200px' }}
                                          value={masothue}
                                          onChange={e =>
                                            setmasothue(e.target.value)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan='2'>
                                        <label for=''>Tên Công ty</label>
                                        <br />
                                        <input
                                          name='ctl00$cphMainColumn$ctl00$usrContactInfoD$txtNameInvoice'
                                          type='text'
                                          maxlength='250'
                                          id='cphMainColumn_ctl00_usrContactInfoD_txtNameInvoice'
                                          className='new i-require letterOnly txtNameInvoice'
                                          value={tencongty}
                                          onChange={e =>
                                            settencongty(e.target.value)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan='2'>
                                        <label for=''>Địa chỉ</label>
                                        <br />
                                        <input
                                          name='ctl00$cphMainColumn$ctl00$usrContactInfoD$txtAddress'
                                          type='text'
                                          maxlength='250'
                                          id='cphMainColumn_ctl00_usrContactInfoD_txtAddress'
                                          className='new i-require txtAddress'
                                          value={diachi}
                                          onChange={e =>
                                            setdiachi(e.target.value)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan='2'>
                                        <p
                                          style={{
                                            color: '#D51317',
                                            clear: 'both',
                                            lineHeight: '1.4'
                                          }}
                                        >
                                          Lưu ý về việc xuất hóa đơn: <br />{' '}
                                          Thông tin hóa đơn gửi tại đây hoặc có
                                          thể bổ sung sau, nhưng cần được gửi
                                          trong vòng 24 giờ từ thời điểm thanh
                                          toán. Abay sẽ xuất HĐ điện tử trong
                                          ngày nhận được thanh toán. Quý khách
                                          vui lòng quay lại web Abay.vn, vào
                                          tiện ích "Xem lại đơn hàng" để lấy Hóa
                                          Đơn.
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td
                      colspan='2'
                      className='remark'
                      style={{ paddingTop: '10px' }}
                    >
                      <input
                        id='cphMainColumn_ctl00_usrContactInfoD_chkRemarkAll'
                        type='checkbox'
                        name='ctl00$cphMainColumn$ctl00$usrContactInfoD$chkRemarkAll'
                        checked={isRemarkChecked}
                        onChange={handleRemarkChange}
                      />
                      <label for='cphMainColumn_ctl00_usrContactInfoD_chkRemarkAll'>
                        Ghi chú về đơn hàng
                      </label>
                    </td>
                  </tr>
                  {isRemarkChecked && (
                    <tr>
                      <td colspan='2'>
                        <table id='remark-details'>
                          <tbody>
                            <tr>
                              <td style={{ width: '93px' }}></td>
                              <td>
                                <textarea
                                  name='ctl00$cphMainColumn$ctl00$usrContactInfoD$txtRemark'
                                  rows='5'
                                  cols='20'
                                  id='cphMainColumn_ctl00_usrContactInfoD_txtRemark'
                                  className='text-note'
                                  value={ghichu}
                                  onChange={e => setghichu(e.target.value)}
                                ></textarea>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colspan='2'>
                      <div className='tblotherflight'>
                        <div className='w30p inlineblock'>&nbsp;</div>
                        <table className='w70p tblcurrentflight'>
                          <tbody>
                            <tr>
                              <td className='nowrap'>
                                <span>&nbsp;{CalendarFormat(date)}</span>
                              </td>
                              <td className='nowrap'>
                                <span className='bold'>
                                  &nbsp;&nbsp;{mafrom}&nbsp;
                                  {flightdata.departureTime}
                                </span>
                                <span>&nbsp;-&nbsp;</span>
                                <span>
                                  {mato}&nbsp;{flightdata.arrivalTime}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ display: 'none' }}>
                    <td colspan='2'></td>
                  </tr>
                  <tr>
                    <td colspan='2' style={{ padding: '10px 0 10px 2px' }}>
                      <a
                        onClick={e => {
                          e.preventDefault()
                          handledatve()
                        }}
                        id='cphMainColumn_ctl00_btnContinue'
                        className='btn-submit btn-submit1 btnContinue'
                        href='javascript:void(0)'
                        style={{ float: 'right' }}
                      >
                        ĐẶT VÉ
                      </a>
                      <a
                        href='/search'
                        className='btn-submit'
                        style={{
                          float: 'left',
                          padding: '12px 10px',
                          textTransform: 'capitalize'
                        }}
                      >
                        Chọn Lại Chuyến Bay
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan='2'>
                      <div
                        style={{
                          backgroundColor: 'lightyellow',
                          padding: '5px',
                          borderRadius: '5px',
                          lineHeight: '24px'
                        }}
                      >
                        <p>Bước tiếp theo:</p>
                        <p>
                          - Vé điện tử sẽ được gửi vào điện thoại, email ngay
                          sau khi quý khách thanh toán
                        </p>
                        <p>
                          - Thanh toán bằng mã QR, chuyển khoản, hoặc thẻ nội
                          địa/quốc tế, ví điện tử, payoo,...
                        </p>
                        <p>
                          - Nếu quý khách cần liên hệ, vui lòng gọi 19006091.
                          Tổng đài Abay phục vụ 24/7 (không nghỉ)
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan='2'></td>
                  </tr>
                  <tr>
                    <td colspan='2'></td>
                  </tr>
                  <tr>
                    <td colspan='2'>
                      <div className='lydo'>
                        <h4>6 lý do đặt vé máy bay tại Abay:</h4>
                        <ul style={{ listStyle: 'inside' }}>
                          <li>Luôn bán đúng giá</li>
                          <li>Xuất hóa đơn trong ngày</li>
                          <li>Xác nhận đặt vé sau 1 phút</li>
                          <li>Phục vụ 24/7 không nghỉ 19006091</li>
                          <li>Dịch vụ sau bán hàng chuyên nghiệp</li>
                          <li>
                            Công ty vé máy bay online đầu tiên, 10 năm kinh
                            nghiệm
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ThongTinDatVeQT
