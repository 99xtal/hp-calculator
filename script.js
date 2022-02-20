"use strict";

var el = function (element) {
  if (element.charAt(0) === "#") {
    return document.querySelector(element);
  } else {
    return document.querySelectorAll(element);
  }
};

let nums = el(".num");
let output = el("#output");
let clear = el("#clear");
let currNum = "";
let oldNum, resultNum;

function init() {
  addNumberListeners();
  addClearListener();
}

//Add key event listeners
function addNumberListeners() {
  nums.forEach((numKey) => {
    numKey.addEventListener("click", displayInput);
  });
}

function addClearListener() {
  clear.addEventListener("click", clearNums);
}

function display(num) {
  output.innerHTML = num;
}

function displayInput() {
  if (resultNum) {
    currNum = this.getAttribute("data-num");
    resultNum = "";
  } else if (!resultNum && currNum.length < 12) {
    currNum += this.getAttribute("data-num");
  }
  display(currNum);
}

function clearNums() {
  currNum = "0";
  oldNum = "";
  resultNum = "";
  display(currNum);
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
