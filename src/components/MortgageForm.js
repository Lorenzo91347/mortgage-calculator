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
          <i className='icon-top'>£</i>
          <input className='input-field' type="text" name="amount"></input>
        </div>
      </div>
      <div className='mort-term-rate'>
        <div className='field-box'>
            <label for='term' className='label'>Mortage Term</label>
            <div className='term-rate-field'>
            <input className='input-field' type="text" name="amount"></input>
            <i className='icon'>Years</i>
          </div>
        </div>
        <div className='field-box'>
            <label for='rate' className='label'>Interest Rate</label>
            <div className='term-rate-field'>
            <input className='input-field' type="text" name="amount"></input>
            <i className='icon'>£</i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MortgageForm