// Initialize timer values
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let currentTime = workTime;
let isTimerRunning = false;
let isWorkSession = true;
let timerInterval;

const timerDisplay = document.getElementById('timerDisplay');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

// Start or stop the timer
startStopButton.addEventListener('click', function() {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    startStopButton.textContent = "Start";
  } else {
    timerInterval = setInterval(updateTimer, 1000);
    startStopButton.textContent = "Pause";
  }
  isTimerRunning = !isTimerRunning;
});

// Reset the timer
resetButton.addEventListener('click', function() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  currentTime = workTime;
  timerDisplay.textContent = formatTime(currentTime);
  startStopButton.textContent = "Start";
  statusDisplay.textContent = "";
});

// Update the timer
function updateTimer() {
  if (currentTime > 0) {
    currentTime--;
    timerDisplay.textContent = formatTime(currentTime);
  } else {
    // Change session after timer runs out
    if (isWorkSession) {
      statusDisplay.textContent = "Time to take a break!";
      currentTime = breakTime;
      isWorkSession = false;
    } else {
      statusDisplay.textContent = "Back to work!";
      currentTime = workTime;
      isWorkSession = true;
    }
  }
}

// Format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Initial display
timerDisplay.textContent = formatTime(currentTime);
