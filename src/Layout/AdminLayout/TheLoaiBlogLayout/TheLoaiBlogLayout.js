import { useState, useEffect } from 'react'

import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { useToast } from '../../../components/useToast/ToastContext'
import { AddTheLoai } from './AddTheLoai'
import { BlogLayout } from './BlogLayout'
import { publicRoutes } from '../../../router'
import { useNavigate } from 'react-router-dom'
import { FaBloggerB } from 'react-icons/fa'
import { ModalDelete } from '../../../components/ModalDelete'
import { MdDelete } from 'react-icons/md'
import { EditTheLoaiBlog } from './EditTheLoai'

function TheLoaiBlogLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const [isOpenBlog, setIsOpenBlog] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()
  const [nameselected, setnameselected] = useState('')
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      navigate(publicRoutes[1].path)
    }
  }, [navigate])

  const fetchTheLoai = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/gettheloaiblog')
      const data = await response.json()
      if (response.ok) {
        setData(data)
      } else {
        console.log('đã xảy ra lỗi')
      }
    } catch (error) {
      console.error('lỗi', error)
    }
  }

  useEffect(() => {
    fetchTheLoai()
  }, [])

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
      const selectedName = data.find(item => item._id === selectedIds[0])?.name
      setnameselected(selectedName)
      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 thể loại để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 thể loại để cập nhật.', 'warning')
    }
  }

  const handleBlog = () => {
    if (selectedIds.length === 1) {
      setIsOpenBlog(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 thể loại để xem blog.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 thể loại để xem blog.', 'warning')
    }
  }

  const Delete = async () => {
    try {
      const response = await fetch(
        `https://demovemaybay.shop/deletetheloaiblogs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: selectedIds })
        }
      )
      if (response.ok) {
        fetchTheLoai()
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
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Thể loại đã chọn: <div>{selectedIds.length}</div>
        </div>
        <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
          <FaPlus />
          Thêm thể loại
        </div>
        <div className='divvungitem' onClick={handleUpdate}>
          <MdEdit />
          Cập nhật thể loại
        </div>
        <div className='divvungitem' onClick={Handeldelte}>
          <MdDelete />
          Xóa thể loại
        </div>

        <div className='divvungitem' onClick={handleBlog}>
          <FaBloggerB />
          Blog
        </div>
      </div>
      <table border='1'>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                onChange={e => handleSelectAll(e.target.checked)}
                checked={data.length > 0 && selectedIds.length === data.length}
              />
            </th>
            <th>STT</th>
            <th>ID</th>
            <th>Tên thể loại</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <input
                    type='checkbox'
                    onChange={() => handleSelect(item._id)}
                    checked={selectedIds.includes(item._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddTheLoai
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchTheLoai}
      />
      <BlogLayout
        isOpen={isOpenBlog}
        onClose={() => setIsOpenBlog(false)}
        idtheloai={selectedIds[0]}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        ten='thể loại'
        Delete={Delete}
      />
      <EditTheLoaiBlog
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchTheLoai}
        tentheloai={nameselected}
        idtheloai={selectedIds[0]}
      />
    </div>
  )
}

export default TheLoaiBlogLayout
