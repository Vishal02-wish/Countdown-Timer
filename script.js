'use strict';

const timerDisplay = document.querySelector('.timer-display');
const startButton = document.querySelector('.start-button');
const pauseButton = document.querySelector('.pause-button');
const resetButton = document.querySelector('.reset-button');
const splitButton = document.querySelector('.split-button');
const timestampsList = document.querySelector('.timestamps ul');

let startTime;
let elapsedTime = 0;
let timerInterval;

pauseButton.disabled = true;
resetButton.disabled = true;
splitButton.disabled = true;

function startTimer() {
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = true;
  splitButton.disabled = false;

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10); // Change interval to 10 milliseconds for millisecond accuracy
}

function updateTimer() {
  const elapsedTimeInMilliseconds = Date.now() - startTime;
  const milliseconds = Math.floor((elapsedTimeInMilliseconds % 1000) / 10); // Extract milliseconds from elapsedTimeInMilliseconds
  const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
  const seconds = elapsedTimeInSeconds % 60;
  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`; // Include milliseconds in the display
}

function pauseTimer() {
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = false;
  splitButton.disabled = true;

  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
}

function resetTimer() {
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  splitButton.disabled = true;

  clearInterval(timerInterval);
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00:00'; // Reset display to include milliseconds
  timestampsList.innerHTML = '';
}

function splitTime() {
  pauseButton.disabled = false;
  resetButton.disabled = false;
  splitButton.disabled = false;

  const elapsedTimeInMilliseconds = Date.now() - startTime;
  const milliseconds = Math.floor((elapsedTimeInMilliseconds % 1000) / 10); // Extract milliseconds from elapsedTimeInMilliseconds
  const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
  const seconds = elapsedTimeInSeconds % 60;
  const timestamp = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`; // Include milliseconds in the timestamp
  const li = document.createElement('li');
  li.textContent = timestamp;
  timestampsList.appendChild(li);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
splitButton.addEventListener('click', splitTime);
