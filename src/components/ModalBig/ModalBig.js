import React from 'react'
import ReactDOM from 'react-dom'
import './ModalBig.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ModalBig = ({ isOpen, onClose, children }) => {
 
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className='ModalBig-overlay'>
    
        <div
          className='ModalBig-content'
          onClick={e => e.stopPropagation()}
        >
          <div
            className='modal-header'
          >
            <button className='ModalBig-close' onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} className='iconHuy' />
            </button>
          </div>
          {children}
        </div>
    </div>,
    document.body
  )
}

export default ModalBig
