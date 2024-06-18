import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react'

function CurrencyConvert() {

  const [ rates, setRates ] =  useState({}) 
  const [ fromCurrency, setFromCurrency ] = useState('USD')
  const [ toCurrency, setToCurrency ] = useState('EUR')
  const [ amount, setAmount ] = useState(1)
  const [ convertedAmount, setConvertedAmount ] = useState(null)


useEffect(() => {

  const fetchRates = async () => {
    try {
      const response = await axios.get("https://v6.exchangerate-api.com/v6/19ba3472e27a64ec5b076747/latest/USD")
      setRates(response.data.conversion_rates)      
    }catch(error) {
      console.error("Ocorreu um erro na API!", error)
    }
  }

    fetchRates()
},[])

useEffect(() => {
  if (rates[fromCurrency] && rates[toCurrency]) {
    const conversionRate = rates[toCurrency] / rates[fromCurrency];
    setConvertedAmount((amount * conversionRate).toFixed(2));
  }
}, [amount, fromCurrency, toCurrency, rates]);

  return (    
    <div className='converter'>
      <h2 >Conversor de Moeda</h2>
      <input 
      type="text" 
      placeholder='Digite o valor' 
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      />
      <span>Selecione uma moeda</span>
      <select 
      value={fromCurrency}
      onChange={(e) => setFromCurrency(e.target.value)}
      >
        {Object.keys(rates).map((currncy) => {
          <option value={currncy} key={currncy}>{currncy}</option>
        })}
      </select>
      <span>para</span>
      <select 
      value={toCurrency} 
      onChange={(e) => setToCurrency(e.target.value)}>
       {Object.keys(rates).map((currency) => {
          <option value={currency} key={currency}>{currency}</option>
        })} 
      </select>
      <h3>
        {convertedAmount} {toCurrency}
      </h3>
      <p>{amount} {fromCurrency} valem {convertedAmount} {toCurrency}</p>
    </div>
    
  )
}

export default CurrencyConvert



