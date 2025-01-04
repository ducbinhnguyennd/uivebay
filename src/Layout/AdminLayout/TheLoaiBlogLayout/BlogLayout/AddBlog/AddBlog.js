import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../../components/Modal/Modal'
import { useToast } from '../../../../../components/useToast/ToastContext'
import ReactQuill from 'react-quill'
import './AddBlog.scss'
import 'react-quill/dist/quill.snow.css'

function AddBlog ({ isOpen, onClose, fetchdata, idtheloai }) {
  const [tieude, settieude] = useState('')
  const [noidung, setnoidung] = useState('')
  const { showToast } = useToast()

  const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ align: [] }], // add align toolbar
    ['link'],
    ['image']
  ]
}

  const validateinput = () => {
    let valid = true
    if (tieude) {
      valid = true
    } else {
      showToast('Vui lòng nhập tiêu đề Blog', 'warning')
      valid = false
    }

    if (noidung) {
      valid = true
    } else {
      showToast('Vui lòng nhập mã Blog', 'warning')
      valid = false
    }
    return valid
  }
  const handlehuy = () => {
    settieude('')
    setnoidung('')
    onClose()
  }

  const handleadd = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `http://localhost:8080/postblog/${idtheloai}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tieude: tieude, noidung: noidung })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Thêm Blog thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Thêm Blog</h3>
        <div className='bodyaddvung'>
          <label>Tiêu đề Blog</label>
          <input
            type='text'
            value={tieude}
            placeholder='Nhập Tiêu đề Blog'
            onChange={e => settieude(e.target.value)}
          />
          <label>Nội dung</label>
          <ReactQuill
            value={noidung}
            onChange={setnoidung}
            placeholder='Nhập nội dung'
            theme='snow'
            modules = { modules }

          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleadd}>
              <FaPlus />
              Thêm Blog
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

export default AddBlog
