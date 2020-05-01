import React from 'react';


function Row(props){

    const {currencyOption,
    selectedCurrency,
    onChangeCurrency,
amount,
onChangeAmount}=props
    return(
        <div>
            <input className='input' type='number' value = {amount} onChange={onChangeAmount}/>
            <select className='ut' value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOption.map(option => (
                    <option key= {option} value ={option}>{option}</option>
                ))}
                
            </select>
            
        </div>
    )
}

export default Row