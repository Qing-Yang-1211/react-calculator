import React from "react";

function CalculatorDisplay(props) {
  const { value } = props;
  // Check if there should be an error message.
  let tempValue =
    value === "error" ? "Not a number" : parseFloat(value).toLocaleString();

  return <div className="calculator-display">{tempValue}</div>;
}

export default CalculatorDisplay;
