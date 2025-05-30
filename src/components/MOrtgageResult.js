import React from 'react'

const MortgageResult = () => {
  return (
    <div className='mort-result'>
      <h3>Your Results</h3>
      <p>Your results are shown below based on the information
        you provided.To adjust the results, edit the from and 
        click the "Calculate Repayments" button again.
      </p>
      <div className='result-box'>
        <div className='result-nums'>
          <label className='monthly-label'>Monthly Repayments</label>
          <result className='monthly-result'></result>
        </div>
      </div>
      
    </div>
  )
}

export default MortgageResult