import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function AddNganHang ({ isOpen, onClose, fetchdata }) {
  const [tennganhang, settennganhang] = useState('')
  const [tendaydu, settendaydu] = useState('')

  const [tentaikhoan, settentaikhoan] = useState('')

  const [sotaikhoan, setsotaikhoan] = useState('')
  const [chinhanh, setchinhanh] = useState('')
  const [file, setFile] = useState(null)

  const { showToast } = useToast()

  const validateinput = () => {
    let valid = true
    if (tennganhang) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên ngân hàng', 'warning')
      valid = false
    }
    if (tendaydu) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên đầy đủ', 'warning')
      valid = false
    }
    if (tentaikhoan) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên tài khoản', 'warning')
      valid = false
    }
    if (sotaikhoan) {
      valid = true
    } else {
      showToast('Vui lòng nhập số tài khoản', 'warning')
      valid = false
    }
    if (chinhanh) {
      valid = true
    } else {
      showToast('Vui lòng nhập chi nhánh', 'warning')
      valid = false
    }

    return valid
  }
  const handlehuy = () => {
    settennganhang('')
    onClose()
  }

  const handleadd = async () => {
    if (validateinput()) {
      try {
        const formData = new FormData()
        formData.append('tennganhang', tennganhang)
        formData.append('tendaydu', tendaydu)
        formData.append('tentaikhoan', tentaikhoan)
        formData.append('sotaikhoan', sotaikhoan)
        formData.append('chinhanh', chinhanh)

        if (file) {
          formData.append('image', file)
        }

        const response = await fetch('https://demovemaybay.shop/postnganhang', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm ngân hàng thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm ngân hàng</h3>
        <div className='bodyaddvung'>
          <label>Ảnh</label>
          <input type='file' onChange={e => setFile(e.target.files[0])} />
          <label>Tên ngân hàng</label>
          <input
            type='text'
            value={tennganhang}
            placeholder='Nhập tên ngân hàng'
            onChange={e => settennganhang(e.target.value)}
          />
        </div>
        <div className='bodyaddvung'>
          <label>Tên đầy đủ</label>
          <input
            type='text'
            value={tendaydu}
            placeholder='Nhập tên đầy đủ'
            onChange={e => settendaydu(e.target.value)}
          />
        </div>

        <div className='bodyaddvung'>
          <label>Tên tài khoản</label>
          <input
            type='text'
            value={tentaikhoan}
            placeholder='Nhập tên tài khoản'
            onChange={e => settentaikhoan(e.target.value)}
          />
        </div>

        <div className='bodyaddvung'>
          <label>số tài khoản</label>
          <input
            type='text'
            value={sotaikhoan}
            placeholder='Nhập số tài khoản'
            onChange={e => setsotaikhoan(e.target.value)}
          />
        </div>

        <div className='bodyaddvung'>
          <label>Chi nhánh</label>
          <input
            type='text'
            value={chinhanh}
            placeholder='Nhập chi nhánh'
            onChange={e => setchinhanh(e.target.value)}
          />
        </div>

        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm ngân hàng
            </button>
            <button className='btnhuyvung' onClick={handlehuy}>
              <MdCancel />
              Hủy
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddNganHang
