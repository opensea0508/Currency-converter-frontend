import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/api';

const label = {
  "width": "325px",
  "color": "white",
  "fontSize": "21px"
}

const Dropdowns = ({ labelName, handleChange, value, data }) => {
  const [currencyName, setCurrencyName] = useState([]);
  useEffect(() => {
    axios.get(BASE_URL)
        .then(response => {
            const result = Object.keys(response.data.data).map((key) => [key, response.data.data[key]]);
            let tempCurrencyName = [];
            result.map((item) => {
                tempCurrencyName.push(item[0]);
            })
            setCurrencyName(tempCurrencyName);
        })
        .catch(error => console.log(error));
}, [])

  return (
    <>
      <label className="dropdown" style={label}>
        {labelName}
        <select
          className='form-select bg-dark custom-select form-select-lg text-white border-dark shadow'
          value={value}
          onChange={event => handleChange(event)}
        >
          {currencyName.map((item, index) =>
            <option key={index}>{item}</option>
          )}
        </select>
      </label>
    </>
  )
}


export default Dropdowns