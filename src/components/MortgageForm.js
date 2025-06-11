import { useEffect } from 'react';
import { useState } from 'react';


import CalcLogo from '../icons/icon-calculator.svg';




const MortgageForm = () => {
  const[amount,setAmount] = useState(0);
  const[term,setTerm] = useState(0);
  const[interest,setInterest] = useState(0);
  const[repay,setRepay] = useState(false);
  const[intonly,setIntOnly] = useState(false);
  const[result, setResult] = useState('');

   const handleRepayChange = (checked) => {
    setRepay(checked);
    if (checked) setIntOnly(false);
  };
   const handleIntOnlyChange = (checked) => {
    setIntOnly(checked);
    if (checked) setRepay(false);
  };

  const calculateRepayment = () => {
  const principal = Number(amount);
  const years = Number(term);
  const annualInterestRate = Number(interest);

  if (principal <= 0 || years <= 0 || annualInterestRate < 0) {
    return null;
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalPayments = years * 12;

  let monthlyPayment = 0;
  let totalRepayment = 0;

  if (repay) {
    const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
    monthlyPayment = numerator / denominator;
    totalRepayment = monthlyPayment * totalPayments;
  } else if (intonly) {
    monthlyPayment = (principal * annualInterestRate) / 12 / 100;
    totalRepayment = monthlyPayment * totalPayments;
  } else {
    return null;
  }

  return {
    monthlyPayment: formatCurrency(monthlyPayment),
    totalRepayment: formatCurrency(totalRepayment)
    };
  };
  const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
    }).format(value);
  };
 
   
  useEffect(() => {
    const checkbox1 = document.getElementById('checkbox-1');
    const checkbox2 = document.getElementById('checkbox-2');

    function handleToggle(checkedInput, otherInput) {
      if (checkedInput.checked) {
        checkedInput.checked = true;
        checkedInput.closest('.radio-single')?.classList.add('checked');

        otherInput.checked = false;
        otherInput.closest('.radio-single')?.classList.remove('checked');
      } else {
        checkedInput.closest('.radio-single')?.classList.remove('checked');
      }
    }

    if (checkbox1 && checkbox2) {
      checkbox1.addEventListener('change', () => handleToggle(checkbox1, checkbox2));
      checkbox2.addEventListener('change', () => handleToggle(checkbox2, checkbox1));

      // Unmount
      return () => {
        checkbox1.removeEventListener('change', () => handleToggle(checkbox1, checkbox2));
        checkbox2.removeEventListener('change', () => handleToggle(checkbox2, checkbox1));
      };
    }
  }, []);
  return (
    <div className='mort-form'>
      <div className='form-top'>
        <h2>Mortgage Calculator</h2>
        <button className='clear'>Clear All</button>
      </div>

      <div className='mortgage-amount'>
        <label for='amount' className='label'>Mortage Amount</label>
        <div className='amount'>
          <i className='icon-top'>£</i>
          <input className='input-field-1' type="text" name="amount" value={amount}
        onChange={e => setAmount(e.target.value)}></input>
        </div>
      </div>
      <div className='mort-term-rate'>
        <div className='field-box'>
            <label for='term' className='label'>Mortage Term</label>
            <div className='term-rate-field'>
            <input className='input-field-2' type="text" name="term" value={term}
        onChange={e => setTerm(e.target.value)}></input>
            <i className='icon'>Years</i>
          </div>
        </div>
        <div className='field-box'>
            <label for='rate' className='label'>Interest Rate</label>
            <div className='term-rate-field'>
            <input className='input-field-2' type="text" name="rate" value={interest}
        onChange={e => setInterest(e.target.value)}></input>
            <i className='icon'>%</i>
          </div>
        </div>
      </div>
      <div className='mort-type'>
        <label for='type' className='label'>Mortgage Type</label>
        <div className='radios-cnt'>
          <div className='radio-single'>
            <input type='checkbox' id='checkbox-1' checked={repay} onChange={(e) => handleRepayChange(e.target.checked)}></input>
            <label for='repayment' className='radio-label'>Repayment</label>
          </div>
          <div className='radio-single'>
            <input type='checkbox'id='checkbox-2' checked={intonly} onChange={(e) => handleIntOnlyChange(e.target.checked)}></input>
            <label for='interest' className='radio-label'>Interest Only</label>
          </div>
          
        </div>
        <button className='submit' type='submit' onClick={() => setResult(calculateRepayment())}>
          <img src={CalcLogo} className='calc-logo' alt='calc-logo'/>
          <span>Calculate Repayments</span>
        </button>
      </div>
    </div>
  )
}

export default MortgageForm;