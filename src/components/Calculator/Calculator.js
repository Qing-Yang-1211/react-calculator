import React, { Component } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKeyboard from "./CalculatorKeyboard";

const otherOperators = ["√", "x²", "x³", "x!"];

class Calculator extends Component {
  state = {
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
  };

  clearAll() {
    this.setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
    });
  }

  clearDisplay() {
    const { waitingForOperand, operator, displayValue } = this.state;

    if (!waitingForOperand) {
      this.setState({
        displayValue: "0",
      });
    } else {
      this.setState({
        operator: null,
        waitingForOperand: false,
        displayValue: operator === "=" ? "0" : displayValue,
      });
    }
  }

  // Reverse the sign of the value
  toggleSign() {
    const { displayValue } = this.state;
    const newValue = parseFloat(displayValue) * -1;

    this.setState({
      displayValue: String(newValue),
    });
  }

  // The "%" operation to convert to percentage.
  inputPercent() {
    const { displayValue } = this.state;
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    // Get the digits after decimal points
    const toFixedlenght = displayValue.split(".")[1]
      ? displayValue.split(".")[1].length
      : 0;
    const newValue = parseFloat(displayValue) / 100;

    this.setState({
      displayValue: String(newValue.toFixed(toFixedlenght + 2)),
    });
  }

  // Input decimal point.
  inputPoint() {
    const { displayValue } = this.state;
    this.setState({
      displayValue: displayValue + ".",
      waitingForOperand: false,
    });
  }

  // Input 0-9.
  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit,
      });
    }
  }

  getOperationResult = (currentValue, inputValue, operatorType) => {
    let newValue = null;
    switch (operatorType) {
      case "+":
        newValue = currentValue + inputValue;
        break;
      case "−":
        newValue = currentValue - inputValue;
        break;
      case "÷":
        newValue = inputValue === 0 ? "error" : currentValue / inputValue;
        break;
      case "×":
        newValue = currentValue * inputValue;
        break;
      case "=":
        newValue = inputValue;
        break;
      case "√":
        newValue = inputValue >= 0 ? Math.sqrt(inputValue) : "error";
        break;
      case "x²":
        newValue = inputValue * inputValue;
        break;
      case "x³":
        newValue = inputValue * inputValue * inputValue;
        break;
      case "x!":
        // Recursion
        let fac = (n) => {
          return n > 1 ? n * fac(n - 1) : 1;
        };
        newValue = fac(inputValue);
        break;
      default:
        break;
    }
    return newValue;
  };

  performOperation(nextOperator) {
    const { value, displayValue, operator, waitingForOperand } = this.state;
    const noInputEqual = otherOperators.includes(nextOperator);

    // Same operator, no calculation
    if (nextOperator === operator && waitingForOperand) return;
    // Only change the operator, but when the calculation is waiting, the calculation is not performed
    // otherOperators can be calculated directly
    if (nextOperator !== operator && waitingForOperand && !noInputEqual) {
      this.setState({ operator: nextOperator });
      return;
    }
    // displayValue = error  => 0
    const inputValue = displayValue === "error" ? 0 : parseFloat(displayValue);

    // Perform calculation without "=" for otherOperators
    let operatorType = noInputEqual ? nextOperator : operator;

    if (value == null && !noInputEqual) {
      this.setState({
        value: inputValue,
      });
    } else if (operatorType) {
      // value = error =>  0
      const currentValue = value && value !== "error" ? value : 0;

      let newValue = this.getOperationResult(
        currentValue,
        inputValue,
        operatorType
      );

      this.setState({
        value: noInputEqual ? null : newValue,
        displayValue: String(newValue),
      });
    }

    this.setState({
      // otherOperators or operatorType is "="  =>  waitingForOperand  is false
      // otherwise  waitingForOperand is true
      waitingForOperand: noInputEqual || operatorType === "=" ? false : true,
      // operator is noInputEqual => null
      // otherwise operator is nextOperator
      operator: noInputEqual ? null : nextOperator,
    });
  }

  render() {
    const { displayValue, operator } = this.state;

    return (
      <div className="calculator">
        {/* Keyboard */}
        <CalculatorKeyboard
          displayValue={displayValue}
          operator={operator}
          clearAll={this.clearAll.bind(this)}
          clearDisplay={this.clearDisplay.bind(this)}
          toggleSign={this.toggleSign.bind(this)}
          inputPercent={this.inputPercent.bind(this)}
          inputDigit={this.inputDigit.bind(this)}
          inputPoint={this.inputPoint.bind(this)}
          performOperation={this.performOperation.bind(this)}
        />
        {/* NumberDisplay */}
        <CalculatorDisplay value={displayValue} />
      </div>
    );
  }
}

export default Calculator;
