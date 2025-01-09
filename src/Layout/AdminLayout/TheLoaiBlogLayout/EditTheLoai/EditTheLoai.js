import { useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function EditTheLoai ({ isOpen, onClose, fetchdata, tentheloai, idtheloai }) {
  const [name, setname] = useState(tentheloai)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setname(tentheloai || '')
    }
  }, [tentheloai, isOpen])

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

  const handledit = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `https://demovemaybay.shop/puttheloaiblog/${idtheloai}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Cập nhật thể loại thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Cập Nhật thể loại</h3>
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
            <button className='btnaddvung' onClick={handledit}>
              <MdEdit />
              Cập nhật thể loại
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

export default EditTheLoai
