/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import './ModalSuccess.scss'

function ModalThanhToanSuccess ({ isOpen, onClose }) {
  const [seconds, setSeconds] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    if (seconds === 0) {
      onClose()
      navigate('/')
    }

    let interval
    if (isOpen) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [seconds, isOpen, onClose])

  if (!isOpen) return null

  const circleStyle = {
    animation: `rotate ${seconds}s linear infinite`
  }

  return (
    <>
      <div className='modal-overlay3'>
        <div className='modal-content3'>
          <div className='headerthanhtoansuccess'>
            <FontAwesomeIcon icon={faCheck} />
            <h3>Thanh toán thành công</h3>
          </div>
          <hr className='hrthanhtoansuccess' />
          <div className='divtextfootersuccess'>
            <p>Thanh toán của bạn đã thành công</p>
            <p>Cảm ơn đã tin tưởng sử dụng dịch vụ!</p>
          </div>
          <div className='divbtnthanhtoansuccess'>
            <button
              className='btnthanhtoansuccess'
            >
              Về trang chủ{' '}
              <div className='sogiay'>
                <div className='circle1' style={circleStyle}></div>
                <span>{seconds} giây</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalThanhToanSuccess
