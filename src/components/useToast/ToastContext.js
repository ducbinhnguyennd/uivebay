import React, { createContext, useContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

const ToastProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(() => {
    const savedData = localStorage.getItem('searchData')
    return savedData ? JSON.parse(savedData) : []
  })
  const [mangnguoi, setmangnguoi] = useState(() => {
    const mangnguoi = localStorage.getItem('mangnguoi')
    return mangnguoi ? JSON.parse(mangnguoi) : []
  })

  const [cityfrom, setcityfrom] = useState(() => {
    return localStorage.getItem('cityfrom') || ''
  })

  const [cityto, setcityto] = useState(() => {
    return localStorage.getItem('cityto') || ''
  })

  const [mafrom, setmafrom] = useState(() => {
    return localStorage.getItem('mafrom') || ''
  })

  const [mato, setmato] = useState(() => {
    return localStorage.getItem('mato') || ''
  })

  const [date, setdate] = useState(() => {
    return localStorage.getItem('date') || ''
  })

  useEffect(() => {
    localStorage.setItem('cityfrom', cityfrom)
  }, [cityfrom])

  useEffect(() => {
    localStorage.setItem('cityto', cityto)
  }, [cityto])

  useEffect(() => {
    localStorage.setItem('mafrom', mafrom)
  }, [mafrom])

  useEffect(() => {
    localStorage.setItem('mato', mato)
  }, [mato])

  useEffect(() => {
    localStorage.setItem('searchData', JSON.stringify(searchData))
  }, [searchData])

  useEffect(() => {
    localStorage.setItem('mangnguoi', JSON.stringify(mangnguoi))
  }, [mangnguoi])

  useEffect(() => {
    localStorage.setItem('date', date)
  }, [date])

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
        setcityto,
        mafrom,
        setmafrom,
        mato,
        setmato,
        date,
        setdate,
        mangnguoi,
        setmangnguoi
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export default ToastProvider
