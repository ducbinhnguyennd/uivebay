import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import Modal from '../../../../../components/Modal/Modal'
import { useToast } from '../../../../../components/useToast/ToastContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function EditBlog ({
  isOpen,
  onClose,
  fetchdata,
  idblog,
  tieudeblog,
  noidungblog
}) {
  const [tieude, settieude] = useState(tieudeblog)
  const [noidung, setnoidung] = useState(noidungblog)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      settieude(tieudeblog || '')
      setnoidung(noidungblog || '')
    }
  }, [tieudeblog, isOpen, noidungblog])

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
      showToast('Vui lòng nhập nội dung Blog', 'warning')
      valid = false
    }
    return valid
  }
  const handlehuy = () => {
    settieude('')
    setnoidung('')
    onClose()
  }

  const handleedit = async () => {
    if (validateinput()) {
      try {
        const response = await fetch(
          `http://localhost:3013/putblog/${idblog}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tieude: tieude, noidung: noidung })
          }
        )
        if (response.ok) {
          fetchdata()
          handlehuy()
          showToast('Cập nhật Blog thành công')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handlehuy}>
      <div className='add-vung'>
        <h3>Cập nhật Blog</h3>
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
            modules={modules}
          />
        </div>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={handleedit}>
              <FaPlus />
              Cập nhật Blog
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

export default EditBlog
