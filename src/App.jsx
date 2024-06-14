import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [isNumberAllowed, setNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatedPassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (isSpecialCharAllowed) str += "~`!@#$%^&*()_-+=";
    let pass = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [isNumberAllowed, isSpecialCharAllowed, length]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatedPassword();
  }, [isNumberAllowed, isSpecialCharAllowed, length]);

  return (
    <>
      <div className="password-generator-container">
        <h1>Password Generator</h1>
        <div className="input-container">
          <input
            type="text"
            onChange={generatedPassword}
            id="copy"
            readOnly
            value={password}
            ref={passwordRef}
            className="generated-password-input"
          />
          <button onClick={copyPasswordToClipboard} className="copy-button">
            copy
          </button>
        </div>
        <div className="settings-container">
          <div className="setting">
            <label htmlFor="length">Length:</label>
            <input
              type="range"
              min={0}
              max={40}
              onChange={(e) => setLength(e.target.value)}
              value={length}
              className="length-slider"
            />
            <span>{length}</span>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              onChange={() => setNumberAllowed(!isNumberAllowed)}
              value={isNumberAllowed}
              defaultChecked={isNumberAllowed}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              onChange={() => setSpecialCharAllowed(!isSpecialCharAllowed)}
              value={isSpecialCharAllowed}
              defaultChecked={isSpecialCharAllowed}
            />
            <label htmlFor="special-character">Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
