import { useEffect } from 'react';
import { useState } from 'react';
import { useResult } from '../ResultContext';


import CalcLogo from '../icons/icon-calculator.svg';




const MortgageForm = () => {
  const[amount,setAmount] = useState(0);
  const[term,setTerm] = useState(0);
  const[interest,setInterest] = useState(0);
  const[repay,setRepay] = useState(false);
  const[intonly,setIntOnly] = useState(false);
   const { setResult } = useResult();
   
   const handleRepayChange = (checked) => {
    setRepay(checked);
    if (checked) setIntOnly(false);
  };
   const handleIntOnlyChange = (checked) => {
    setIntOnly(checked);
    if (checked) setRepay(false);
  };

  const handleReset = () => {
  setAmount("");
  setTerm("");
  setInterest("");
  setRepay(false);
  setIntOnly(false);
};

  

const calculateRepayment = () => {
  const errors = [];

  let monthlyPayment = 0;
  let totalRepayment = 0;

  // Check leading zero
  const hasLeadingZero = (value) => /^0\d+/.test(value);

  // Validate amount
  if (!amount) {
    errors.push("Amount is required.");
  } else if (hasLeadingZero(amount)) {
    errors.push("Amount cannot start with 0.");
  } else if (isNaN(Number(amount))) {
    errors.push("Amount must be a number.");
  } else {
    const principal = Number(amount);
    if (principal < 100) errors.push("Amount must be at least 3 digits (≥ 100).");
    if (principal > 1000000) errors.push("Amount must not exceed 1,000,000.");
  }

  // Validate term
  if (!term) {
    errors.push("Term is required.");
  } else if (hasLeadingZero(term)) {
    errors.push("Term cannot start with 0.");
  } else if (isNaN(Number(term)) || Number(term) <= 0) {
    errors.push("Term must be a valid number greater than 0.");
  } else if(term.length > 2){
    errors.push("Term cannot be 3 digits.")
  }

  // Validate interest
  if (interest === "") {
    errors.push("Interest rate is required.");
  } else if (hasLeadingZero(interest)) {
    errors.push("Interest rate cannot start with 0.");
  } else if (isNaN(Number(interest)) || Number(interest) < 0) {
    errors.push("Interest rate must be a non-negative number.");
  }

  // Validate repayment type
  if (!repay && !intonly) {
    errors.push("Please select a repayment type.");
  }

  // Show all errors at once if any
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return setResult; // ✅ kept as requested
  }

  // Proceed with calculation
  const principal = Number(amount);
  const years = Number(term);
  const annualInterestRate = Number(interest);
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalPayments = years * 12;

  if (repay) {
    const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
    monthlyPayment = numerator / denominator;
    totalRepayment = monthlyPayment * totalPayments;
  } else if (intonly) {
    monthlyPayment = (principal * annualInterestRate) / 12 / 100;
    totalRepayment = monthlyPayment * totalPayments;
  } else {
    alert("Please select a repayment type.");
    return setResult; // ✅ still here
  }

  return {
    monthlyPayment: formatCurrency(monthlyPayment),
    totalRepayment: formatCurrency(totalRepayment),
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
        <button className='clear' onClick={handleReset}>Clear All</button>
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