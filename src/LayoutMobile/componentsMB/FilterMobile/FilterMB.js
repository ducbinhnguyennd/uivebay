/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './FilterMB.scss';

const FilterMB = ({ filters, onFiltersChange, setFilters }) => {
  const handleSortChange = (e) => {
    onFiltersChange({ ...filters, sortBy: e.target.value }, setFilters);
  };

  return (
    <div className="filter-containermb">
      <div className="filter-title">Sắp xếp</div>
      <div className="filter-row">
        <div className="filter-item">
          <input
            id="sort-1"
            type="radio"
            value="abay-suggest"
            name="groupSort"
            onChange={handleSortChange}
            checked={filters.sortBy === 'abay-suggest'}
          />
          <label htmlFor="sort-1">Giá cơ bản</label>
        </div>
        <div className="filter-item">
          <input
            id="sort1"
            type="radio"
            value="price"
            name="groupSort"
            onChange={handleSortChange}
            checked={filters.sortBy === 'price'}
          />
          <label htmlFor="sort1">Giá (Thấp tới Cao)</label>
        </div>
        <div className="filter-item">
          <input
            id="sort2"
            type="radio"
            value="time"
            name="groupSort"
            onChange={handleSortChange}
            checked={filters.sortBy === 'time'}
          />
          <label htmlFor="sort2">Giờ bay</label>
        </div>
      </div>
      <div className="filter-row">
        
        <div className="filter-item">
          <input
            id="sort3"
            type="radio"
            value="airline"
            name="groupSort"
            defaultChecked
            onChange={handleSortChange}
            checked={filters.sortBy === 'airline'}
          />
          <label htmlFor="sort3">Hãng hàng không</label>
        </div>
      </div>
    </div>
  );
};

export default FilterMB;
