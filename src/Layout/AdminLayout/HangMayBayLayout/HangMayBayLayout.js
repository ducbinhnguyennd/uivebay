import { useState, useEffect } from 'react'

// import './HangMayBayLayout.scss'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
// import { useToast } from '../../../components/useToast/ToastContext'
import { AddHangMayBay } from './AddHangMayBay'

function HangMayBayLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  //   const { showToast } = useToast()
  //   const [nameselected, setnameselected] = useState('')

  const fetchHangMayBay = async () => {
    try {
      const response = await fetch('http://localhost:8080/gethangmaybay')
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

  //   const handleUpdate = () => {
  //     if (selectedIds.length === 1) {
  //       const selectedName = data.find(item => item._id === selectedIds[0])?.name
  //       setnameselected(selectedName)
  //       console.log(nameselected)
  //     } else if (selectedIds.length > 1) {
  //       showToast('Bạn chỉ được phép chọn 1 vùng để cập nhật.', 'warning')
  //     } else {
  //       showToast('Vui lòng chọn 1 vùng để cập nhật.', 'warning')
  //     }
  //   }

  //   const handleThanhPho = () => {
  //     if (selectedIds.length === 1) {
  //     } else if (selectedIds.length > 1) {
  //       showToast('Bạn chỉ được phép chọn 1 vùng để xem thành phố.', 'warning')
  //     } else {
  //       showToast('Vui lòng chọn 1 vùng để xem thành phố.', 'warning')
  //     }
  //   }

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
        <div className='divvungitem'>
          <MdEdit />
          Cập nhật hãng máy bay
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
              <td colSpan={4}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddHangMayBay
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchHangMayBay}
      />
    </div>
  )
}

export default HangMayBayLayout
