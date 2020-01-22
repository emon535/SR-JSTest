import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState(0);
  const [factorial, setFactorial] = useState(0);
  const [status, setStatus] = useState("");

  // handled the button click event
  const handleSubmit = event => {
    let factorialValue = 0;
    event.preventDefault();
    if (input > 100) {
      setStatus("The input is too big [ Range 0-100 ].");
      setFactorial(0);
    } else if (input < 0) {
      setStatus("The input is too small [ Range 0-100 ].");
      setFactorial(0);
    } else {
      setStatus("");
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
            type="number"
            placeholder="Insert a number between 1-100"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>
        <b>Factorial: {factorial}</b>
      </p>
    </div>
  );
}

// Calculated the factorial number.

function getFactorial(input) {
  if (input == 0) {
    return 1;
  } else {
    return input * getFactorial(input - 1);
  }
}
