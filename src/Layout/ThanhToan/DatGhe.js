import React, { useState } from 'react'
import './DatGhe.scss'
import { RiSofaLine } from 'react-icons/ri'

const DatGhe = ({
  selectedSeat,
  setSelectedSeat,
  tiendatghe,
  settiendatghe,
  name,
  datghe,
  setdatghe
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

  const handleSeatClick = seat => {
    if (!occupiedSeats.includes(seat)) {
      setSelectedSeat(seat)
      settiendatghe(43000)
      setdatghe(true)
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
            </div>
          </div>
          <button className='confirm-btn'>
            Xác nhận chọn ghế (Phí: {tiendatghe.toLocaleString()})
          </button>
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
