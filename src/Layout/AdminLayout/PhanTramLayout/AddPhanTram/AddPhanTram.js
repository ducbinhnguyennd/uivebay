import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function AddPhanTram ({ isOpen, onClose, fetchdata }) {
  const [phantram, setphantram] = useState('')
  const { showToast } = useToast()

  const validateinput = () => {
    let valid = true
    if (phantram) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên phần trăm', 'warning')
      valid = false
    }
    return valid
  }
  const handlehuy = () => {
    setphantram('')
    onClose()
  }

  const handleadd = async () => {
    if (validateinput()) {
      try {
        const response = await fetch('https://demovemaybay.shop/postphantram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phantram: phantram })
        })
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm phần trăm thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm phần trăm</h3>
        <div className='bodyaddvung'>
          <label>phần trăm</label>
          <input
            type='text'
            value={phantram}
            placeholder='Nhập phần trăm'
            onChange={e => setphantram(e.target.value)}
          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm phần trăm
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

export default AddPhanTram
