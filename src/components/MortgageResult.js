import React from 'react'
import { useResult } from '../ResultContext';


const MortgageResult = () => {

   const { result } = useResult();
  return (
    <div className='mort-result'>
      <h3>Your Results</h3>
      <p>Your results are shown below based on the information
        you provided.To adjust the results, edit the from and 
        click the "Calculate Repayments" button again.
      </p>
      <div className='result-box'>
        <div className='result-nums'>
          <label className='monthly-repay-label'>Your Monthly Repayments</label>
          <result className='monthly-result'>{result?.monthlyPayment || '£0.00'}</result>
          <div className='divider'></div>
          <label className='monthly-repay-label'>Total you'll repay over the term</label>
          <h3 className='total'>{result?.totalRepayment|| '£0.00'}</h3>
        </div>
      </div>
      
    </div>
  )
}

export default MortgageResult
