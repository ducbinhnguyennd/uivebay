import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { useToast } from '../../../components/useToast/ToastContext'
import { AddNganHang } from './AddNganHang'
import { EditNganHang } from './EditNganHang'
import { ModalDelete } from '../../../components/ModalDelete'
import { MdDelete } from 'react-icons/md'

function NganHangLayout () {
  const [data, setData] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()
  const [tennganhang, settennganhang] = useState('')
  const [tendaydu, settendaydu] = useState('')

  const [tentaikhoan, settentaikhoan] = useState('')

  const [sotaikhoan, setsotaikhoan] = useState('')
  const [chinhanh, setchinhanh] = useState('')

  const fetchVung = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getnganhang')
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
      const selectedTennganhang = data.find(
        item => item._id === selectedIds[0]
      )?.tennganhang
      const selectedTendaydu = data.find(
        item => item._id === selectedIds[0]
      )?.tendaydu
      const selectedTentaikhoan = data.find(
        item => item._id === selectedIds[0]
      )?.tentaikhoan
      const selectedSotaikhoan = data.find(
        item => item._id === selectedIds[0]
      )?.sotaikhoan
      const selectedChinhanh = data.find(
        item => item._id === selectedIds[0]
      )?.chinhanh

      settennganhang(selectedTennganhang)
      settendaydu(selectedTendaydu)
      settentaikhoan(selectedTentaikhoan)
      setsotaikhoan(selectedSotaikhoan)
      setchinhanh(selectedChinhanh)

      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 ngân hàng để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 ngân hàng để cập nhật.', 'warning')
    }
  }

  const Delete = async () => {
    try {
      const response = await fetch(`https://demovemaybay.shop/deletenganhang`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: selectedIds })
      })
      if (response.ok) {
        fetchVung()
        setSelectedIds([])
        showToast('Xóa ngân hàng thành công', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Handeldelte = () => {
    if (selectedIds.length > 0) {
      setIsOpenDelete(true)
    } else {
      showToast('Vui lòng chọn ít nhất 1 ngân hàng để xóa.', 'warning')
    }
  }

  return (
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Ngân Hàng đã chọn: <div>{selectedIds.length}</div>
        </div>
        <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
          <FaPlus />
          Thêm ngân hàng
        </div>
        <div className='divvungitem' onClick={handleUpdate}>
          <MdEdit />
          Cập nhật ngân hàng
        </div>
        <div className='divvungitem' onClick={Handeldelte}>
          <MdDelete />
          Xóa ngân hàng
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
            <th>Ảnh</th>
            <th>Tên ngân hàng</th>
            <th>Tên đầy đủ</th>
            <th>Tên tài khoản</th>
            <th>Số tài khoản</th>
            <th>Chi nhánh</th>
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
                <td>
                  <img src={`${item.image}`} alt='' />
                </td>
                <td>{item.tennganhang}</td>
                <td>{item.tendaydu}</td>
                <td>{item.tentaikhoan}</td>
                <td>{item.sotaikhoan}</td>
                <td>{item.chinhanh}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddNganHang
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchVung}
      />
      <EditNganHang
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchVung}
        tennh={tennganhang}
        tendd={tendaydu}
        tentk={tentaikhoan}
        sotk={sotaikhoan}
        chiNh={chinhanh}
        idnganhang={selectedIds[0]}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        ten='ngân hàng'
        Delete={Delete}
      />
    </div>
  )
}

export default NganHangLayout
