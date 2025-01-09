import { useState, useEffect } from 'react'

import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { useToast } from '../../../components/useToast/ToastContext'
import { AddHangMayBay } from './AddHangMayBay'
import { publicRoutes } from '../../../router'
import { useNavigate } from 'react-router-dom'
import { EditHangMayBay } from './EditHangMayBay'
import { MdDelete } from 'react-icons/md'
import { ModalDelete } from '../../../components/ModalDelete'

function HangMayBayLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()
  const [nameselected, setnameselected] = useState('')
  const [mahangselected, setmahangselected] = useState('')
  const [imageselected, setimageselected] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      navigate(publicRoutes[1].path)
    }
  }, [navigate])

  const fetchHangMayBay = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/gethangmaybay')
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
    fetchHangMayBay()
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
      const selectedmahang = data.find(
        item => item._id === selectedIds[0]
      )?.mahangmaybay
      const selectedimage = data.find(
        item => item._id === selectedIds[0]
      )?.image
      setnameselected(selectedName)
      setimageselected(selectedimage)
      setmahangselected(selectedmahang)
      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 hãng máy bay để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 hãng máy bay để cập nhật.', 'warning')
    }
  }

  const Delete = async () => {
    try {
      const response = await fetch(`http://localhost:3013/deletehang`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: selectedIds })
      })
      if (response.ok) {
        fetchHangMayBay()
        setSelectedIds([])
        showToast('Xóa hãng máy bay thành công', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Handeldelte = () => {
    if (selectedIds.length > 0) {
      setIsOpenDelete(true)
    } else {
      showToast('Vui lòng chọn ít nhất 1 hãng máy bay để xóa.', 'warning')
    }
  }

  return (
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Hãng máy bay đã chọn: <div>{selectedIds.length}</div>
        </div>
        <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
          <FaPlus />
          Thêm hãng máy bay
        </div>
        <div className='divvungitem' onClick={handleUpdate}>
          <MdEdit />
          Cập nhật hãng máy bay
        </div>
        <div className='divvungitem' onClick={Handeldelte}>
          <MdDelete />
          Xóa Hãng
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
            <th>Logo</th>
            <th>Mã</th>
            <th>Tên hãng</th>
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
                <td>
                  <img src={`${item.image}`} alt='' />
                </td>
                <td>{item.mahangmaybay}</td>
                <td>{item.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddHangMayBay
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchHangMayBay}
      />
      <EditHangMayBay
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchHangMayBay}
        tenhang={nameselected}
        mahang={mahangselected}
        image={imageselected}
        idhang={selectedIds[0]}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        ten='hãng máy bay'
        Delete={Delete}
      />
    </div>
  )
}

export default HangMayBayLayout
