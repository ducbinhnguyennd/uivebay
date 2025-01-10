import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function AddVoucher ({ isOpen, onClose, fetchdata }) {
  const [sotien, setsotien] = useState('')
  const { showToast } = useToast()

  const validateinput = () => {
    let valid = true
    if (sotien) {
      valid = true
    } else {
      showToast('Vui lòng nhập số tiền giảm giá', 'warning')
      valid = false
    }
    return valid
  }
  const handlehuy = () => {
    setsotien('')
    onClose()
  }

  const handleadd = async () => {
    if (validateinput()) {
      try {
        const response = await fetch('http://localhost:3013/postvoucher', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sotien: sotien })
        })
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm voucher thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm voucher</h3>
        <div className='bodyaddvung'>
          <label>Số tiền giảm giá</label>
          <input
            type='text'
            value={sotien}
            placeholder='Nhập số tiền giảm giá'
            onChange={e => setsotien(e.target.value)}
          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm voucher
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

export default AddVoucher
