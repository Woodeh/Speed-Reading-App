import {texts, textTitles} from './texts.js';

let currentIndex = 0;
let currentTextIndex = 0;
let intervalId;
let timerIntervalId;
let wordCount = 0;
let startTime = new Date();
let countdownIntervalId;
let countdownValue = 3;
let isReading = false;
let words = [];
const infoBtn = document.getElementById("info-button");
const infoModal = document.getElementById("info-modal");
const closeBtn = infoModal.getElementsByClassName("close")[0];


function removePunctuation() {
  for (let i = 0; i < texts.length; i++) {
    texts[i] = texts[i].replace(/[,.-]/g, "");
  }
}

function updateTimer() {
  const currentTime = new Date();
  const totalTime = (currentTime - startTime) / 1000;
  document.getElementById("timer").innerText = `Время: ${Math.round(
    totalTime
  )} секунд`;
}

function updateCountdown() {
  if (countdownValue > 0) {
    document.getElementById(
      "text"
    ).innerText = `Старт через: ${countdownValue--}`;
  } else {
    clearInterval(countdownIntervalId);
    document.getElementById("text").innerText = "Начинаем!";
    startReading();
  }
}

function startCountdown() {
  document.getElementById("start").disabled = true;
  countdownValue = 3;
  countdownIntervalId = setInterval(() => {
    updateCountdown();
  }, 1000);
}


function changeSpeed() {
  const speed = document.getElementById("speed").value;
  if (!isReading) {
    return;
  }
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (currentIndex >= words.length) {
      currentIndex = 0;
    }
    document.getElementById("text").innerText = words[currentIndex++];
    wordCount++;
    document.getElementById("count").innerText = `Прочитано слов: ${wordCount}`;
  }, (1000 * 60) / speed);
}

function startReading() {
  const speed = document.getElementById("speed").value;
  words = texts[currentTextIndex].split(" ");
  currentIndex = 0;
  startTime = new Date();
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  isReading = true;
  timerIntervalId = setInterval(() => {
    updateTimer();
  }, 1000);
  intervalId = setInterval(() => {
    if (currentIndex >= words.length) {
      clearInterval(intervalId);
      clearInterval(timerIntervalId);
      document.getElementById("start").disabled = false;
      document.getElementById("stop").disabled = true;
      isReading = false;
      document.getElementById("text").innerText = "Вы прочитали текст до конца!";
      return;
    }
    document.getElementById("text").innerText = words[currentIndex++];
    wordCount++;
    document.getElementById("count").innerText = `Прочитано слов: ${wordCount}`;
  }, (1000 * 60) / speed);
  document.getElementById("speed").addEventListener("change", changeSpeed);
}

function stopReading() {
  clearInterval(intervalId);
  clearInterval(timerIntervalId);
  isReading = false; // устанавливаем флаг isReading в false
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
}

function clearReading() {
  clearInterval(intervalId);
  clearInterval(timerIntervalId);
  clearInterval(countdownIntervalId);
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
  document.getElementById("text").innerText = "";
  document.getElementById("count").innerText = "";
  document.getElementById("timer").innerText = "Время: 0 секунд";
  currentIndex = 0;
  wordCount = 0;
  startTime = new Date();
}

async function selectText() {
  const group = document.createElement("div");
  group.setAttribute("id", "select-text");
  const modal = document.createElement("div");
  const toggleButton = document.getElementById("toggle");
  modal.classList.add("modal");
  modal.appendChild(group);

  const selectTextHandler = (event) => {
    const button = event.target;
    if (button.tagName === "BUTTON") {
      currentTextIndex = parseInt(button.getAttribute("data-index"), 10);
      modal.remove();
      clearReading();
      document.getElementById("selected-text").innerText = "Загрузка...";
      setTimeout(function () {
        document.getElementById("selected-text").innerText =
          "Выбран текст: " + textTitles[currentTextIndex];
      }, 1000);

      toggleButton.disabled = false;
      group.removeEventListener("click", selectTextHandler);
    }
  };

  const buttons = texts.reduceRight((acc, _, i) => {
    const button = document.createElement("button");
    button.setAttribute("data-index", i);
    button.classList.add("text-selector-button");
    button.innerText = textTitles[i];
    button.style.opacity = 1;
    group.appendChild(button);
    acc.push(button);
    return acc;
  }, []);

  const randomButton = document.createElement("button");
  randomButton.classList.add("text-selector-button");
  randomButton.innerText = "Random(eng)";
  group.appendChild(randomButton);
  buttons.push(randomButton);
  removePunctuation();
  group.addEventListener("click", selectTextHandler);
  toggleButton.parentNode.appendChild(modal);
  toggleButton.disabled = true;
  document.getElementById("selected-text").innerText = "Выберите текст:";

  let delay = 0;
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    setTimeout(() => {
      button.style.opacity = 1;
    }, delay);
    group.insertBefore(button, group.firstChild);
    delay += 100;
  }

  randomButton.addEventListener("click", async () => {
    try {
      const response = await fetch(
        "https://baconipsum.com/api/?type=all-meat&sentences=10"
      );
      const data = await response.json();
      texts.push(data[0]);
      textTitles[texts.length - 1] =
        "Random Text (слова о мясе на английском языке)";
      randomButton.setAttribute("data-index", texts.length - 1);
      randomButton.innerText = "Random Text";
      currentTextIndex = texts.length - 1;
      modal.remove();
      clearReading();
      removePunctuation();
      setTimeout(function () {
        document.getElementById("selected-text").innerText =
          "Выбран текст: " + textTitles[currentTextIndex];
      }, 1000);
      toggleButton.disabled = false;
    } catch (error) {
      console.error(error);
    }
  });
}

document.getElementById("toggle").addEventListener("click", selectText);
document.getElementById("start").addEventListener("click", () => {
  startCountdown();
});
document.getElementById("stop").addEventListener("click", stopReading);
document.getElementById("clear").addEventListener("click", clearReading);
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("stop").disabled = true;
  document.getElementById("timer").innerText = "Время: 0 секунд";
});


infoBtn.onclick = function () {
  infoModal.style.display = "block";
};

closeBtn.onclick = function () {
  infoModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == infoModal) {
    infoModal.style.display = "none";
  }
};
