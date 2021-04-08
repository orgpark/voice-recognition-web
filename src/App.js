import React, { useState, useEffect } from 'react';
import steeringWheel from './images/steering-wheel.png';
import compass from './images/compass.png';
import './App.css';
import { useRecognizer } from './hooks/useVoiceRecognizer';

function App() {
  const [speed, setSpeed] = useState(0);
  const [outputText, interim, startRecognizer, endRecognizer, error, isOn] = useRecognizer();
  console.log('isOn: ', isOn);
  console.log(interim);

  useEffect(() => {
    console.log('outputText: ', outputText);
    if (outputText.includes('left')) {
      setSpeed(speed - 110);
    } else if (outputText.includes('right')) {
      setSpeed(speed + 110);
    }
  }, [outputText]);
  const style = {
    transform: `rotate(${speed}deg)`,
    'transition-duration': '1s',
  };

  const compassStyle = {
    transform: `rotate(${-speed / 20}deg)`,
    'transition-duration': '1s',
  };

  return (
    <div className={`App${isOn ? ' started' : ''}`}>
      {isOn ? (
        <>
          <button onClick={endRecognizer}>항해 끝!</button> <h1>{outputText}</h1>
          <img style={compassStyle} className="compass" src={compass} width="100px" alt="compass" />
          <div style={style} className="imageContainer">
            <img src={steeringWheel} width="600px" alt="steeringWheel" />
          </div>
        </>
      ) : (
        <button onClick={startRecognizer}>항해시작!</button>
      )}
    </div>
  );
}

export default App;
