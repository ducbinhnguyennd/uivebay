import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { useToast } from '../../../components/useToast/ToastContext'
import { AddPhanTram } from './AddPhanTram'
import { EditPhanTram } from './EditPhanTram'

function PhanTramLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()
  const [nameselected, setnameselected] = useState('')

  const fetchVung = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getphantram')
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
      const selectedName = data.find(
        item => item._id === selectedIds[0]
      )?.phantram
      setnameselected(selectedName)
      console.log(nameselected)
      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 Phần trăm để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 Phần trăm để cập nhật.', 'warning')
    }
  }

  return (
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Phần trăm đã chọn: <div>{selectedIds.length}</div>
        </div>
        {data.length === 0 && (
          <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
            <FaPlus />
            Thêm Phần trăm
          </div>
        )}
        <div className='divvungitem' onClick={handleUpdate}>
          <MdEdit />
          Cập nhật Phần trăm
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
            <th>Phần trăm</th>
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
                <td>{item.phantram}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddPhanTram
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchVung}
      />
      <EditPhanTram
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchVung}
        tenphantram={nameselected}
        idphantram={selectedIds[0]}
      />
    </div>
  )
}

export default PhanTramLayout
