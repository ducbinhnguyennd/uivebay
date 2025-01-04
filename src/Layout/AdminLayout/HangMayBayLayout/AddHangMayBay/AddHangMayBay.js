import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function AddHangMayBay ({ isOpen, onClose, fetchdata }) {
  const [name, setname] = useState('')
  const [mahangmaybay, setmahangmaybay] = useState('')
  const [file, setFile] = useState(null)
  const { showToast } = useToast()

  const validateinput = () => {
    let valid = true
    if (name) {
      valid = true
    } else {
      showToast('Vui lòng nhập tên hãng máy bay', 'warning')
      valid = false
    }
    if (mahangmaybay) {
      valid = true
    } else {
      showToast('Vui lòng nhập mã hàng máy bay', 'warning')
      valid = false
    }
    if (file) {
      valid = true
    } else {
      showToast('Vui lòng chọn logo hãng', 'warning')
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
        const formData = new FormData()
        formData.append('name', name)
        formData.append('mahangmaybay', mahangmaybay)

        if (file) {
          formData.append('image', file)
        }

        const response = await fetch('https://webmaybay.vercel.app/posthangmaybay', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm hãng máy bay thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm hãng máy bay</h3>
        <div className='bodyaddvung'>
          <label>Logo</label>
          <input type='file' onChange={e => setFile(e.target.files[0])} />
          <label>Tên hãng máy bay</label>
          <input
            type='text'
            value={name}
            placeholder='Nhập tên hãng máy bay'
            onChange={e => setname(e.target.value)}
          />
          <label>Tên hãng máy bay</label>
          <input
            type='text'
            value={mahangmaybay}
            placeholder='Nhập tên hãng máy bay'
            onChange={e => setmahangmaybay(e.target.value)}
          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm hãng máy bay
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

export default AddHangMayBay
