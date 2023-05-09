const texts = [
  "Космос – это бескрайняя территория, которая внушает человеку своей загадочностью и прекрасной красотой. Исследование космоса является одной из важнейших задач человечества, поскольку это помогает расширять наши знания о Вселенной и нашем месте в ней. Благодаря космическим миссиям, мы смогли узнать о других планетах и исследовать тайны звездных систем Однако космос – это не только интересные открытия и новые технологии. Это также вызовы и проблемы, связанные с безопасностью космических полетов и защитой нашей планеты от космических объектов, которые могут представлять угрозу для жизни на Земле. Исследование космоса – это продолжающийся процесс, который требует совместных усилий со стороны различных стран и организаций. Надеемся, что в будущем мы сможем продолжать расширять наши знания о космосе и использовать их для улучшения жизни на Земле.",
  "Представляете ли вы себе, как много информации мы ежедневно получаем? По данным IBM, каждый день в мире создается около 2.5 квинтиллиона байтов данных. Чтобы это прояснить, если каждый байт был бы словом, то это бы составило 250 миллионов книг в день! Информация, которую мы получаем, может быть полезной и вредной. Чтобы использовать ее мудро, необходимы навыки анализа и оценки достоверности. Как правило, нельзя просто взять информацию на веру и нужно проверять ее в разных источниках. Важно уметь отделять факты от мнений и различать источники, чтобы принимать информированные решения.",
  "В современном мире информационных технологий безопасность данных становится все более важной. Кибератаки на компании, правительства и даже отдельных пользователей становятся все более частыми и изощренными. Защита данных становится задачей не только IT-специалистов, но и обычных пользователей. Важно понимать, что данные могут быть украдены или повреждены не только из-за хакерских атак, но и из-за наших собственных ошибок в обращении с ними. Поэтому необходимо соблюдать правила безопасности данных, такие как регулярное обновление паролей, использование антивирусного программного обеспечения и осторожность при общении в интернете.",
  "Современный мир также сталкивается с проблемой экологии. Загрязнение окружающей среды, потеря биоразнообразия и изменение климата стали серьезными проблемами нашего времени. Чтобы справиться с этими проблемами, необходимо не только научиться использовать возобновляемые источники энергии, но и уменьшить свой углеродный след, то есть объем выбросов углекислого газа в атмосферу. Маленькие изменения в повседневной жизни, такие как использование общественного транспорта, отказ от использования пластиковых изделий и питание на основе растительных продуктов, могут оказать большое влияние на сохранение окружающей среды. Каждый из нас может внести свой вклад в борьбу за экологию, чтобы наследие, которое мы оставим будущим поколениям, было более благоприятным.",
  "Образование является одним из ключевых факторов, определяющих успех человека в жизни. Оно дает возможность получить знания, необходимые для профессионального и личностного роста, а также участвовать в жизни общества и формировать свои взгляды и ценности. Однако доступ к качественному образованию не всегда равномерен. Во многих странах мира существуют проблемы с доступом к образованию, низким качеством образования и недостаточной подготовкой учителей. Решение этих проблем требует усилий со стороны правительств, образовательных учреждений и общества в целом. Важно не только повышать доступность и качество образования, но и обеспечить равные возможности для всех людей в обучении, независимо от социального статуса, пола, расы и других факторов.",
  "Компьютерные игры стали неотъемлемой частью современной культуры. Они представляют собой развлекательный инструмент, который помогает людям расслабиться и отвлечься от повседневных проблем. Однако компьютерные игры не ограничиваются только развлечением, они также могут быть полезными для развития когнитивных и социальных навыков. Некоторые игры, например, могут помочь улучшить реакцию и координацию движений, а другие могут помочь улучшить коммуникативные навыки и умение работать в команде.Однако необходимо помнить, что игры могут стать проблемой, если человек становится зависимым от них. Игровая зависимость может привести к социальной изоляции, плохому здоровью и проблемам в работе и обучении.",
];

const startButton = document.getElementById("startButton");
const word = document.getElementById("word");
const textDiv = document.getElementById("text");
const scoreDiv = document.getElementById("score");
const foundDiv = document.getElementById("foundDiv");
const timerDiv = document.getElementById("timer");
const restartButton = document.getElementById("restartButton");
const wordTitle = document.getElementById("word-for-search");
const resultId = document.getElementById("result-container");
const aboutId = document.getElementById("about-game-container");

let seconds = 60;
let timerInterval;
let selectedWordIndex = -1;
let words = [];
let targetWordDiv;
let score = 0;

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.style.display = "none";
  resultId.style.display = "block";
  wordTitle.style.display = "block";
  aboutId.style.display = "none";
  word.style.visibility = "visible";
  textDiv.style.height = "330px";
  textDiv.style.marginTop = "20px";

  const randomText = texts[Math.floor(Math.random() * texts.length)];
  words = randomText
    .replace(/[^a-zA-Zа-яА-ЯёЁ]+/g, " ")
    .split(" ")
    .filter((word) => word.length >= 4);
  selectedWordIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[selectedWordIndex];
  const textWithoutWord = randomText.replace(new RegExp(randomWord, "gi"), "");
  const text = randomText.replace(
    new RegExp(randomWord, "gi"),
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
  if (event.target.innerText === words[selectedWordIndex]) {
    score++;
    scoreDiv.innerText = score;
    targetWordDiv.removeEventListener("click", onTargetWordClick);
    selectedWordIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[selectedWordIndex];
    const randomText = document.getElementById("text").innerText;
    const text = randomText.replace(
      new RegExp(randomWord, "gi"),
      `<span id='targetWord'>${randomWord}</span>`
    );
    textDiv.innerHTML = text;
    word.innerText = randomWord;
    targetWordDiv = document.getElementById("targetWord");
    targetWordDiv.addEventListener("click", onTargetWordClick);
  }
}
function finishGame() {
  alert(`Игра закончена!\nНайдено слов: ${score}\n\nНажмите ОК для повтора.`);
  location.reload();
}
