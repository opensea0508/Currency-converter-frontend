import React from 'react'
import spinner from './Images/spinner.gif'


const image = {
  "marginBottom": "30px",
  "width": "60px"
}
const Spinner = () => {
  return (
    <div className='text-center'>
      <img className='image-spinner' src={spinner} alt="Loading..." style={image} />
    </div>
  )
}

export default Spinner
