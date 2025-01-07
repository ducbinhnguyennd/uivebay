import { useState, useEffect } from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ModalSuccess.scss'

function ModalThanhToanSuccess ({ isOpen, onClose }) {
  const [seconds, setSeconds] = useState(5)
  const [timerActive, setTimerActive] = useState(true)

  useEffect(() => {
    if (seconds === 0) {
      onClose()
    }

    let interval
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [seconds, timerActive, onClose])

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
              style={{
                marginTop: '10px',
                backgroundColor: 'rgb(1, 136, 46)',
                fontSize: '15px'
              }}
            >
              Về trang chủ{' '}
              <div className='sogiay'>
                <div className='circle' style={circleStyle}></div>
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
