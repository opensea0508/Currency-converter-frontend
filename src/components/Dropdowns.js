import React from 'react'

const Dropdowns = ({ currencyCode, handleChange, value }) => {

  return (
    <>
      <label className="dropdown">
        <select
          className='form-select bg-dark custom-select form-select-lg text-white border-dark shadow'
          value={value}
          onChange={event => handleChange(event)}
        >
          {currencyCode.map((item, index) =>
            <option key={index}>{item}</option>
          )}
        </select>
      </label>
    </>
  )
}


export default Dropdowns