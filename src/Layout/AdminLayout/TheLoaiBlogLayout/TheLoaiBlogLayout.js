import { useState, useEffect } from 'react'

import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { FaCity } from 'react-icons/fa'
import { useToast } from '../../../components/useToast/ToastContext'
import { AddTheLoai } from './AddTheLoai'
import { BlogLayout } from './BlogLayout'

function TheLoaiBlogLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenBlog, setIsOpenBlog] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()
  const [nameselected, setnameselected] = useState('')

  const fetchTheLoai = async () => {
    try {
      const response = await fetch('http://localhost:8080/gettheloaiblog')
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
      console.log(nameselected)
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
        <div className='divvungitem' onClick={handleBlog}>
          <FaCity />
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
    </div>
  )
}

export default TheLoaiBlogLayout
