const btnTexts = require('lang/kor.json').btns;

export default function MainBtn({btnType, handlePage}){
    let btnText = btnTexts[btnType]
    return <button btntype={btnType} className='button' onClick={handlePage}>{btnText}</button>
}