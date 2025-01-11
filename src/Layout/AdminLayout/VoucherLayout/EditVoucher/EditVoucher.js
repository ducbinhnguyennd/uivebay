import { useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function EditVung ({ isOpen, onClose, fetchdata, soTien, idvoucher }) {
  const [sotien, setsotien] = useState(soTien)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setsotien(soTien || '')
    }
  }, [soTien, isOpen])

  const validateinput = () => {
    let valid = true
    if (sotien) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên voucher', 'warning')
      valid = false
    }
    return valid
  }
  const handlehuy = () => {
    setsotien('')
    onClose()
  }

  const handledit = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `https://demovemaybay.shop/putvoucher/${idvoucher}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sotien: sotien })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Cập nhật voucher thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Cập Nhật Voucher</h3>
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
            <button className='btnaddvung' onClick={handledit}>
              <MdEdit />
              Cập nhật voucher
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

export default EditVung
