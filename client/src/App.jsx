import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [text, setText] = useState();
  const [key, setKey] = useState();
  const [ciphered, setCiphered] = useState();
  const [deciphered, setDeciphered] = useState();
  const [tabToggle, setTabToggle] = useState(1);

  const handleCipher = async () => {
    const res = await axios.post("http://localhost:8000/api/cipher", {
      data: text,
      key: parseInt(key),
    });
    setCiphered(res.data)
  }

  const handleDecipher = async () => {
    const res = await axios.post("http://localhost:8000/api/decipher", {
      data: text,
      key: parseInt(key),
    });
    setDeciphered(res.data)
  }

  const handleCopyCiphered = async () => {
    await navigator.clipboard.writeText(ciphered)
  }

  const handleCopyDeciphered = async () => {
    await navigator.clipboard.writeText(deciphered)
  }

  return (
    <>
      <main>

        <div className="tabs">
          <div 
          className={tabToggle === 1 ? "active-tab" : "tab"} onClick={(e) => (setTabToggle(1), setText(""), setCiphered(""), setKey(""))}><p>🔒 Shifrlash</p></div>
          <div className={tabToggle === 2 ? "active-tab" : "tab"} onClick={(e) => (setTabToggle(2), setText(""), setDeciphered(""), setKey(""))}><p>🔓 Shifrdan ochish</p></div>
        </div>

        <div className={tabToggle === 1 ? "active-frame" : "frame"}>
          <input 
            type="text" 
            placeholder="Shifrlash uchun so'z kiriting..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Kalitni kiriting..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={handleCipher}>Amalga oshirish</button>
          {ciphered && 
            <div className="output">
              <sub>Output <p onClick={handleCopyCiphered}>Copy</p></sub>
              <p>{ciphered}</p>
            </div>
          }
        </div>

        <div className={tabToggle === 2 ? "active-frame" : "frame"}>
          <input 
            type="text" 
            placeholder="Shifrlangan so'zni kiriting..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Kalitni kiriting..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={handleDecipher}>Amalga oshirish</button>
          {deciphered && 
            <div className="output">
              <sub>Output <p onClick={handleCopyDeciphered}>Copy</p></sub>
              <p>{deciphered}</p>
            </div>
          }
        </div>

      </main>
    </>
  )
}

export default App
