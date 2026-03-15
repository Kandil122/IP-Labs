const display = document.getElementById("display");
const keys = document.getElementById("keys");

const state = {
  first: null,
  second: null,
  operator: null,
  waitingForSecond: false,
  justCalculated: false,
};

function updateDisplay(value) {
  display.textContent = value;
}

function getDisplayValue() {
  return display.textContent;
}

function appendDigit(digit) {
  const current = getDisplayValue();

  if (state.justCalculated && !state.operator) {
    updateDisplay(digit === "00" ? "0" : digit);
    state.justCalculated = false;
    return;
  }

  if (state.waitingForSecond) {
    updateDisplay(digit === "00" ? "0" : digit);
    state.waitingForSecond = false;
    return;
  }

  if (current === "0") {
    updateDisplay(digit);
    return;
  }

  updateDisplay(current + digit);
}

function appendDecimal() {
  const current = getDisplayValue();

  if (state.waitingForSecond) {
    updateDisplay("0.");
    state.waitingForSecond = false;
    return;
  }

  if (!current.includes(".")) {
    updateDisplay(current + ".");
  }
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? null : a / b;
    default:
      return b;
  }
}

function formatResult(value) {
  if (value === null || !Number.isFinite(value)) {
    return "Error";
  }

  const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function chooseOperator(op) {
  const current = Number(getDisplayValue());

  if (state.operator && !state.waitingForSecond) {
    const result = calculate(state.first, current, state.operator);
    const formatted = formatResult(result);
    updateDisplay(formatted);

    if (formatted === "Error") {
      resetAll();
      return;
    }

    state.first = Number(formatted);
  } else {
    state.first = current;
  }

  state.operator = op;
  state.waitingForSecond = true;
  state.justCalculated = false;
}

function applyPercent() {
  const current = Number(getDisplayValue());
  updateDisplay(formatResult(current / 100));
}

function runEquals() {
  if (!state.operator || state.waitingForSecond) {
    return;
  }

  state.second = Number(getDisplayValue());
  const result = calculate(state.first, state.second, state.operator);
  const formatted = formatResult(result);
  updateDisplay(formatted);

  state.first = formatted === "Error" ? null : Number(formatted);
  state.operator = null;
  state.waitingForSecond = false;
  state.justCalculated = true;
}

function resetAll() {
  state.first = null;
  state.second = null;
  state.operator = null;
  state.waitingForSecond = false;
  state.justCalculated = false;
  updateDisplay("0");
}

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const { digit, op, action } = button.dataset;

  if (digit) {
    appendDigit(digit);
    return;
  }

  if (op) {
    chooseOperator(op);
    return;
  }

  if (action === "decimal") {
    appendDecimal();
    return;
  }

  if (action === "percent") {
    applyPercent();
    return;
  }

  if (action === "equals") {
    runEquals();
    return;
  }

  if (action === "clear") {
    resetAll();
  }
});
