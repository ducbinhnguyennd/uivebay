import { useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function EditVung ({ isOpen, onClose, fetchdata, tenvung, idvung }) {
  const [name, setname] = useState(tenvung)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setname(tenvung || '')
    }
  }, [tenvung, isOpen])

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

  const handledit = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `http://localhost:8080/putvung/${idvung}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Cập nhật vùng thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Cập Nhật vùng</h3>
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
            <button className='btnaddvung' onClick={handledit}>
              <MdEdit />
              Cập nhật vùng
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
