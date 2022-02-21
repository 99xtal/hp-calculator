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
  ["add", (a,b) => {return(a + b)}],
  ["subtract", (a,b) => {return(a-b)}],
  ["multiply", (a,b) => {return(a*b)}],
  ["divide", (a,b,) => {return(a/b)}]
]);

//Initialize calculator
function init() {
  addNumberListeners(el(".num"));
  addOperationListeners();
}

//Add number key event listeners
function addNumberListeners(numElements) {
  numElements.forEach((numKey) => {
    numKey.addEventListener("click", storeInput);
  });
}

//Add operation key event listeners
function addOperationListeners() {
  el("#clear").addEventListener("click", clear);
  el("#add").addEventListener("click", () => {
    doOperation("add");
  });
  el("#subtract").addEventListener("click", () => {
    doOperation("subtract");
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
    inputNum += this.getAttribute("data-num");
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

// //display current number to output screen
// const setNum = function () {
//   if (resultNum) {
//     //if result previously displayed, clear and reset result
//     currNum = this.getAttribute("data-num");
//     resultNum = "";
//   } else if (!resultNum && currNum.length < 12) {
//     //add current number if number length <= 12
//     if (this.getAttribute("data-num") === ".") {
//       //if input is decimal, check that there are no other decimal points in the current number already
//       if (!currNum.includes(".")) {
//         currNum += this.getAttribute("data-num");
//       }
//     } else {
//       //for every other number
//       currNum += this.getAttribute("data-num");
//     }
//   }
//   output.innerHTML = currNum;
// };

// //clear button
// const clearCalc = function () {
//   currNum = "";
//   oldNum = "";
//   resultNum = "";
//   output.innerHTML = currNum;
// };

// //add click events to numbers
// nums.forEach(function (element) {
//   element.onclick = setNum;
// });

// //add click event for clear
// clear.onclick = clearCalc;
