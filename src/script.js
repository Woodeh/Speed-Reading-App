let currentIndex = 0;
let currentTextIndex = 0;
let intervalId;
let timerIntervalId;
let wordCount = 0;
let startTime = new Date();
let countdownIntervalId;
let countdownValue = 3;



const texts = ["скорочтение это навык быстрого чтения который позволяет прочитывать тексты на порядок быстрее чем обычным чтением люди обладающие этим навыком могут значительно увеличить свою производительность получить больше информации за короткий промежуток времени и улучшить свои умственные способности одним из главных принципов скорочтения является отказ от подсознательного замедления чтения голосом или произнесением слов в уме вместо этого скорочтец фокусируется на группах слов и предложений а не на каждом слове по отдельности одним из способов развития навыка скорочтения является увеличение скорости чтения путем уменьшения количества времени затрачиваемого на чтение каждой страницы другим способом является тренировка в восприятии групп слов улучшение внимания и скорости реакции на изменения в тексте тренировки скорочтения могут включать в себя использование специальных техник и упражнений таких как сканирование текста чтение с помощью периферийного зрения и чтение нескольких строк одновременно также можно использовать специальные программы которые помогают тренировать навык скорочтения и увеличивать скорость чтения важно понимать что скорочтение не должно приводить к потере качества восприятия информации скорочтец должен уметь понимать прочитанное и запоминать его так же как и при обычном чтении поэтому необходимо научиться контролировать скорость чтения в зависимости от сложности текста и своих возможностей интересно что некоторые известные люди были скорочтецами например Томас Джефферсон умел читать со скоростью до 1000 слов в минуту а Никола Тесла - до 1200 слов в минуту это позволяло им получать больше знаний и работать более эффективно", 
"Братья Райт были американскими изобретателями и авиаконструкторами, которые создали и построили первый самолет в истории человечества. Они начали экспериментировать с авиацией еще в конце 19 века, и постепенно разрабатывали концепцию, которая привела к их историческому полету в 1903 году. Райты строили свой первый самолет в своей мастерской в Дэтоне, штат Огайо, где они проводили множество экспериментов, используя различные материалы и механизмы, чтобы создать легкий и прочный самолет. Они использовали бензиновый двигатель, который был специально разработан для их самолета, и собрали крылья и фюзеляж вместе, чтобы создать функционирующую машину. В конце 1903 года Райты наконец смогли подняться в воздух на своем самолете, который они назвали Flyer. В течение нескольких лет после этого они продолжали разрабатывать и улучшать свой самолет, чтобы сделать его более эффективным и устойчивым. Их достижения стали фундаментом для дальнейшего развития авиации, и сегодня мы имеем самолеты, которые летают на большие расстояния и способны перевозить огромное количество пассажиров и грузов.", "ddd aa", "eba eba eba", "Концепция первого мотоцикла Harley Davidson была основана на простой идеи: создать мощный, но в то же время надежный мотоцикл, который мог бы покорять любую дорогу. Уильям Харли и Артур Дэвидсон провели много времени, тестировая и улучшая свой первый мотоцикл. Их первый мотоцикл был создан на основе велосипеда, который был укомплектован мотором с внутренним сгоранием. Двигатель был очень простой в использовании, но был гораздо мощнее, чем любые предыдущие моторы для велосипедов Первый мотоцикл Harley Davidson имел только один цилиндр и развивал скорость около 25 км/час. Он был оснащен пневматическими шинами, что делало езду на нем гораздо более комфортной, чем на многих других мотоциклах того времени Когда первый мотоцикл Harley Davidson был готов, его создатели протестировали его на улицах Милуоки. Они были поражены тем, насколько легко управлять мотоциклом и как хорошо он ездил по дорогам После этого первый мотоцикл Harley Davidson получил множество усовершенствований и модификаций. Вскоре мотоциклы Harley Davidson стали очень популярными среди любителей скорости и приключений Сегодня мотоциклы Harley Davidson остаются одними из самых популярных мотоциклов в мире, и их символика и дизайн стали неотъемлемой частью культуры мотоциклетных фанатов."];

const textTitles = {
  0: "Скорочтение",
  1: "Первый самолет",
  2: "Lerrarara",
  3: "ebaebaba",
  4: "Harley Davidson",
  5: "random",
};



function removePunctuation() {
  for (let i = 0; i < texts.length; i++) {
    texts[i] = texts[i].replace(/[.,-:]/g, "");
  }
}


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

let isReading = false;
let words = [];

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
}, 1000 * 60 / speed);
}

function startReading() {
const speed = document.getElementById("speed").value;
words = texts[currentTextIndex].split(" ");
currentIndex = 0;
startTime = new Date();
document.getElementById("start").disabled = true;
document.getElementById("stop").disabled = false;
isReading = true; //  флаг
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
      setTimeout(function() {
        document.getElementById("selected-text").innerText = "Выбран текст: " + textTitles[currentTextIndex];
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
    const response = await fetch('https://baconipsum.com/api/?type=all-meat&sentences=10');
    const data = await response.json();
    texts.push(data[0]);
    textTitles[texts.length - 1] = "Random Text (слова о мясе на английском языке)";
    randomButton.setAttribute("data-index", texts.length - 1);
    randomButton.innerText = "Random Text";
    currentTextIndex = texts.length - 1;
    modal.remove();
    clearReading();
    removePunctuation();
    setTimeout(function() {
      document.getElementById("selected-text").innerText = "Выбран текст: " + textTitles[currentTextIndex];
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




const infoBtn = document.getElementById("info-button");
const infoModal = document.getElementById("info-modal");


const closeBtn = infoModal.getElementsByClassName("close")[0];

infoBtn.onclick = function() {
  infoModal.style.display = "block";
};


closeBtn.onclick = function() {
  infoModal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == infoModal) {
    infoModal.style.display = "none";
  }
};