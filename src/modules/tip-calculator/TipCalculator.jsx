import style from './tip-calculator.module.scss'
import dollarIcon from '../../assets/images/icon-dollar.svg'
import personIcon from '../../assets/images/icon-person.svg'
import { useEffect, useState } from 'react'
const TipCalculator = () => {
    const [bill, setBill] = useState(0);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [tip, setTip] = useState(0);
    const [total, setTotal] = useState(0);
    const [resetButton, setResetButton] = useState(true)


    const resetInputs = () => {
        setPercentage(0)
        setNumberOfPeople(0)
        setBill(0)
    }

    useEffect(() => {
        console.log("change...")
        console.log(parseFloat(percentage))
        console.log(parseInt(numberOfPeople))
        console.log(parseFloat(bill))
        if (percentage > 0 && bill > 0 && numberOfPeople > 0) {
            let actualTip = (bill / numberOfPeople) * (percentage / 100);
            setTip(actualTip)
            setTotal((bill / numberOfPeople) + actualTip)
            setResetButton(false)
        } else {
            setResetButton(true)
        }
    }, [percentage, bill, numberOfPeople, resetButton])



    const changeSelectedBtn = (e, perc) => {
        const buttons = document.querySelectorAll(".btn")
        const activeBtn = document.getElementById(`${e.target.id}`);
        // console.log(activeBtn)
        // console.log(buttons)
        buttons.forEach((btn) => {
            btn.classList.remove("active");
        })
        activeBtn.classList.add("active")
        setPercentage(perc)
    }

    return (
        <div className={style.tip__calculator}>
            <form className={style.tip__form}>
                <label htmlFor="bill">Bill</label>
                <div className={style.input}>
                    <img src={dollarIcon} alt="" />
                    <input id="bill" type="number" autoFocus={true} placeholder="0" value={bill} onChange={e => setBill(e.target.value)} />
                </div>


                <label className={style.select__tip__label} htmlFor="select_tip">Select Tip %</label>
                <div id="select_tip" className={style.select__tip}>
                    <div className={`${style.button} btn`} id="btn1" onClick={(e) => changeSelectedBtn(e, 5)}>
                        5%
                    </div>
                    <div className={`${style.button} btn`} id="btn2" onClick={(e) => changeSelectedBtn(e, 10)}>
                        10%
                    </div>
                    <div className={`${style.button} btn`} id="btn3" onClick={(e) => changeSelectedBtn(e, 15)}>
                        15%
                    </div>
                    <div className={`${style.button} btn`} id="btn4" onClick={(e) => changeSelectedBtn(e, 25)}>
                        25%
                    </div>
                    <div className={`${style.button} btn`} id="btn5" onClick={(e) => changeSelectedBtn(e, 50)}>
                        50%
                    </div>

                    <input type="number" value={percentage} onChange={e => setPercentage(e.target.value)} placeholder="Custom" className={`button btn ${style.percentage}`} id="btn6" onClick={(e) => changeSelectedBtn(e, 0)} />

                </div>

                <label htmlFor="number_of_people">Number of People</label>
                <div className={style.input}>
                    <img src={personIcon} alt="" />
                    <input id="number_of_people" type="number" placeholder="0" value={numberOfPeople} onChange={e => setNumberOfPeople(e.target.value)} />
                </div>
            </form>

            <div className={style.result}>
                <div>
                    <div className={style.row}>
                        <div>
                            <h5>Tip Amount</h5>
                            <h6>/ person</h6>
                        </div>

                        <div className={style.price}>
                            ${tip.toFixed(2)}
                        </div>
                    </div>

                    <div className={style.row}>
                        <div>
                            <h5>Total</h5>
                            <h6>/ person</h6>
                        </div>

                        <div className={style.price}>
                            ${total.toFixed(2)}
                        </div>
                    </div>
                </div>

                <button
                    className={`${style.button} ${style.reset__button} ${resetButton ? `${style.disabled}` : ''}`}
                    onClick={resetInputs}>
                    Reset
                </button>
            </div>

        </div >
    )
}

export default TipCalculator
