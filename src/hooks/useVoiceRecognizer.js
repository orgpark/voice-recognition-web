import React, { useEffect, useState } from 'react';
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition;
recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
export const useRecognizer = () => {
  const [outputText, setOutputText] = useState('');
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    recognition.onresult = function (event) {
      let final_transcript = '';
      let interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      console.log(('interim_transcript: ', interim_transcript));
      console.log(('final_transcript: ', final_transcript));
      setOutputText(interim_transcript);
      if (final_transcript) {
        setOutputText(final_transcript);
      }
    };
    recognition.onstart = (evt) => {
      setIsOn(true);
    };
    recognition.onend = (evt) => {
      console.log(evt);
      setIsOn(false);
      console.log('service end');
    };
  }, []);
  const startRecognizer = () => {
    console.log(recognition);
    recognition.start();
  };
  const endRecognizer = () => {
    //등록이 될때 어떻게 되나
    console.log(recognition);
    recognition.stop();
  };
  return [outputText, interim, startRecognizer, endRecognizer, error, isOn];
};
