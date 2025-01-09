import { useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../components/Modal/Modal'
import { useToast } from '../../../../components/useToast/ToastContext'
function EditVung ({
  isOpen,
  onClose,
  fetchdata,
  tenhang,
  mahang,
  image,
  idhang
}) {
  const [name, setname] = useState(tenhang)
  const [mahangmaybay, setmahangmaybay] = useState('')
  const [file, setFile] = useState(null)

  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setname(tenhang || '')
      setmahangmaybay(mahang || '')
    }
  }, [tenhang, isOpen, mahang])

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
    return valid
  }

  const handlehuy = () => {
    setname('')
    onClose()
  }

  const handledit = async () => {
    if (validateinput()) {
      try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('mahangmaybay', mahangmaybay)

        if (file) {
          formData.append('image', file)
        }

        const response = await fetch(
          `https://demovemaybay.shop/puthangmaybay/${idhang}`,
          {
            method: 'POST',
            body: formData
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Cập nhật hãng máy bay thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Cập Nhật hãng máy bay</h3>
        <div className='bodyaddvung'>
          <label>Logo mới</label>
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
          <label>Logo hiện tại</label>
          <img src={`${image}`} alt='' style={{ width: '20%' }}/>
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handledit}>
              <MdEdit />
              Cập nhật hãng máy bay
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
