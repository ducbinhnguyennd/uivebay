import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { useToast } from '../../../components/useToast/ToastContext'
import { useNavigate } from 'react-router-dom'
import { publicRoutes } from '../../../router'
import { AddVoucher } from './AddVoucher'
import { EditVoucher } from './EditVoucher'
import { MdDelete } from 'react-icons/md'
import { ModalDelete } from '../../../components/ModalDelete'

function VungLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()
  const [sotienselected, setsotienselected] = useState('')
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      navigate(publicRoutes[1].path)
    }
  }, [navigate])

  const fetchVung = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getvoucher')
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
      const selectedSotien = data.find(
        item => item._id === selectedIds[0]
      )?.sotien
      setsotienselected(selectedSotien)
      console.log(sotienselected)
      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 voucher để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 voucher để cập nhật.', 'warning')
    }
  }

  const Delete = async () => {
    try {
      const response = await fetch(`https://demovemaybay.shop/deletevouchers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idvouchers: selectedIds })
      })
      if (response.ok) {
        fetchVung()
        setSelectedIds([])
        showToast('Xóa voucher thành công', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Handeldelte = () => {
    if (selectedIds.length > 0) {
      setIsOpenDelete(true)
    } else {
      showToast('Vui lòng chọn ít nhất 1 voucher để xóa.', 'warning')
    }
  }

  return (
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Voucher đã chọn: <div>{selectedIds.length}</div>
        </div>
        <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
          <FaPlus />
          Thêm voucher
        </div>
        <div className='divvungitem' onClick={handleUpdate}>
          <MdEdit />
          Cập nhật voucher
        </div>
        <div className='divvungitem' onClick={Handeldelte}>
          <MdDelete />
          Xóa Voucher
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
            <th>Mã Voucher</th>
            <th>Số Tiền</th>
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
                <td>{item.mavoucher}</td>
                <td>{item.sotien.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddVoucher
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchVung}
      />
      <EditVoucher
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchVung}
        soTien={sotienselected}
        idvoucher={selectedIds[0]}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        ten='voucher'
        Delete={Delete}
      />
    </div>
  )
}

export default VungLayout
