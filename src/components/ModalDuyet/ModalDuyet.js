import Modal from '../Modal/Modal'
import { GiConfirmed } from 'react-icons/gi'
import { MdCancel } from 'react-icons/md'

function ModalDelete ({ isOpen, onClose, ten, Confirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='add-vung'>
        <h4>Duyệt {ten}</h4>
        <p>Bạn có chắc chắn muốn duyệt {ten}?</p>
        <div className='footeraddvung'>
          <div className='rong'></div>
          <div className='btnfoot'>
            <button className='btnaddvung' onClick={Confirm}>
              <GiConfirmed />
              Xác nhận
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
