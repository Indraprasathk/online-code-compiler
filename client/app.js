import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');

  const handleSubmit = async () => {
    const payload = {
      language: language,
      code: code
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("error connecting to server");
      }
    }
  }

  return (
    <div className="App">
      <div className="ChoiceContainer">
        {/* Language selection dropdown */}
        <select
          className="ChoiceSelect"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <h1>ONLINE CODE COMPILER</h1>
      <div className="InputOutputContainer">
        {/* Left side - Input section */}
        <div className="InputSection">
          {/* Code input textarea */}
          <textarea
            rows="25"
            cols="50"
            className="CodeInput"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Your coding starts here"
          ></textarea>
          
          {/* Submit button */}
          <button className="SubmitButton" onClick={handleSubmit}>Submit</button>
        </div>

        {/* Right side - Output section */}
        <div className="OutputSection">
          {/* Output display */}
          <h2 className="SectionHeader">Output</h2>
          <div className="OutputBox" rows="25" cols="25">{output}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
