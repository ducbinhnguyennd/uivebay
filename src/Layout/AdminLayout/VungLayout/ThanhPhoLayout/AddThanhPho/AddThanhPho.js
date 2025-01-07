import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../../components/Modal/Modal'
import { useToast } from '../../../../../components/useToast/ToastContext'
function AddThanhPho ({ isOpen, onClose, fetchdata, idvung }) {
  const [name, setname] = useState('')
  const [mathanhpho, setthanhpho] = useState('')
  const { showToast } = useToast()

  const validateinput = () => {
    let valid = true
    if (name) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên thành phố', 'warning')
      valid = false
    }

    if (mathanhpho) {
      valid = true
    } else {
      showToast('Vui lòng nhập mã thành phố', 'warning')
      valid = false
    }
    return valid
  }
  const handlehuy = () => {
    setname('')
    setthanhpho('')
    onClose()
  }

  const handleadd = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `https://demovemaybay.shop/postthanhpho/${idvung}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, mathanhpho: mathanhpho })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm thành phố thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm thành phố</h3>
        <div className='bodyaddvung'>
          <label>Tên thành phố</label>
          <input
            type='text'
            value={name}
            placeholder='Nhập tên thành phố'
            onChange={e => setname(e.target.value)}
          />
          <label>Mã thành phố</label>
          <input
            type='text'
            value={mathanhpho}
            placeholder='Nhập mã thành phố'
            onChange={e => setthanhpho(e.target.value)}
          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm thành phố
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

export default AddThanhPho
