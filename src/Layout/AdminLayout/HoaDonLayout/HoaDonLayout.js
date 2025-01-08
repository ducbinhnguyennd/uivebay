import { useState, useEffect } from 'react'
import { FaCity } from 'react-icons/fa'
import { useToast } from '../../../components/useToast/ToastContext'

function HoaDonLayout () {
  const [data, setData] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const { showToast } = useToast()

  const fetchVung = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/gethoadon')
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

  const handleHoaDon = () => {
    if (selectedIds.length === 1) {
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 hóa đơn để xem chi tiết.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 hóa đơn để xem chi tiết.', 'warning')
    }
  }

  return (
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Hóa đơn đã chọn: <div>{selectedIds.length}</div>
        </div>
        <div className='divvungitem' onClick={handleHoaDon}>
          <FaCity />
          Chi tiết
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
            <th>Mã hóa đơn</th>
            <th>Ngày tạo</th>
            <th>Tên liên hệ</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Ngày bay</th>
            <th>Ngày về</th>
            <th>Chuyến đi</th>
            <th>Chuyến về</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
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
                <td>{item.mahoadon}</td>
                <td>{item.ngaytao}</td>
                <td>{item.namelienhe}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.ngaybay}</td>
                <td>{item.ngayve || 'không'}</td>
                <td>{item.chuyenbay}</td>
                <td>{item.chuyenbayve || 'không'}</td>
                <td>{item.tongtien.toLocaleString()}</td>
                <td>{item.trangthai}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default HoaDonLayout
