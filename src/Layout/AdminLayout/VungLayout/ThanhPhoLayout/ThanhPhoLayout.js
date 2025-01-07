/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import ModalBig from '../../../../components/ModalBig/ModalBig'
import { AddThanhPho } from './AddThanhPho'
import { FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { useToast } from '../../../../components/useToast/ToastContext'
import { EditThanhPho } from './EditThanhPho'
import './ThanhPhoLayout.scss'

function ThanhPhoLayout ({ isOpen, onClose, idvung }) {
  const [data, setdata] = useState([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [nameselected, setSelectedNames] = useState('')
  const [maselected, setSelectedmas] = useState('')
  const { showToast } = useToast()

  const handelclose = () => {
    setSelectedIds([])
    onClose()
  }
  const fetchthanhpho = async () => {
    if (idvung) {
      try {
        const response = await fetch(
          `https://demovemaybay.shop/getthanhpho/${idvung}`
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
    fetchthanhpho()
  }, [idvung])

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
      const selected = data.find(item => item._id === selectedIds[0])
      setSelectedNames(selected.name)
      setSelectedmas(selected.mathanhpho)
      setIsOpenEdit(true)
    } else if (selectedIds.length > 1) {
      showToast('Bạn chỉ được phép chọn 1 thành phố để cập nhật.', 'warning')
    } else {
      showToast('Vui lòng chọn 1 thành phố để cập nhật.', 'warning')
    }
  }

  return (
    <ModalBig isOpen={isOpen} onClose={handelclose}>
      <div className='thanhpho'>
        <div className='header-thanhpho'>
          <div className='divvungchonitem'>
            Thành phố đã chọn: <div>{selectedIds.length}</div>
          </div>
          <div className='divvungitem' onClick={() => setIsOpenAdd(true)}>
            <FaPlus />
            Thêm thành phố
          </div>
          <div className='divvungitem' onClick={handleUpdate}>
            <MdEdit />
            Cập nhật thành phố
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
                <th>Mã thành phố</th>
                <th>Tên thành phố</th>
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
                    <td>{item.mathanhpho}</td>
                    <td>{item.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Không có thành phố nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddThanhPho
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        fetchdata={fetchthanhpho}
        idvung={idvung}
      />
      <EditThanhPho
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        fetchdata={fetchthanhpho}
        idthanhpho={selectedIds[0]}
        tenthanhpho={nameselected}
        ma={maselected}
      />
    </ModalBig>
  )
}

export default ThanhPhoLayout
