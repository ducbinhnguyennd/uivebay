/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useToast } from '../../../components/useToast/ToastContext'
import './FilterMB.scss'

const FilterMB = ({ filters, onFiltersChange, setFilters }) => {
  const [data, setdata] = useState([])
  const { mato, mafrom } = useToast()

  const fetchthanhpho = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/getfulltp')
      const data = await response.json()
      if (response.ok) {
        setdata(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchthanhpho()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isInVietnam = (code, data) => {
    return data.some(
      item =>
        item.namevung === 'Việt Nam' &&
        item.thanhpho.some(place => place.mathanhpho === code)
    )
  }
  console.log(data)

  const isDepartureInVietnam = isInVietnam(mafrom, data)
  const isArrivalInVietnam = isInVietnam(mato, data)

  const handleSortChange = e => {
    onFiltersChange({ ...filters, sortBy: e.target.value }, setFilters)
  }

  return (
    <div className='filter-containermb'>
      <div className='filter-title'>Sắp xếp</div>
      <div className='filter-row'>
        <div className='filter-item'>
          <input
            id='sort-1'
            type='radio'
            value='abay-suggest'
            name='groupSort'
            onChange={handleSortChange}
            checked={filters.sortBy === 'abay-suggest'}
          />
          <label htmlFor='sort-1'>Giá cơ bản</label>
        </div>
        <div className='filter-item'>
          <input
            id='sort1'
            type='radio'
            value='price'
            name='groupSort'
            onChange={handleSortChange}
            checked={filters.sortBy === 'price'}
          />
          <label htmlFor='sort1'>Giá (Thấp tới Cao)</label>
        </div>
        <div className='filter-item'>
          <input
            id='sort2'
            type='radio'
            value='time'
            name='groupSort'
            onChange={handleSortChange}
            checked={filters.sortBy === 'time'}
          />
          <label htmlFor='sort2'>Giờ bay</label>
        </div>
      </div>
      {(isDepartureInVietnam && isArrivalInVietnam) && (
        <div className='filter-row'>
          <div className='filter-item'>
            <input
              id='sort3'
              type='radio'
              value='airline'
              name='groupSort'
              defaultChecked
              onChange={handleSortChange}
              checked={filters.sortBy === 'airline'}
            />
            <label htmlFor='sort3'>Hãng hàng không</label>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterMB
