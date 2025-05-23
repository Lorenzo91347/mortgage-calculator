import React from 'react'

const checkbox1 = document.getElementById('checkbox-1');
const checkbox2 = document.getElementById('checkbox-2');

function handleToggle(checkedInput, otherInput) {
  if (checkedInput.checked) {
    checkedInput.checked = true;
    checkedInput.closest('.radio-single').classList.add('checked');

    otherInput.checked = false;
    otherInput.closest('.radio-single').classList.remove('checked');
  } else {
    checkedInput.closest('.radio-single').classList.remove('checked');
  }
};
checkbox1.addEventListener('change', () => handleToggle(checkbox1, checkbox2));
checkbox2.addEventListener('change', () => handleToggle(checkbox2, checkbox1));

let amount = 0;
let repayment = 0;
let interest = 0;


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
          <input className='input-field-1' type="text" name="amount"></input>
        </div>
      </div>
      <div className='mort-term-rate'>
        <div className='field-box'>
            <label for='term' className='label'>Mortage Term</label>
            <div className='term-rate-field'>
            <input className='input-field-2' type="text" name="term"></input>
            <i className='icon'>Years</i>
          </div>
        </div>
        <div className='field-box'>
            <label for='rate' className='label'>Interest Rate</label>
            <div className='term-rate-field'>
            <input className='input-field-2' type="text" name="rate"></input>
            <i className='icon'>%</i>
          </div>
        </div>
      </div>
      <div className='mort-type'>
        <label for='type' className='label'>Mortgage Type</label>
        <div className='radios-cnt'>
          <div className='radio-single'>
            <input type='checkbox' id='checkbox-1' value={repayment}></input>
            <label for='repayment' className='radio-label'>Repayment</label>
          </div>
          <div className='radio-single'>
            <input type='checkbox'id='checkbox-2' value={interest}></input>
            <label for='interest' className='radio-label'>Interest Only</label>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MortgageForm;