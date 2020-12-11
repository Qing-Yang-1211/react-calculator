// Perform specific operations when onPress.
function CalculatorKey(props) {
  const { onPress, className, text, operator } = props;
  return (
    // Use ${} to denote a placeholder
    <button
      onClick={onPress}
      className={`calculator-key ${className} ${
        operator === text ? "active" : ""
      }`}
    >
      {text}
    </button>
  );
}

// Associate calculator keys with specific operations.
function CalculatorKeyboard(props) {
  const {
    clearAll,
    operator,
    displayValue,
    clearDisplay,
    toggleSign,
    inputPercent,
    inputDigit,
    inputPoint,
    performOperation,
  } = props;

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="calculator-keyboard">
      <div className="input-keys">
        <div className="keys-function-other">
          <button className="calculator-key">
            <div className="logo-wrapper">
              <div className="logo-circle"></div>
              <span>QY</span>
            </div>
          </button>
          <CalculatorKey
            text="√"
            className="key-square-root"
            onPress={() => performOperation("√")}
          />
          <CalculatorKey
            text="x²"
            className="key-square"
            onPress={() => performOperation("x²")}
          />
          <CalculatorKey
            text="x³"
            className="key-cube"
            onPress={() => performOperation("x³")}
          />
          <CalculatorKey
            text="x!"
            className="key-factorial key-bottom-row"
            onPress={() => performOperation("x!")}
          />
        </div>
        <div className="flex-wrap flex-column">
          <div className="keys-function">
            <CalculatorKey
              text={displayValue === "0" ? "AC" : "C"}
              className="key-clear"
              onPress={() =>
                displayValue !== "0" ? clearDisplay() : clearAll()
              }
            />
            <CalculatorKey
              text="±"
              className="key-sign"
              onPress={() => toggleSign()}
            />
            <CalculatorKey
              text="%"
              className="key-percent"
              onPress={() => inputPercent()}
            />
          </div>
          <div className="keys-digit">
            <CalculatorKey
              text="0"
              className="key-0 key-bottom-row"
              onPress={() => inputDigit(0)}
            />
            <CalculatorKey
              text="."
              className="key-point key-bottom-row"
              onPress={() => inputPoint()}
            />
            {digits.map((num) => (
              <CalculatorKey
                key={num}
                text={num}
                className={`key-${num}`}
                onPress={() => inputDigit(num)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="operator-keys">
        <CalculatorKey
          text="÷"
          className="key-divide"
          operator={operator}
          onPress={() => performOperation("÷")}
        />

        <CalculatorKey
          text="×"
          operator={operator}
          className="key-multiply"
          onPress={() => performOperation("×")}
        />
        <CalculatorKey
          text="−"
          operator={operator}
          className="key-subtract"
          onPress={() => performOperation("−")}
        />
        <CalculatorKey
          text="+"
          operator={operator}
          className="key-add"
          onPress={() => performOperation("+")}
        />
        <CalculatorKey
          text="="
          className="key-equals key-bottom-row"
          onPress={() => performOperation("=")}
        />
      </div>
    </div>
  );
}

export default CalculatorKeyboard;
