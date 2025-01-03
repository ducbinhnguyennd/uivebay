import React, { createContext, useContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

const ToastProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([])
  const [cityfrom, setcityfrom] = useState(() => {
    return localStorage.getItem('cityfrom') || ''
  })
  const [cityto, setcityto] = useState(() => {
    return localStorage.getItem('cityto') || ''
  })

  useEffect(() => {
    localStorage.setItem('cityfrom', cityfrom)
  }, [cityfrom])

  useEffect(() => {
    localStorage.setItem('cityto', cityto)
  }, [cityto])

  const showToast = (message, type = 'success') => {
    toast[type](message)
  }

  return (
    <ToastContext.Provider
      value={{
        showToast,
        searchData,
        setSearchData,
        cityfrom,
        setcityfrom,
        cityto,
        setcityto
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export default ToastProvider
