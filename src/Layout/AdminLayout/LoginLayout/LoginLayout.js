import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginLayout.scss'
import { Image as ImageLogin } from '../../../components/ImageLogin'
import { publicRoutes } from '../../../router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useToast } from '../../../components/useToast/ToastContext'
function Login () {
  const [showPassword, setShowPassword] = useState(false)
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setusernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()
  const { showToast } = useToast()
  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    if (userId) {
      navigate(publicRoutes[1].path)
    }
  }, [navigate])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleRememberMeChange = e => {
    setRememberMe(e.target.checked)
  }

  const validateInputs = () => {
    let valid = true

    if (!username) {
      setusernameError('Vui lòng nhập username.')
      valid = false
    } else {
      setusernameError('')
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu.')
      valid = false
    } else {
      setPasswordError('')
    }
    return valid
  }

  const handleLogin = async () => {
    if (validateInputs()) {
      setIsLoading(true)
      try {
        const response = await fetch('https://demovemaybay.shop/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })

        const data = await response.json()

        if (data.message) {
          showToast(data.message, 'error')
        } else {
          const userId = data._id
          if (rememberMe) {
            sessionStorage.setItem('userId', userId)
          } else {
            sessionStorage.setItem('userId', userId)
          }
          showToast('Đăng nhập thành công!')
          navigate('/vung')
        }
      } catch (error) {
        showToast(
          'Đã xảy ra lỗi khi gửi yêu cầu đăng nhập. Vui lòng thử lại.',
          'error'
        )
      } finally {
        setIsLoading(false)
      }
    }
  }
  return (
    <div className='container1'>
      <div className='dualscreen1'>
        <ImageLogin />
      </div>
      <div className='dualscreen2'>
        <div className='divlogin'>
          <h1>Đăng Nhập</h1>
          <div className='divusername'>
            <div className='divusername1'>
              <input
                className={`username ${usernameError ? 'input-error' : ''}`}
                placeholder=' '
                value={username}
                onChange={e => setusername(e.target.value)}
              />
              <label className='label'>username</label>
            </div>
            {usernameError && <div className='error'>{usernameError}</div>}
          </div>
          <div className='divpassword'>
            <div className='divippass'>
              <input
                className={`password ${passwordError ? 'input-error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder=' '
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setIsIconVisible(true)}
              />
              <label className='label'>Password</label>
              {isIconVisible && (
                <button className='eye' onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              )}
            </div>
            {passwordError && <div className='error'>{passwordError}</div>}
          </div>
          <div className='login-options'>
            <div className='remember-me'>
              <input
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor='rememberMe'>Nhớ mật khẩu</label>
            </div>
            <div className='forgot-password'>
              <a href='/forgot-password'>Quên mật khẩu?</a>
            </div>
          </div>

          <button
            className='btnLogin'
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? <div className='loading-spinner'></div> : 'Đăng Nhập'}
          </button>
          <div className='chinhsach'>
            <h4>
              TRANG WEB NÀY ĐƯỢC BẢO MẬT BỞI HCAPTCHA VÀ TUÂN THỦ THEO{' '}
              <a href='https://www.hcaptcha.com/privacy'>
                CHÍNH SÁCH QUYỀN RIÊNG TƯ
              </a>{' '}
              VÀ{' '}
              <a href='https://www.hcaptcha.com/terms'>
                ĐIỀU KHOẢN DỊCH VỤ CỦA HCAPTCHA
              </a>{' '}
              .
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
