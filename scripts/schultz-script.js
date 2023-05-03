// const table = document.getElementById("table");
// const restartButton = document.getElementById("restart-btn");
const size5Button = document.getElementById("size5-btn");
const size6Button = document.getElementById("size6-btn");
const size7Button = document.getElementById("size7-btn");
const size8Button = document.getElementById("size8-btn");
let expectedNumber = 1;
let gameStarted = false;
let startTime;
let currentSize = 4;

function createTable(size) {
  const numbers = Array.from({length: size * size}, (_, i) => i + 1);

  shuffleArray(numbers);

  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      cell.innerHTML = numbers[i * size + j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  table.addEventListener("click", function(e) {
    const cell = e.target;
    if (cell.tagName === "TD" && !cell.classList.contains("highlight")) {
      if (!gameStarted) { 
        startTime = new Date().getTime(); 
        gameStarted = true; 
      }
      const selectedNumber = parseInt(cell.innerHTML);
      if (selectedNumber === expectedNumber) {
        cell.classList.add("highlight");
        expectedNumber++;
        if (expectedNumber > table.querySelectorAll('td').length) {
          const endTime = new Date().getTime(); 
          const timeDiff = endTime - startTime; 
          const seconds = Math.round(timeDiff / 1000);
          alert("Ура! Вы справились с этой задачей! \nВремя вашей игры: " + seconds + " секунд"); 
        }
      } else {
        cell.classList.add("wrong");
        setTimeout(() => {
          cell.classList.remove("wrong");
        }, 1000);
      }
    }
  });
  
  expectedNumber = 1;
  const highlightedCells = table.querySelectorAll('.highlight');
  for (let i = 0; i < highlightedCells.length; i++) {
    highlightedCells[i].classList.remove('highlight'); 
  }
  currentSize = size; // обновляем текущий размер доски
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


const sizeRadios = document.querySelectorAll('input[name="table-size"]');
const restartButton = document.getElementById("restartButton");
const table = document.getElementById("table");

function clearTableAndCreateNewTable(size) {
    table.innerHTML = "";
    createTable(size);
}

for (let i = 0; i < sizeRadios.length; i++) {
    sizeRadios[i].addEventListener("change", function() {
        clearTableAndCreateNewTable(this.value);
    });
}

restartButton.addEventListener("click", function() {
  clearTableAndCreateNewTable(currentSize); // передаем текущий размер доски
  gameStarted = false;
});

window.onload = function() {
  createTable(4);
};

table.addEventListener("click", function(e) {
  const cell = e.target;
  if (cell.tagName === "TD" && cell.classList.contains("btn")) {
    const selectedNumber = parseInt(cell.innerHTML);
    if (selectedNumber === expectedNumber) {
      cell.classList.add("highlight");
      expectedNumber++;
      if (document.querySelectorAll('.highlight').length === document.querySelectorAll('td').length) {
        alert("Поздравляем, вы выиграли!");
      }
    } else {
      cell.style.backgroundColor = "red";
    }
  }
});



const infoBtn = document.getElementById("info-button");
const infoModal = document.getElementById("info-modal");
const closeBtn = infoModal.getElementsByClassName("close")[0];


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
