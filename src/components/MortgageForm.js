import React from 'react'

const MortgageForm = () => {
  return (
    <div className='mort-form'>
      <div className='form-top'>
        <h2>Mortgage Calculator</h2>
        <button>Clear All</button>
      </div>
      <div className='mortgage-amount'>
        <label for='amount' className='label'>Mortage Amount</label>
        <div className='amount'>
          <i className='icon'>£</i>
          <input className='input-field' type="text" name="amount"></input>
        </div>
      </div>
    </div>
  )
}

export default MortgageForm