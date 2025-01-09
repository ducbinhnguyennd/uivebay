import Modal from '../Modal/Modal'
import { MdDelete } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'

function ModalDelete ({ isOpen, onClose, ten, Delete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='add-vung'>
        <h4>Xóa {ten}</h4>
        <p>Bạn có chắc chắn muốn xóa {ten}?</p>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={Delete}>
              <MdDelete />
              Xóa
            </button>
            <button className='btnhuyvung' onClick={onClose}>
              <MdCancel />
              Hủy
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDelete
