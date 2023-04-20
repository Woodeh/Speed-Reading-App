function splitText(text) {
  const words = text.split(/\s+/);
  return words;
}

let currentWordIndex = 0;
let intervalId = null;
let words = [];
let wordCount = 0;
let startTime = null;
let elapsedTime = null;
let wpm = 0;
let timerId = null;

function displayNextWord() {
  const wordContainer = document.querySelector(".word-container");
  wordContainer.textContent = words[currentWordIndex];

  currentWordIndex++;
  if (currentWordIndex >= words.length) {
    currentWordIndex = 0;
  }

  wordCount++;
  updateStats();
}

function updateTimer() {
  const timerElement = document.querySelector(".timer");
  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  timerElement.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startReading(speed) {
  stopReading();
  intervalId = setInterval(displayNextWord, speed);

  startTime = Date.now();
  elapsedTime = 0;
  wordCount = 0;
  wpm = 0;
  updateStats();

  if (timerId !== null) {
    clearInterval(timerId);
  }
  updateTimer();
  timerId = setInterval(updateTimer, 1000);

  const wpmElement = document.querySelector(".wpm");
  wpmElement.textContent = 0;
}

function stopReading() {
  clearInterval(intervalId);
  intervalId = null;

  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  elapsedTime = Date.now() - startTime;
  updateStats();
  updateTimer();
}

function updateStats() {
  const wordsReadElement = document.querySelector(".words-read");
  wordsReadElement.textContent = wordCount;

  if (elapsedTime > 0 && wordCount > 0) {
    wpm = Math.round((wordCount / elapsedTime) * 60000);
    const wpmElement = document.querySelector(".wpm");
    wpmElement.textContent = wpm;
  }
}

const text =
  "скорочтение это навык быстрого чтения который позволяет прочитывать тексты на порядок быстрее чем обычным чтением люди обладающие этим навыком могут значительно увеличить свою производительность получить больше информации за короткий промежуток времени и улучшить свои умственные способности одним из главных принципов скорочтения является отказ от подсознательного замедления чтения голосом или произнесением слов в уме вместо этого скорочтец фокусируется на группах слов и предложений а не на каждом слове по отдельности одним из способов развития навыка скорочтения является увеличение скорости чтения путем уменьшения количества времени затрачиваемого на чтение каждой страницы другим способом является тренировка в восприятии групп слов улучшение внимания и скорости реакции на изменения в тексте тренировки скорочтения могут включать в себя использование специальных техник и упражнений таких как сканирование текста чтение с помощью периферийного зрения и чтение нескольких строк одновременно также можно использовать специальные программы которые помогают тренировать навык скорочтения и увеличивать скорость чтения важно понимать что скорочтение не должно приводить к потере качества восприятия информации скорочтец должен уметь понимать прочитанное и запоминать его так же как и при обычном чтении поэтому необходимо научиться контролировать скорость чтения в зависимости от сложности текста и своих возможностей интересно что некоторые известные люди были скорочтецами например Томас Джефферсон умел читать со скоростью до 1000 слов в минуту а Никола Тесла - до 1200 слов в минуту это позволяло им получать больше знаний и работать более эффективно";
words = splitText(text);

const speedButtons = document.querySelectorAll(".speed-button");
speedButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const speed = button.dataset.speed;
    startReading(speed);
  });
});

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function () {
  startReading(1000);
});

function resetReading() {
  currentWordIndex = 0;
  wordCount = 0;
  elapsedTime = null;
  wpm = 0;
  updateStats();

  const wordContainer = document.querySelector(".word-container");
  wordContainer.textContent = "";

  const timerElement = document.querySelector(".timer");
  timerElement.textContent = "0:00";
}

let stopButtonClickCount = 0;

const stopButton = document.querySelector(".stop-button");
stopButton.addEventListener("click", function () {
  stopButtonClickCount++;

  if (stopButtonClickCount === 1) {
    stopReading();
  } else {
    resetReading();
    stopButtonClickCount = 0;
  }
});
