import React from 'react';
const btnTexts = require('lang/kor.json').btns;

export default function MainBtn({btnType, handlePage}){
    if(btnType === 'main'){
        return <button btntype={btnType} className='home-btn' onClick={handlePage}>HOME</button>
    }
    let btnText = btnTexts[btnType]
    return <button btntype={btnType} className='button' onClick={handlePage}>{btnText}</button>
}