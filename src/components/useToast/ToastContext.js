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

  const [flightdata, setflightdata] = useState(() => {
    const flightdata = localStorage.getItem('flightdata')
    return flightdata ? JSON.parse(flightdata) : []
  })

  const [flightdata2, setflightdata2] = useState(() => {
    const flightdata2 = localStorage.getItem('flightdata2')
    return flightdata2 ? JSON.parse(flightdata2) : []
  })

  const [hoadon, sethoadon] = useState(() => {
    const hoadon = localStorage.getItem('hoadon')
    return hoadon ? JSON.parse(hoadon) : {}
  })

  const [tienve, settienve] = useState(() => {
    return localStorage.getItem('tienve') || null
  })
  const [tienveve, settienveve] = useState(() => {
    return localStorage.getItem('tienveve') || null
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
  const [returnDate, setreturnDate] = useState(() => {
    return localStorage.getItem('returnDate') || ''
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
    localStorage.setItem('flightdata', JSON.stringify(flightdata))
  }, [flightdata])

  useEffect(() => {
    localStorage.setItem('flightdata2', JSON.stringify(flightdata2))
  }, [flightdata2])

  useEffect(() => {
    localStorage.setItem('date', date)
  }, [date])
  useEffect(() => {
    localStorage.setItem('returnDate', returnDate)
  }, [returnDate])

  useEffect(() => {
    localStorage.setItem('tienve', tienve)
  }, [tienve])

  useEffect(() => {
    localStorage.setItem('tienveve', tienveve)
  }, [tienveve])

  useEffect(() => {
    localStorage.setItem('hoadon', JSON.stringify(hoadon))
  }, [hoadon])

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
        returnDate,
        setreturnDate,
        mangnguoi,
        setmangnguoi,
        flightdata,
        setflightdata,
        tienve,
        settienve,
        hoadon,
        sethoadon,
        flightdata2,
        setflightdata2,
        tienveve,
        settienveve
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export default ToastProvider
