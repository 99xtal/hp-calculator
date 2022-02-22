"use strict";

const el = function (element) {
  if (element.charAt(0) === "#") {
    return document.querySelector(element);
  } else {
    return document.querySelectorAll(element);
  }
};

let output = el("#output");
let inputNum = "";
let currentNum = 0;
let oldNum = 0;
let resultNum = 0;

//Map containing operation functions
const operations = new Map([
  //Row 1 operations
  [
    "sqrt",
    (x) => {
      return Math.sqrt(x);
    },
  ],
  [
    "exp",
    (x) => {
      return Math.exp(x);
    },
  ],
  [
    "ln",
    (x) => {
      return Math.log(x);
    },
  ],
  ["y-to-x-power", (x, y) => {}],
  [
    "1-over-x",
    (x) => {
      return 1 / x;
    },
  ],
  ["sigma-plus", () => {}],
  //Row 2 operations
  [
    "sin",
    (x) => {
      return Math.sin(x);
    },
  ],
  [
    "cos",
    (x) => {
      return Math.cos(x);
    },
  ],
  [
    "tan",
    (x) => {
      return Math.tan(x);
    },
  ],
  //Row 3 operations
  [
    "pos-neg",
    (x) => {
      return -x;
    },
  ],
  //Row 4 operations
  [
    "divide",
    (a, b) => {
      return a / b;
    },
  ],

  //Row 5 operations
  [
    "multiply",
    (a, b) => {
      return a * b;
    },
  ],

  //Row 6 operations
  [
    "subtract",
    (a, b) => {
      return b - a;
    },
  ],

  //Row 7 operations
  [
    "add",
    (a, b) => {
      return a + b;
    },
  ],
]);

//Initialize calculator
function init() {
  addNumberListeners();
  addOperationListeners();
  addButtonListeners();
  el("#clear").addEventListener("click", clear);
}

function addButtonListeners() {
  el(".button").forEach((btnKey) => {
    btnKey.addEventListener("mousedown", buttonPress);
    btnKey.addEventListener("mouseup", buttonPress);
  });
}
//Add number key event listeners
function addNumberListeners() {
  el(".num").forEach((numKey) => {
    numKey.addEventListener("click", storeInput);
  });
}

//Add operation key event listeners
function addOperationListeners() {
  el(".op").forEach((opkey) => {
    opkey.addEventListener("click", () => {
      doOperation(opkey.getAttribute("data-op"));
    });
  });
}

let isPressed = false;
function buttonPress() {
  if (!isPressed) {
    this.style.backgroundColor = "#110d08";
    isPressed = true;
  } else {
    this.style.backgroundColor = "#2f2317";
    isPressed = false;
  }
}
//Display number to screen
function display(num) {
  output.innerHTML = toENotation(num);
}

//Store user input & display to screen
function storeInput() {
  display("");
  if (inputNum === "0") {
    inputNum = this.getAttribute("data-num");
  } else if (inputNum.length < 12) {
    if (this.getAttribute("data-num") === ".") {
      if (!inputNum.includes(".")) {
        inputNum += this.getAttribute("data-num");
      }
    } else {
      inputNum += this.getAttribute("data-num");
    }
  }
  display(inputNum);
}

//clear
function clear() {
  inputNum = "0";
  currentNum = null;
  oldNum = null;
  resultNum = null;
  display(inputNum);
}

//perform operation on old and current number and display result
function doOperation(op) {
  const operation = operations.get(op);
  //If operation takes 1 argument
  if (operation.length === 1) {
    if (inputNum) {
      pushInput();
    }
    // console.log(
    //   `Current number: ${currentNum + typeof currentNum}, Old number: ${oldNum}`
    // );
    resultNum = operation(currentNum);
    pushResult();
    // console.log(
    //   `Current number: ${currentNum + typeof currentNum}, Old number: ${oldNum}`
    // );
  }
  //If operation takes 2 arguments
  if (operation.length === 2) {
    if (inputNum) {
      if (currentNum === null) {
        pushInput();
      } else {
        pushInput();
        resultNum = operation(currentNum, oldNum);
        pushResult();
      }
    }
  }
}

//Input --> Current, Current --> Old
function pushInput() {
  oldNum = currentNum;
  currentNum = parseFloat(inputNum);
  display(inputNum);
  inputNum = "";
}

//Result --> Current, Current --> Old
function pushResult() {
  oldNum = currentNum;
  currentNum = resultNum;
  display(resultNum);
  inputNum = "";
}

function toENotation(num) {
  const numArr = num.toString().split("");
  if (numArr.length > 12) {
    numArr.splice(12);
    const eNum = parseFloat(numArr.join(""));
    return eNum;
  } else {
    return num;
  }
}

init();
