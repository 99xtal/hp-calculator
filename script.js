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
let oldNum = "";
let resultNum = "";

//display current number to output screen
const setNum = function () {
  if (resultNum) {
    //if result previously displayed, clear and reset result
    currNum = this.getAttribute("data-num");
    resultNum = "";
  } else if (!resultNum && currNum.length < 12) {
    //add current number if number length <= 12
    currNum += this.getAttribute("data-num");
  } else {
    //do nothing if number length > 12
    null;
  }
  output.innerHTML = currNum;
};

//clear button
const clearCalc = function () {
  currNum = "";
  oldNum = "";
  resultNum = "";
  output.innerHTML = currNum;
};

//add click events to numbers
nums.forEach(function (element) {
  element.onclick = setNum;
});

//add click event for clear
clear.onclick = clearCalc;
