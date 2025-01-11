/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './DatGhe.scss'
import { RiSofaLine } from 'react-icons/ri'

const DatGhe = ({
  selectedSeat,
  setSelectedSeat,
  tiendatghe,
  settiendatghe,
  name,
  datghe,
  setdatghe,
  idhoadon,
  hoadondatghe,
  hoadonghe,
  sethoadon,
  hoadon
}) => {
  const rows = 12
  const cols = ['A', 'B', 'C', 'D', 'E', 'F']

  const [occupiedSeats] = useState([
    '1A',
    '1B',
    '1C',
    '1D',
    '1E',
    '1F',
    '2A',
    '2B',
    '2C',
    '2D',
    '2E',
    '2F',
    '3A',
    '3B',
    '3C',
    '3D',
    '3E',
    '3F'
  ])

  useEffect(() => {
    if (hoadondatghe && hoadonghe) {
      setSelectedSeat(hoadonghe)
      setdatghe(true)
    }
  }, [hoadondatghe, hoadonghe, setSelectedSeat, settiendatghe, setdatghe])

  const handleSeatClick = seat => {
    if (hoadondatghe) {
      return
    }

    if (!occupiedSeats.includes(seat)) {
      setSelectedSeat(seat)
      settiendatghe(20000)
      setdatghe(true)
    }
  }

  const handledatghe = async () => {
    try {
      const response = await fetch(
        `https://demovemaybay.shop/postchonghe/${idhoadon}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            datghe,
            ghe: selectedSeat,
            tiendatghe
          })
        }
      )
      const data = await response.json()
      if (response.ok) {
        alert('Đặt ghế thành công!')
        settiendatghe(0)
        sethoadon(data)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlehuydatghe = async () => {
    try {
      const response = await fetch(
        `https://demovemaybay.shop/huychonghe/${idhoadon}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      if (response.ok) {
        alert('Hủy đặt ghế thành công!')
        sethoadon(data)
        settiendatghe(0)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='seat-selection-container'>
      <h3>Chọn ghế ngồi trên máy bay:</h3>
      {datghe && (
        <div className='divheaderdatghe'>
          <div className='passenger-details'>
            <span>Anh: {name}</span>
            <div className='seat-info'>
              <div className='seat'>{selectedSeat}</div>
              {!hoadondatghe && (
                <span
                  className='remove'
                  onClick={() => {
                    setSelectedSeat('')
                    settiendatghe(0)
                    setdatghe(false)
                  }}
                >
                  Xóa
                </span>
              )}
            </div>
          </div>
          {!hoadondatghe ? (
            <button className='confirm-btn' onClick={handledatghe}>
              Xác nhận chọn ghế (Phí: {tiendatghe.toLocaleString()})
            </button>
          ) : (
            <button className='confirm-btn' onClick={handlehuydatghe}>
              Hủy đặt ghế
            </button>
          )}
        </div>
      )}
      <div className='column-header'>
        <div className='seats-left'>
          {cols.slice(0, cols.length / 2).map(col => (
            <div key={col} className='column-name'>
              {col}
            </div>
          ))}
        </div>
        <div className='spacer' />
        <div className='seats-right'>
          {cols.slice(cols.length / 2).map(col => (
            <div key={col} className='column-name'>
              {col}
            </div>
          ))}
        </div>
      </div>

      <div className='seating-grid'>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className='row'>
            <div className='seats-left'>
              {cols.slice(0, cols.length / 2).map(col => {
                const seat = `${rowIndex + 1}${col}`
                const isOccupied = occupiedSeats.includes(seat)
                const isSelected = selectedSeat === seat

                return (
                  <div
                    key={seat}
                    className={`seat ${isOccupied ? 'occupied' : ''} ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    <RiSofaLine />
                    {isOccupied ? 'X' : ''}
                  </div>
                )
              })}
            </div>

            <div className='row-number'>{rowIndex + 1}</div>

            <div className='seats-right'>
              {cols.slice(cols.length / 2).map(col => {
                const seat = `${rowIndex + 1}${col}`
                const isOccupied = occupiedSeats.includes(seat)
                const isSelected = selectedSeat === seat

                return (
                  <div
                    key={seat}
                    className={`seat ${isOccupied ? 'occupied' : ''} ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    <RiSofaLine />
                    {isOccupied ? 'X' : ''}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DatGhe
