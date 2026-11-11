const timeDisplay = document.querySelector(".clock");
const btn = document.querySelector(".btn");
const scoreDisplay = document.querySelector(".score");
const hackArea = document.querySelector(".hack-area");
const statusDisplay = document.querySelector(".status");



let secondsLeft = 20;

btn.addEventListener("click", function () {
  secondsLeft = 20;
  score = 0;
  timeDisplay.textContent = secondsLeft;
  scoreDisplay.textContent = score;
  statusDisplay.textContent = "Злам триває... Клікайте по вузлах!";
  statusDisplay.style.color = "#00ff41";
  btn.disabled = true;

  createTarget();

  countdownLoop = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      timeDisplay.textContent = secondsLeft;
    }

    if (secondsLeft == 0) {
      finishHack(false);
    }

    console.log(secondsLeft);
  }, 1000);
});













// ШІ код

let score = 0;
const maxScore = 15;
let countdownLoop = null;
const hackCommands = [
  "[0x7F]",
  "BYPASS",
  "DECRYPT",
  "ROOT",
  "INJECT",
  "ACCESS",
  "SUDO",
];

function createTarget() {
  hackArea.innerHTML = "";

  const targetBtn = document.createElement("button");
  targetBtn.classList.add("target");

  const randomIndex = Math.floor(Math.random() * hackCommands.length);
  targetBtn.textContent = hackCommands[randomIndex];

  hackArea.appendChild(targetBtn);

  const maxX = hackArea.clientWidth - targetBtn.offsetWidth;
  const maxY = hackArea.clientHeight - targetBtn.offsetHeight;

  targetBtn.style.left = Math.floor(Math.random() * maxX) + "px";
  targetBtn.style.top = Math.floor(Math.random() * maxY) + "px";

  targetBtn.addEventListener("click", function () {
    score++;
    scoreDisplay.textContent = score;

    if (score >= maxScore) {
      finishHack(true);
    } else {
      createTarget();
    }
  });
}

function finishHack(isSuccess) {
  clearInterval(countdownLoop);
  hackArea.innerHTML = "";
  btn.disabled = false;
  btn.textContent = "Почати злам";

  if (isSuccess) {
    statusDisplay.textContent = "ДОСТУП ОТРИМАНО! Систему зламано.";
    statusDisplay.style.color = "#00ff41";
  } else {
    statusDisplay.textContent = "ЧАС ВИЙШОВ! Злам заблоковано.";
    statusDisplay.style.color = "#ff3333";
  }
}
