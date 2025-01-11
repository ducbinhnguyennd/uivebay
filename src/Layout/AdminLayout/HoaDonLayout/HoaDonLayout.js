import { useState, useEffect } from 'react'
import { useToast } from '../../../components/useToast/ToastContext'
import { publicRoutes } from '../../../router'
import { useNavigate } from 'react-router-dom'
import { GiConfirmed } from 'react-icons/gi'
import { ModalDuyet } from '../../../components/ModalDuyet'
import { ChitiethoadonAdmin } from './ChiTietHoaDon'
import { ModalDelete } from '../../../components/ModalDelete'
import { MdDelete } from 'react-icons/md'
import { CgDetailsMore } from 'react-icons/cg'

function HoaDonLayout () {
  const [data, setData] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [isOpenDuyet, setIsOpenDuyet] = useState(false)
  const [isOpenchitiet, setIsOpenchitiet] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      navigate(publicRoutes[1].path)
    }
  }, [navigate])

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

  const handleDuyet = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/postthanhtoan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idhoadonList: selectedIds })
      })
      if (response.ok) {
        fetchVung()
        setSelectedIds([])
        setIsOpenDuyet(false)
        showToast('Duyệt thanh toán thành công', 'success')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const Handelduyet = () => {
    if (selectedIds.length > 0) {
      setIsOpenDuyet(true)
    } else {
      showToast('Vui lòng chọn ít nhất 1 hóa đơn để duyệt.', 'warning')
    }
  }

  const handleChitiet = () => {
    if (selectedIds.length === 1) {
      setIsOpenchitiet(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 hóa đơn để xem chi tiết.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 hóa đơn để xem chi tiết.', 'warning')
    }
  }

  const Delete = async () => {
    try {
      const response = await fetch(`https://demovemaybay.shop/deletehoadon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idhoadons: selectedIds })
      })
      if (response.ok) {
        fetchVung()
        setSelectedIds([])
        showToast('Xóa hóa đơn thành công', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Handeldelte = () => {
    if (selectedIds.length > 0) {
      setIsOpenDelete(true)
    } else {
      showToast('Vui lòng chọn ít nhất 1 hóa đơn để xóa.', 'warning')
    }
  }

  return (
    <div className='vung-container'>
      <div className='vung-header'>
        <div className='divvungchonitem'>
          Hóa đơn đã chọn: <div>{selectedIds.length}</div>
        </div>
        <div className='divvungitem' onClick={handleChitiet}>
          <CgDetailsMore />
          Chi tiết
        </div>
        <div className='divvungitem' onClick={Handelduyet}>
          <GiConfirmed />
          Duyệt thanh toán
        </div>
        <div className='divvungitem' onClick={Handeldelte}>
          <MdDelete />
          Xóa hóa đơn
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
      <ModalDuyet
        isOpen={isOpenDuyet}
        onClose={() => setIsOpenDuyet(false)}
        ten={'hóa đơn'}
        Confirm={handleDuyet}
      />
      <ChitiethoadonAdmin
        isOpen={isOpenchitiet}
        onClose={() => setIsOpenchitiet(false)}
        idhoadon={selectedIds[0]}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        ten='hóa đơn'
        Delete={Delete}
      />
    </div>
  )
}

export default HoaDonLayout
