
import { CalcContext } from './../context/CalcContext';
import { useContext } from 'react';

const getStyleName = btn => {
    const className = {
        '=': 'equals',
        '/': 'operand',
        'x': 'operand',
        '+': 'operand',
        '-': 'operand',
    }
    return className[btn]
}

const Button = ({value}) => {
    const {calc, setCalc} = useContext(CalcContext);

    // User click dot
    const dotClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.')?calc.num + value: calc.num
        })
    }

    // User click C

    const cClick = ()=> {
        setCalc({sign: '', num: 0, res: 0})
    }

    // User click any number 0-9
    const handleNumberButton = ()=> {
       const numberString = value.toString() 

       let numberValue;
       if(numberString==='0' && calc.num ==='0'){
            numberValue = "0"
       } else {
            numberValue = Number(calc.num + numberString)
       }
 
       setCalc({
        ...calc,
        num: numberValue
       })
    }

    // User click operand sign /, x, +, -

    const operandClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num: calc.res,
            num: 0
        })
    }

    // User click equals sign(=)
    const equalsClick = ()=> {
        if(calc.res && calc.num) {
            const math = (a, b, sign)=> {
                const results = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return results[sign](a , b)
            }
            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }
    }

    // User click Pertange sign(%)
    const percentClick = () => {
        setCalc({
            res: calc.res/100,
            num: calc.num/100,
            sign: ''
        })
    }

    // User click invert button (+-)

    const invertButtonClick = () => {
        setCalc({
            num: calc.num ? calc.num * -1: calc.num,
            res: calc.res ? calc.res * -1: calc.res,
            sign: ''
        })
    }

    const handleBtnClick = () => {
        
        const results = {
            '.': dotClick,
            'C': cClick,
            '/': operandClick,
            'x': operandClick,
            '+': operandClick,
            '-': operandClick,
            '=': equalsClick,
            '%': percentClick,
            '+-': invertButtonClick,
        }
        if(results[value]){
            return results[value]()
        }else{
            return handleNumberButton()
        }
    }
    return (
        <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
    );
};

export default Button;