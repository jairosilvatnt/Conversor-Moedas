import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CurrencyConvert() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Requisição da API.
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://v6.exchangerate-api.com/v6/19ba3472e27a64ec5b076747/latest/USD");
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Ocorreu um erro na API!", error);
      }
    };

    fetchRates();
  }, []);


  //
  useEffect(() => {
    // se a contação "da moeda" &&  cotaçao "para a moeda"
    if (rates[fromCurrency] && rates[toCurrency]) {
      const conversionRate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * conversionRate).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (    
    <div>
      <h2>Conversor de Moedas</h2>
      <input 
        type="text" 
        placeholder="Digite o valor" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <span>Selecione uma moeda:</span>
        <select 
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>Para:</span>
        <select 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <h3>{convertedAmount} {toCurrency}</h3>
      <p>{amount} {fromCurrency} valem {convertedAmount} {toCurrency}</p>
    </div>    
  );
}

export default CurrencyConvert;
