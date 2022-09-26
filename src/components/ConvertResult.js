import React from 'react'

const ConvertResult = ({ rate }) => {
  return (
    <>
      {
        rate && (
          <>
            <h4 className="rate ">Rate : {Math.round(rate*100)/100}</h4>
          </>
        )
      }
    </>
  )
}

export default ConvertResult
