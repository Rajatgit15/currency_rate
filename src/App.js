import React, { useEffect, useState } from 'react';
import './App.css';
import Row from './Row'


  const API =  'https://api.exchangeratesapi.io/latest'

function App(){


  const[currencyOption, setCurencyOption] = useState([])
  const[fromCurrency, setFromCurrency]= useState()
  const[toCurrency, setToCurrency]= useState()
  const [exchangeRates, setExchangeRates]= useState()
  const [amount, setAmount]= useState(1)
  const[amountInFromCurrency, setAmountInFromCurrency]= useState(true)

  let toAmount, fromAmount
  if(amountInFromCurrency){
    fromAmount= amount
    toAmount= amount * exchangeRates
  } else{
    toAmount = amount
    fromAmount = amount / exchangeRates
  }

  useEffect(()=>{
    fetch(API)
    .then(res=> res.json())
    .then(data=> {
      const firstcurrency = Object.keys(data.rates)[0]
      setCurencyOption([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstcurrency)
      setExchangeRates(data.rates[firstcurrency])
    })
  },[])
  
  useEffect(()=>{
    if(fromCurrency != null && toCurrency!=null){
      fetch(`${API}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res=>res.json())
      .then(data=> setExchangeRates(data.rates[toCurrency]))
    }
  },[fromCurrency, toCurrency])

   function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange (e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }


  return(
    <>
    <h1>CURRENCY CONVERTOR</h1>
    <Row currencyOption={currencyOption}
    selectedCurrency = {fromCurrency}
    onChangeCurrency= {e=> setFromCurrency(e.target.value)}
    amount= {fromAmount}
    onChangeAmount ={handleFromAmountChange}
    />
    <div className='equals'>=</div>
    <Row currencyOption={currencyOption}
    selectedCurrency = {toCurrency}
    onChangeCurrency= {e=> setToCurrency(e.target.value)}
    amount= {toAmount}
    onChangeAmount ={handleToAmountChange}/>
    </>
  )
}


export default App
