/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import ModalBig from '../../../../components/ModalBig/ModalBig'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { AddBlog } from './AddBlog'
import { useToast } from '../../../../components/useToast/ToastContext'
import { EditBlog } from './EditBlog'
import { ModalDelete } from '../../../../components/ModalDelete'
import { MdDelete } from 'react-icons/md'

function BlogLayout ({ isOpen, onClose, idtheloai }) {
  const [data, setdata] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const [selectedIds, setSelectedIds] = useState([])
  const [selectedTieude, setSelectedTieude] = useState('')
  const [selectedNoidung, setSelectedNoidung] = useState('')
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const { showToast } = useToast()

  const handelclose = () => {
    setSelectedIds([])
    onClose()
  }
  const fetchblog = async () => {
    if (idtheloai) {
      try {
        const response = await fetch(
          `https://demovemaybay.shop/getblogid/${idtheloai}`
        )
        const data = await response.json()
        if (response.ok) {
          setdata(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchblog()
  }, [idtheloai])

  const handleSelectAll = isChecked => {
    if (isChecked) {
      const allIds = data.map(item => item._id)
      setSelectedIds(allIds)
    } else {
      setSelectedIds([])
    }
  }

  const handleSelect = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleUpdate = () => {
    if (selectedIds.length === 1) {
      const selectedtieude = data.find(
        item => item._id === selectedIds[0]
      )?.tieude
      const selectednoidung = data.find(
        item => item._id === selectedIds[0]
      )?.noidung
      setSelectedTieude(selectedtieude)
      setSelectedNoidung(selectednoidung)
      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 blog để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 blog để cập nhật.', 'warning')
    }
  }

  const Delete = async () => {
    try {
      const response = await fetch(`https://demovemaybay.shop/deleteblogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idblogs: selectedIds })
      })
      if (response.ok) {
        fetchblog()
        setSelectedIds([])
        showToast('Xóa Blog thành công', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Handeldelte = () => {
    if (selectedIds.length > 0) {
      setIsOpenDelete(true)
    } else {
      showToast('Vui lòng chọn ít nhất 1 Blog để xóa.', 'warning')
    }
  }

  return (
    <ModalBig isOpen={isOpen} onClose={handelclose}>
      <div className='thanhpho'>
        <div className='header-thanhpho'>
          <div className='divvungchonitem'>
            Blog đã chọn: <div>{selectedIds.length}</div>
          </div>
          <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
            <FaPlus />
            Thêm blog
          </div>
          <div className='divvungitem' onClick={handleUpdate}>
            <MdEdit />
            Cập nhật blog
          </div>
          <div className='divvungitem' onClick={Handeldelte}>
            <MdDelete />
            Xóa Blog
          </div>
        </div>
        <div className='body-thanhpho'>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    onChange={e => handleSelectAll(e.target.checked)}
                    checked={
                      data.length > 0 && selectedIds.length === data.length
                    }
                  />
                </th>
                <th>STT</th>
                <th>ID</th>
                <th>Tiêu đề blog</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type='checkbox'
                        onChange={() => handleSelect(item._id)}
                        checked={selectedIds.includes(item._id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item._id}</td>
                    <td>{item.tieude}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Không có blog nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddBlog
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        idtheloai={idtheloai}
        fetchdata={fetchblog}
      />
      <EditBlog
        idblog={selectedIds[0]}
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchblog}
        tieudeblog={selectedTieude}
        noidungblog={selectedNoidung}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        Delete={Delete}
        ten={'Blog'}
      />
    </ModalBig>
  )
}

export default BlogLayout
