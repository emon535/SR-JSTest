import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState(0);
  const [factorial, setFactorial] = useState(0);
  const [status, setStatus] = useState("");

  // Calculated the factorial number.
  function getFactorial(n) {
    return n ? n * getFactorial(n - 1) : 1;
  }

  // handled the button click event
  const handleSubmit = event => {
    let factorialValue = 0;
    event.preventDefault();
    if (input > 100) {
      setStatus("The input is too big. [ Range 1-100 ]");
      setFactorial(0);
    } else {
      factorialValue = getFactorial(input);
      setFactorial(factorialValue);
    }
  };

  return (
    <div>
      <h3>Factorial Calculator</h3>
      <span>{status}</span>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="0 - 100"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Factorial: {factorial}</p>
    </div>
  );
}
