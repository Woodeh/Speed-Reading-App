const texts = [
  "Осенью листья деревьев покрываются желтой и красной окраской.",
  "В зоопарке можно увидеть множество разных животных, начиная от львов и заканчивая пингвинами.",
  "После дождя на улице образуются лужи, в которых отражаются здания и деревья.",
  "В зимнее время года снег покрывает землю, создавая красивые ландшафты.",
  "Люди занимаются разными видами спорта, например, футболом, баскетболом, теннисом и гимнастикой.",
];

const startButton = document.getElementById("startButton");
const word = document.getElementById("word");
const textDiv = document.getElementById("text");
const scoreDiv = document.getElementById("score");
const timerDiv = document.getElementById("timer");
const restartButton = document.getElementById("restartButton");

let seconds = 60;
let timerInterval;
let selectedWordIndex = -1;
let words = [];
let targetWordDiv;
let score = 0;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", () => location.reload());

function startGame() {
  startButton.style.display = "none";
  word.style.visibility = "visible";
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  words = randomText
    .toLowerCase()
    .replace(/[^a-zа-яё]+/g, " ")
    .split(" ")
    .filter((word) => word.length >= 4);
  selectedWordIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[selectedWordIndex];
  const textWithoutWord = randomText
    .toLowerCase()
    .replace(randomWord.toLowerCase(), "");
  const text = randomText
    .toLowerCase()
    .replace(
      randomWord.toLowerCase(),
      `<span id='targetWord'>${randomWord}</span>`
    );
  textDiv.innerHTML = text;
  word.innerText = randomWord;
  scoreDiv.innerText = score;
  seconds = 60;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds--;
    timerDiv.innerText = `Осталось времени: ${seconds} секунд`;
    if (seconds <= 0) {
      clearInterval(timerInterval);
      finishGame();
    }
  }, 1000);
  targetWordDiv = document.getElementById("targetWord");
  targetWordDiv.addEventListener("click", onTargetWordClick);
}

function onTargetWordClick(event) {
  if (
    event.target.innerText.toLowerCase() ===
    words[selectedWordIndex].toLowerCase()
  ) {
    score++;
    scoreDiv.innerText = score;
    targetWordDiv.removeEventListener("click", onTargetWordClick);
    selectedWordIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[selectedWordIndex];
    const randomText = document.getElementById("text").innerText;
    const text = randomText
      .toLowerCase()
      .replace(
        randomWord.toLowerCase(),
        `<span id='targetWord'>${randomWord}</span>`
      );
    textDiv.innerHTML = text;
    word.innerText = randomWord;
    targetWordDiv = document.getElementById("targetWord");
    targetWordDiv.addEventListener("click", onTargetWordClick);
  }
}

function finishGame() {
  word.style.visibility = "hidden";
  timer.style.display = "none";
  restartButton.style.display = "inline";
  alert(`Игра закончена!\nНайдено слов: ${score}\n\nНажмите ОК для повтора.`);
}
