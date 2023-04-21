let currentIndex = 0;
let currentTextIndex = 0;
let intervalId;
let timerIntervalId;
let wordCount = 0;
let startTime = new Date();
let countdownIntervalId;
let countdownValue = 3;

const texts = ["скорочтение это навык быстрого чтения который позволяет прочитывать тексты на порядок быстрее чем обычным чтением люди обладающие этим навыком могут значительно увеличить свою производительность получить больше информации за короткий промежуток времени и улучшить свои умственные способности одним из главных принципов скорочтения является отказ от подсознательного замедления чтения голосом или произнесением слов в уме вместо этого скорочтец фокусируется на группах слов и предложений а не на каждом слове по отдельности одним из способов развития навыка скорочтения является увеличение скорости чтения путем уменьшения количества времени затрачиваемого на чтение каждой страницы другим способом является тренировка в восприятии групп слов улучшение внимания и скорости реакции на изменения в тексте тренировки скорочтения могут включать в себя использование специальных техник и упражнений таких как сканирование текста чтение с помощью периферийного зрения и чтение нескольких строк одновременно также можно использовать специальные программы которые помогают тренировать навык скорочтения и увеличивать скорость чтения важно понимать что скорочтение не должно приводить к потере качества восприятия информации скорочтец должен уметь понимать прочитанное и запоминать его так же как и при обычном чтении поэтому необходимо научиться контролировать скорость чтения в зависимости от сложности текста и своих возможностей интересно что некоторые известные люди были скорочтецами например Томас Джефферсон умел читать со скоростью до 1000 слов в минуту а Никола Тесла - до 1200 слов в минуту это позволяло им получать больше знаний и работать более эффективно", 
"Sit amet consectetur adipiscing elit", "aaa ddd aaa"];

const textTitles = {
  0: "Скорочтение",
  1: "Lorem Ipsum",
  2: "AAA DDD AAA"
};



function updateTimer() {
  const currentTime = new Date();
  const totalTime = (currentTime - startTime) / 1000;
  document.getElementById("timer").innerText = `Время: ${Math.round(totalTime)} секунд`;
}

function updateCountdown() {
  if (countdownValue > 0) {
    document.getElementById("text").innerText = `Старт через: ${countdownValue--}`;
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

function startReading() {
  const speed = document.getElementById("speed").value;
  const words = texts[currentTextIndex].split(" ");
  currentIndex = 0;
  startTime = new Date(); 
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  intervalId = setInterval(() => {
    if (currentIndex >= words.length) {
      currentIndex = 0; 
    }
    document.getElementById("text").innerText = words[currentIndex++];
    wordCount++;
    document.getElementById("count").innerText = `Прочитано слов: ${wordCount}`;
  }, 1000 * 60 / speed);

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

function selectText() {
  const select = document.createElement("select");
  select.setAttribute("id", "select-text");

  // Добавляем опции выбора текста
  for (let i = 0; i < texts.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = textTitles[i];
    select.appendChild(option);
  }

  // Создаем модальное окно
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(select);
  const button = document.createElement("button");
  button.innerText = "Выбрать";
  button.addEventListener("click", () => {
    currentTextIndex = select.value;
    modal.remove();
    clearReading();
    document.getElementById("selected-text").innerText = "Выбран текст: " + textTitles[currentTextIndex];
    toggleButton.disabled = false; // Разблокировка кнопки toggle
  });
  modal.appendChild(button);
  document.body.appendChild(modal);

  // Удаление модального окна при клике за его пределами
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
      toggleButton.disabled = false; // Разблокировка кнопки toggle
    }
  });

  const toggleButton = document.getElementById("toggle");
  toggleButton.disabled = true; // Блокировка кнопки toggle
  document.getElementById("selected-text").innerText = "Сначала выберите текст";
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

