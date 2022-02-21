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
  [
    "add",
    (a, b) => {
      return a + b;
    },
  ],
  [
    "subtract",
    (a, b) => {
      return a - b;
    },
  ],
  [
    "multiply",
    (a, b) => {
      return a * b;
    },
  ],
  [
    "divide",
    (a, b) => {
      return a / b;
    },
  ],
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
]);

//Initialize calculator
function init() {
  addNumberListeners();
  addOperationListeners();
  el("#clear").addEventListener("click", clear);
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

//Display number to screen
function display(num) {
  output.innerHTML = num;
}

//
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
  currentNum = 0;
  oldNum = 0;
  resultNum = 0;
  display(inputNum);
}

//perform operation on old and current number and display result
function doOperation(op) {
  if (inputNum) {
    setOldAndCurrent();
    const operation = operations.get(op);
    resultNum = operation(currentNum, oldNum);
    setResult();
    display(resultNum);
    console.log(`Current: ${currentNum} Old: ${oldNum}`);
  }
}

function setOldAndCurrent() {
  oldNum = currentNum;
  currentNum = parseFloat(inputNum);
  inputNum = "";
}

function setResult() {
  oldNum = currentNum;
  currentNum = resultNum;
}

init();
