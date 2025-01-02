import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import './AddVung.scss'
import { useToast } from '../../../../components/useToast/ToastContext'
function AddVung ({ isOpen, onClose, fetchdata }) {
  const [name, setname] = useState('')
  const { showToast } = useToast()

  const validateinput = () => {
    let valid = true
    if (name) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên vùng', 'warning')
      valid = false
    }
    return valid
  }
  const handlehuy = () => {
    setname('')
    onClose()
  }

  const handleadd = async () => {
    if (validateinput()) {
      try {
        const response = await fetch('http://localhost:8080/postvung', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name })
        })
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm vùng thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm vùng</h3>
        <div className='bodyaddvung'>
          <label>Tên vùng</label>
          <input
            type='text'
            value={name}
            placeholder='Nhập tên vùng'
            onChange={e => setname(e.target.value)}
          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm vùng
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

export default AddVung
