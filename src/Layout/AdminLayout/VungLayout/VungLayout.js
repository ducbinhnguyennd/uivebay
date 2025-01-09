import { useState, useEffect } from 'react'
import { AddVung } from './AddVung'
import { EditVung } from './EditVung'
import './VungLayout.scss'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { FaCity } from 'react-icons/fa'
import { useToast } from '../../../components/useToast/ToastContext'
import { ThanhPhoLayout } from './ThanhPhoLayout'
import { useNavigate } from 'react-router-dom'
import { publicRoutes } from '../../../router'

function VungLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenThanhPho, setIsOpenThanhPho] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()
  const [nameselected, setnameselected] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      navigate(publicRoutes[1].path)
    }
  }, [navigate])

  const fetchVung = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getvung')
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
    fetchVung()
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
      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 vùng để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 vùng để cập nhật.', 'warning')
    }
  }

  const handleThanhPho = () => {
    if (selectedIds.length === 1) {
      setIsOpenThanhPho(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 vùng để xem thành phố.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 vùng để xem thành phố.', 'warning')
    }
  }

  return (
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Vùng đã chọn: <div>{selectedIds.length}</div>
        </div>
        <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
          <FaPlus />
          Thêm vùng
        </div>
        <div className='divvungitem' onClick={handleUpdate}>
          <MdEdit />
          Cập nhật vùng
        </div>
        <div className='divvungitem' onClick={handleThanhPho}>
          <FaCity />
          Thành phố
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
            <th>Tên vùng</th>
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
      <AddVung
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchVung}
      />
      <EditVung
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchVung}
        tenvung={nameselected}
        idvung={selectedIds[0]}
      />
      <ThanhPhoLayout
        isOpen={isOpenThanhPho}
        onClose={() => setIsOpenThanhPho(false)}
        idvung={selectedIds[0]}
      />
    </div>
  )
}

export default VungLayout
