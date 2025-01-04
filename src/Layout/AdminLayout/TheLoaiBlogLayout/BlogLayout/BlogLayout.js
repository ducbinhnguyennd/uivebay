/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import ModalBig from '../../../../components/ModalBig/ModalBig'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { AddBlog } from './AddBlog'
// import { useToast } from '../../../../components/useToast/ToastContext'

function BlogLayout ({ isOpen, onClose, idtheloai }) {
  const [data, setdata] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  //   const { showToast } = useToast()

  const handelclose = () => {
    setSelectedIds([])
    onClose()
  }
  const fetchblog = async () => {
    if (idtheloai) {
      try {
        const response = await fetch(
          `http://localhost:8080/getblog/${idtheloai}`
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

  //   const handleUpdate = () => {
  //     if (selectedIds.length === 1) {
  //       const selected = data.find(item => item._id === selectedIds[0])

  //     } else if (selectedIds.length > 1) {
  //       showToast('Bạn chỉ được phép chọn 1 blog để cập nhật.', 'warning')
  //     } else {
  //       showToast('Vui lòng chọn 1 blog để cập nhật.', 'warning')
  //     }
  //   }

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
          <div className='divvungitem'>
            <MdEdit />
            Cập nhật blog
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
    </ModalBig>
  )
}

export default BlogLayout
