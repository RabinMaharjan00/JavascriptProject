"use strict";

var form = document.querySelector('#form');
var username = document.querySelector('#username');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var password2 = document.querySelector('#password2');

function showError(input, message) {
  var formControl = input.parentElement;
  formControl.className = 'form-control error';
  var small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  var formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, " ".concat(getFieldName(input), " is required"));
    } else {
      showSuccess(input);
    }
  });
} //check input length 


function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, "".concat(getFieldName(input), " must be at least ").concat(min, " characters"));
  } else if (input.value.length > max) {
    showError(input, "".concat(getFieldName(input), " must be less then ").concat(max, " characters"));
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});