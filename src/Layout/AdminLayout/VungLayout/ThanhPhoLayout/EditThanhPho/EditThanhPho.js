import { useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../../components/Modal/Modal'
import { useToast } from '../../../../../components/useToast/ToastContext'
function EditThanhPho ({
  isOpen,
  onClose,
  fetchdata,
  idthanhpho,
  tenthanhpho,
  ma
}) {
  const [name, setname] = useState(tenthanhpho)
  const [mathanhpho, setthanhpho] = useState(ma)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setname(tenthanhpho || '')
      setthanhpho(ma || '')
    }
  }, [tenthanhpho, ma, isOpen])
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

  const handleedit = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `https://demovemaybay.shop/putthanhpho/${idthanhpho}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, mathanhpho: mathanhpho })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Cập nhật thành phố thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Cập nhật thành phố</h3>
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
            <button className='btnaddvung' onClick={handleedit}>
              <MdEdit />
              Cập nhật thành phố
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

export default EditThanhPho
