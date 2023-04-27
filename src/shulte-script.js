// const table = document.getElementById("table");
// const restartButton = document.getElementById("restart-btn");
const size5Button = document.getElementById("size5-btn");
const size6Button = document.getElementById("size6-btn");
const size7Button = document.getElementById("size7-btn");
const size8Button = document.getElementById("size8-btn");
let expectedNumber = 1;

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
      const selectedNumber = parseInt(cell.innerHTML);
      if (selectedNumber === expectedNumber) {
        cell.classList.add("highlight");
        expectedNumber++;
        if (expectedNumber > size * size) {
          alert("Поздравляем, вы выиграли!");
        }
      } else {
        cell.classList.add("wrong");
      setTimeout(() => {
        cell.classList.remove("wrong");
      }, 1000);
      }
    }
  });
  
  expectedNumber = 1; // обновляем переменную expectedNumber
  const highlightedCells = table.querySelectorAll('.highlight');
  for (let i = 0; i < highlightedCells.length; i++) {
    highlightedCells[i].classList.remove('highlight'); // сбрасываем выделение ячеек
  }
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
    clearTableAndCreateNewTable(5);
});


restartButton.addEventListener("click", function() {
  table.innerHTML = "";
  createTable(4);
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


