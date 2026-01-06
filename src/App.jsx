import { useState } from 'react';
import './App.css';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [angleMode, setAngleMode] = useState('deg'); // 'deg' or 'rad'
  const [history, setHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return current !== 0 ? prev / current : NaN;
      case '^':
        return Math.pow(prev, current);
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      
      if (!isNaN(result)) {
        const calculation = `${previousValue} ${operation} ${currentValue} = ${result}`;
        setHistory([{ expression: calculation, timestamp: new Date().toLocaleTimeString() }, ...history]);
        setDisplay(String(result));
      }

      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleScientific = (func) => {
    let value = parseFloat(display);
    let result;

    const convertAngle = (val, toRad) => {
      return toRad ? (val * Math.PI) / 180 : (val * 180) / Math.PI;
    };

    switch (func) {
      case 'sin':
        result = Math.sin(angleMode === 'deg' ? convertAngle(value, true) : value);
        break;
      case 'cos':
        result = Math.cos(angleMode === 'deg' ? convertAngle(value, true) : value);
        break;
      case 'tan':
        result = Math.tan(angleMode === 'deg' ? convertAngle(value, true) : value);
        break;
      case 'asin':
        result = angleMode === 'deg' ? convertAngle(Math.asin(value), false) : Math.asin(value);
        break;
      case 'acos':
        result = angleMode === 'deg' ? convertAngle(Math.acos(value), false) : Math.acos(value);
        break;
      case 'atan':
        result = angleMode === 'deg' ? convertAngle(Math.atan(value), false) : Math.atan(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'cbrt':
        result = Math.cbrt(value);
        break;
      case 'factorial':
        result = factorial(Math.floor(value));
        break;
      case 'abs':
        result = Math.abs(value);
        break;
      case 'exp':
        result = Math.exp(value);
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'π':
        setDisplay(String(Math.PI));
        return;
      case 'e':
        setDisplay(String(Math.E));
        return;
      default:
        result = value;
    }

    if (!isNaN(result)) {
      setDisplay(String(result));
      setWaitingForNewValue(true);
    }
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const toggleAngleMode = () => {
    setAngleMode(angleMode === 'deg' ? 'rad' : 'deg');
  };

  const handleHistoryClick = (item) => {
    const result = item.expression.split('=')[1].trim();
    setDisplay(result);
    setWaitingForNewValue(true);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="header">
          <h1>공학용 계산기</h1>
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${angleMode === 'deg' ? 'active' : ''}`}
              onClick={toggleAngleMode}
            >
              {angleMode.toUpperCase()}
            </button>
            <button 
              className={`advanced-btn ${showAdvanced ? 'active' : ''}`}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? '기본' : '고급'}
            </button>
          </div>
        </div>

        <div className="display-area">
          <input 
            type="text" 
            className="display" 
            value={display} 
            readOnly 
          />
        </div>

        <div className="buttons-grid">
          {/* 첫 번째 행 */}
          <button className="btn btn-function" onClick={handleClear}>C</button>
          <button className="btn btn-function" onClick={handleBackspace}>←</button>
          <button className="btn btn-function" onClick={() => handleOperation('%')}>%</button>
          <button className="btn btn-operation" onClick={() => handleOperation('÷')}>÷</button>

          {/* 두 번째 행 */}
          <button className="btn" onClick={() => handleNumber(7)}>7</button>
          <button className="btn" onClick={() => handleNumber(8)}>8</button>
          <button className="btn" onClick={() => handleNumber(9)}>9</button>
          <button className="btn btn-operation" onClick={() => handleOperation('×')}>×</button>

          {/* 세 번째 행 */}
          <button className="btn" onClick={() => handleNumber(4)}>4</button>
          <button className="btn" onClick={() => handleNumber(5)}>5</button>
          <button className="btn" onClick={() => handleNumber(6)}>6</button>
          <button className="btn btn-operation" onClick={() => handleOperation('-')}>−</button>

          {/* 네 번째 행 */}
          <button className="btn" onClick={() => handleNumber(1)}>1</button>
          <button className="btn" onClick={() => handleNumber(2)}>2</button>
          <button className="btn" onClick={() => handleNumber(3)}>3</button>
          <button className="btn btn-operation" onClick={() => handleOperation('+')}>+</button>

          {/* 다섯 번째 행 */}
          <button className="btn btn-zero" onClick={() => handleNumber(0)}>0</button>
          <button className="btn" onClick={handleDecimal}>.</button>
          <button className="btn btn-equals" onClick={handleEquals}>=</button>
        </div>

        {/* 고급 기능 버튼 */}
        {showAdvanced && (
          <div className="advanced-buttons">
            <div className="advanced-row">
              <button className="btn btn-scientific" onClick={() => handleScientific('sin')}>sin</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('cos')}>cos</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('tan')}>tan</button>
              <button className="btn btn-scientific" onClick={() => handleOperation('^')}>x^y</button>
            </div>
            <div className="advanced-row">
              <button className="btn btn-scientific" onClick={() => handleScientific('asin')}>asin</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('acos')}>acos</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('atan')}>atan</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('sqrt')}>√</button>
            </div>
            <div className="advanced-row">
              <button className="btn btn-scientific" onClick={() => handleScientific('log')}>log</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('ln')}>ln</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('exp')}>e^x</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('cbrt')}>∛</button>
            </div>
            <div className="advanced-row">
              <button className="btn btn-scientific" onClick={() => handleScientific('factorial')}>n!</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('1/x')}>1/x</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('abs')}>|x|</button>
              <button className="btn btn-scientific" onClick={() => handleScientific('π')}>π</button>
            </div>
            <div className="advanced-row">
              <button className="btn btn-scientific" onClick={() => handleScientific('e')}>e</button>
            </div>
          </div>
        )}
      </div>

      {/* 히스토리 패널 */}
      <div className="history-panel">
        <div className="history-header">
          <h2>계산 기록</h2>
          {history.length > 0 && (
            <button className="clear-history-btn" onClick={clearHistory}>초기화</button>
          )}
        </div>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="no-history">계산 기록이 없습니다</p>
          ) : (
            history.map((item, index) => (
              <div 
                key={index} 
                className="history-item"
                onClick={() => handleHistoryClick(item)}
              >
                <div className="history-expression">{item.expression}</div>
                <div className="history-time">{item.timestamp}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
