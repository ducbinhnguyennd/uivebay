import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function AddTheLoai ({ isOpen, onClose, fetchdata }) {
  const [name, setname] = useState('')
  const { showToast } = useToast()

  const validateinput = () => {
    let valid = true
    if (name) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên thể loại', 'warning')
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
        const response = await fetch('http://localhost:8080/posttheloaiblog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name })
        })
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm thể loại thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm thể loại</h3>
        <div className='bodyaddvung'>
          <label>Tên thể loại</label>
          <input
            type='text'
            value={name}
            placeholder='Nhập tên thể loại'
            onChange={e => setname(e.target.value)}
          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm thể loại
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

export default AddTheLoai
