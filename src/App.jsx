import { useCallback, useEffect, useState } from 'react'
import './App.css'

const App = () => {

    const [length, setLength] = useState(8)
    const [isNumbers, setIsNumbers] = useState(false)
    const [isChar, setIsChar] = useState(false)
    const [password, setPassword] = useState('')

    const [isCopied, setIsCopied] = useState(false)

    const generatePassword = useCallback(()=>{
        let pass = ''
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

        if(isNumbers) str += '0123456789'
        if(isChar) str += ',.-_!#$%&/()=?*'

        for(let i=0; i < length; i++){
            const index = Math.floor(Math.random() * str.length)
            pass += str[index]
        }
        setPassword(pass)
    }, [length, isNumbers, isChar])


    useEffect(()=>{
        generatePassword()
    }, [length, isNumbers, isChar])


    const copyToClipboard = ()=>{
        window.navigator.clipboard.writeText(password)
        setIsCopied(true)

        setTimeout(()=>{
            setIsCopied(false)
        }, 500)
    }

  return (
    <div className="wrapper">
        <div className="container">
            <h1>Password generator</h1>
            <div className="input__box">
                <input type="text" className="input" placeholder='password' readOnly value={password}/>
                <button className="copy__btn" onClick={copyToClipboard}>copy <span className={isCopied ? 'copied__text active' : 'copied__text'}>copied</span></button>
            </div>
            <div className="all__inputs">
                <div className="range__input">
                    <input type="range"  id="range" className="range" min={6} max={45} value={length} onChange={(e) => setLength(e.target.value)}/>
                    <label htmlFor="range">Length: <span>{length}</span></label>
                </div>
                <div className="checkbox__one">
                    <input type="checkbox" id="numbers" defaultChecked={isNumbers} onChange={()=> setIsNumbers(prev => !prev)}/>
                    <label htmlFor="numbers">Use Numbers <span>:</span></label>
                </div>
                <div className="checkbox__two">
                    <input type="checkbox"  id="characters" defaultChecked={isChar} onChange={()=> setIsChar(prev => !prev)}/>
                    <label htmlFor="characters">Use Characters <span>:</span></label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App







