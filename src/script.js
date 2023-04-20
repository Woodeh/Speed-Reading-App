let currentIndex = 0;
let currentTextIndex = 0;
let intervalId;
let timerIntervalId;
let wordCount = 0;
let startTime = new Date();

const texts = ["rem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor", "Sit amet consectetur adipiscing elit"];

function updateTimer() {
  const currentTime = new Date();
  const totalTime = (currentTime - startTime) / 1000;
  document.getElementById("timer").innerText = `Время: ${Math.round(totalTime)} секунд`;
}



function startReading() {
  const speed = document.getElementById("speed").value;
  const words = texts[currentTextIndex].split(" ");
  currentIndex = 0;
  startTime = new Date();
  
  let countdownSeconds = 5;
  document.getElementById("text").innerText = countdownSeconds;
  
  let countdownIntervalId = setInterval(() => {
  countdownSeconds--;
  document.getElementById("text").innerText = countdownSeconds;
  if (countdownSeconds === 0) {
    clearInterval(countdownIntervalId);
    
    intervalId = setInterval(() => {
      if (currentIndex >= words.length) {
        currentIndex = 0; 
      }
      document.getElementById("text").innerText = words[currentIndex++];
      wordCount++;
      document.getElementById("count").innerText = `Прочитано слов: ${wordCount}`;
    }, 1000 * 60 / speed);
  }
}, 1000);

timerIntervalId = setInterval(() => {
updateTimer();
}, 1000);
}

function stopReading() {
  clearInterval(intervalId);
  clearInterval(timerIntervalId); 
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
  updateTimer();
  document.getElementById("count").innerText = `Прочитано слов: ${wordCount}`;
}

function clearReading() {
  clearInterval(intervalId);
  clearInterval(timerIntervalId); 
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
  document.getElementById("text").innerText = "";
  document.getElementById("count").innerText = "";
  document.getElementById("timer").innerText = "Время: 0 секунд";
  currentIndex = 0;
  wordCount = 0;
  startTime = new Date();
}

function toggleText() {
  currentTextIndex++;
  if (currentTextIndex >= texts.length) {
    currentTextIndex = 0;
  }
  clearReading();
  document.getElementById("text").innerText = "";
}

document.getElementById("start").addEventListener("click", () => {
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  startReading();
});

document.getElementById("stop").addEventListener("click", stopReading);

document.getElementById("clear").addEventListener("click", clearReading);

document.getElementById("toggle").addEventListener("click", toggleText);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("stop").disabled = true;
  document.getElementById("timer").innerText = "Время: 0 секунд";
  document.getElementById("text").innerText = texts[currentTextIndex];
});