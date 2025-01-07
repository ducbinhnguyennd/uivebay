import { useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function EditPhanTram ({ isOpen, onClose, fetchdata, tenphantram, idphantram }) {
  const [phantram, setphantram] = useState(tenphantram)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setphantram(tenphantram || '')
    }
  }, [tenphantram, isOpen])

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

  const handledit = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `https://demovemaybay.shop/putphantram/${idphantram}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phantram: phantram })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Cập nhật phần trăm thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Cập Nhật phần trăm</h3>
        <div className='bodyaddvung'>
          <label>Tên phần trăm</label>
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
            <button className='btnaddvung' onClick={handledit}>
              <MdEdit />
              Cập nhật phần trăm
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

export default EditPhanTram
