/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DatVe.scss'
import { useToast } from '../../components/useToast/ToastContext'
import { getAirlineName } from '../SearchLayout/SearchLayoutFunction'
import { CalendarFormat } from '../../components/LunarCalendarFormat/LunarCalendarFormat'

function ThongTinDat () {
  const [isRemarkChecked, setIsRemarkChecked] = useState(false)
  const [hangmaybay, sethangmaybay] = useState([])
  const [namenguoibay, setnamenguoibay] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  const [kygui, setkygui] = useState(false)
  const [hanhlykygui, sethanhlykygui] = useState('Mua thêm ký gửi')
  const [pricekygui, setpricekygui] = useState(0)
  const [xuathoadon, setxuathoadon] = useState(false)
  const [masothue, setmasothue] = useState('')
  const [tencongty, settencongty] = useState('')
  const [diachi, setdiachi] = useState('')
  const [ghichu, setghichu] = useState('')
  const [themkhach, setthemkhach] = useState(false)
  const [valuethemkhach, setvaluethemkhach] = useState('')
  const [sokhachthem, setsokhachthem] = useState(0)

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
    sethoadon
  } = useToast()

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

  const validate = () => {
    let valid = true
    if (namenguoibay) {
      valid = true
    } else {
      valid = false
      showToast('Vui lòng nhập tên người bay', 'warning')
    }
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
      const response = await fetch('https://webmaybay.vercel.app/posthoadon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          namenguoibay,
          phone,
          email,
          ngaybay: date,
          chuyenbay:flightdata.flightNumber,
          hang: flightdata.airlineCode,
          cityfrom: mafrom,
          cityto: mato,
          hourfrom: flightdata.departureTime,
          hourto: flightdata.arrivalTime,
          nguoilon: mangnguoi[0]?.songuoi,
          treem: mangnguoi[1]?.songuoi || 0,
          tresosinh: mangnguoi[2]?.songuoi || 0,
          kygui,
          hanhlykygui,
          pricekygui,
          xuathoadon,
          masothue,
          tencongty,
          diachi,
          ghichu,
          themkhach,
          sokhachthem,
          tienve
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
            <td colspan='2'></td>
          </tr>
          <tr>
            <td
              colspan='2'
              style={{ verticalAlign: 'top' }}
              className='ctr-passenger'
            >
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
                  <tr>
                    <td colspan='2'></td>
                  </tr>
                  <tr>
                    <td className='col-left' style={{ verticalAlign: 'top' }}>
                      <table className='passenger-info'>
                        <tbody>
                          <tr>
                            <td style={{ paddingTop: '4px' }}>
                              <select
                                name='ctl00e'
                                id='cphMainColumn_ctl00_usrPassengerInfoD_repPassenger_cboTitle_0'
                                style={{ width: '96px' }}
                              >
                                <option selected value='8'>
                                  Anh
                                </option>
                                <option value='9'>Chị</option>
                                <option value='6'>Ông</option>
                                <option value='7'>Bà</option>
                              </select>
                            </td>
                            <td
                              colspan='2'
                              className='passenger-1'
                              style={{ paddingLeft: '4px', paddingTop: '4px' }}
                            >
                              <input
                                name='ce'
                                type='text'
                                maxlength='100'
                                id='cphMainColumn_ctl00_usrPassengerInfoD_repPassenger_txtFullName_0'
                                className='letterOnly i-require new LastNamePassengerFlight passenger-name'
                                placeholder='Họ và tên người bay...'
                                value={namenguoibay}
                                onChange={e => setnamenguoibay(e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td
                      className='col-right'
                      style={{ verticalAlign: 'top', paddingTop: '2px' }}
                    >
                      <table style={{ width: '100%' }}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                verticalAlign: 'top',
                                paddingTop: '2px'
                              }}
                            >
                              <div className='baggage-container'>
                                <select
                                  name='ctl00$cphMainColumn$ctl00$usrPassengerInfoD$repPassenger$ctl00$cboBaggageOutBound'
                                  id='cphMainColumn_ctl00_usrPassengerInfoD_repPassenger_cboBaggageOutBound_0'
                                  className='cbo-baggage out-baggage'
                                  style={{ background: 'rgb(254, 238, 210)' }}
                                  value={hanhlykygui}
                                  onChange={e => {
                                    const selectedOption =
                                      e.target.options[e.target.selectedIndex]
                                        .text

                                    if (selectedOption === 'Mua thêm ký gửi') {
                                      setkygui(false)
                                      sethanhlykygui(selectedOption)
                                      setpricekygui(0)
                                    } else {
                                      const match = selectedOption.match(
                                        /(\d+)kg\s-\s([\d,.]+)/
                                      )
                                      if (match) {
                                        const kg = match[1]
                                        const price = parseInt(
                                          match[2].replaceAll(',', ''),
                                          10
                                        )
                                        setkygui(kg !== '0')
                                        sethanhlykygui(selectedOption)
                                        setpricekygui(price)
                                      }
                                    }
                                  }}
                                >
                                  <option
                                    value='Mua thêm ký gửi'
                                    data-baggage-value='0'
                                  >
                                    Mua thêm ký gửi
                                  </option>
                                  <option
                                    value='Mua 20kg - 266,000 đ'
                                    data-baggage-value='20'
                                  >
                                    Mua 20kg - 266,000 đ
                                  </option>
                                  <option
                                    value='Mua 30kg - 374,000 đ'
                                    data-baggage-value='30'
                                  >
                                    Mua 30kg - 374,000 đ
                                  </option>
                                  <option
                                    value='Mua 40kg - 482,000 đ'
                                    data-baggage-value='40'
                                  >
                                    Mua 40kg - 482,000 đ
                                  </option>
                                  <option
                                    value='Mua 50kg - 644,000 đ'
                                    data-baggage-value='50'
                                  >
                                    Mua 50kg - 644,000 đ
                                  </option>
                                  <option
                                    value='Mua 60kg - 752,000 đ'
                                    data-baggage-value='60'
                                  >
                                    Mua 60kg - 752,000 đ
                                  </option>
                                  <option
                                    value='Mua 70kg - 860,000 đ'
                                    data-baggage-value='70'
                                  >
                                    Mua 70kg - 860,000 đ
                                  </option>
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
                          onChange={e => {
                            const selectedValue = e.target.value
                            const match = selectedValue.match(/\d+/)
                            const numberOfGuests = match
                              ? parseInt(match[0], 10)
                              : 0
                            setvaluethemkhach(selectedValue)
                            setsokhachthem(numberOfGuests)
                            if (numberOfGuests > 0) {
                              setthemkhach(true)
                            } else {
                              setthemkhach(false)
                            }
                          }}
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
                              <td>
                                <img
                                  src='/_WEB/_File/Images/AirlineLogo/smVJ.gif'
                                  alt=''
                                  className='img-VJ-Full h30'
                                />
                              </td>
                              <td className='nowrap'>
                                {getAirlineName(
                                  flightdata.airlineCode,
                                  hangmaybay
                                )}
                              </td>
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

export default ThongTinDat
