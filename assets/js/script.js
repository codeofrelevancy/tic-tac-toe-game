const WINNING_PROBABILITIES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let avatarX, avatarO;

const cells = document.querySelectorAll(".cell");

const board = document.getElementById("board");

const playerXFile = document.getElementById("player-x-file");
const playerOFile = document.getElementById("player-o-file");

const playerXAvatarAction = document.getElementById("player-x-avatar-action");
const playerOAvatarAction = document.getElementById("player-o-avatar-action");

const playerXAvatar = document.getElementById("player-x-avatar");
const playerOAvatar = document.getElementById("player-o-avatar");

const playerXName = document.getElementById("player-x-name");
const playerOName = document.getElementById("player-o-name");

const playerXScore = document.getElementById("player-x-score");
const playerOScore = document.getElementById("player-o-score");

const playerXTrophy = document.getElementById("player-x-trophy");
const playerOTrophy = document.getElementById("player-o-trophy");

const winline = document.getElementById("win-line");

const resetGameAction = document.getElementById("reset-game-action");
const resetScoreAction = document.getElementById("reset-score-action");
const downloadAction = document.getElementById("download-action");
const alrightAction = document.getElementById("alright-action");

const confettiAnimation = document.getElementById("confetti");

const drawModal = document.getElementById("draw-modal");

function onMount() {
  avatarX = "./assets/images/davy-jones.jpg";
  avatarO = "./assets/images/jack-sparrow.jpg";

  playerXAvatar.src = avatarX;
  playerOAvatar.src = avatarO;

  syncScoreStatus();

  resetGameAction.addEventListener("click", onResetGame);
  alrightAction.addEventListener("click", onResetGame);
  resetScoreAction.addEventListener("click", onResetScore);
  downloadAction.addEventListener("click", onDownload);

  playerXFile.addEventListener("change", onChangeAvatar);
  playerOFile.addEventListener("change", onChangeAvatar);

  playerXAvatarAction.addEventListener("click", () => {
    playerXFile.click();
  });
  playerOAvatarAction.addEventListener("click", () => {
    playerOFile.click();
  });

  cells.forEach((cell) => cell.addEventListener("click", onCell));
}

function onChangeAvatar(event) {
  const { files, id } = event.target;
  const file = files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const { result } = event.target;

    if (id === "player-x-file") {
      playerXAvatar.src = result;
      avatarX = result;

      updateBoardAvatars("x", result);
    } else {
      playerOAvatar.src = result;
      avatarO = result;

      updateBoardAvatars("o", result);
    }
  };

  reader.readAsDataURL(file);
}

function updateBoardAvatars(player, dataURL) {
  const avatars = document.querySelectorAll(`.player-${player}`);

  avatars.forEach((avatar) => (avatar.src = dataURL));
}

function onResetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });

  board.classList.remove("locked");

  playerXName.classList.add("animate-bounce");
  playerOName.classList.remove("animate-bounce");

  drawModal.classList.add("hidden");

  confettiAnimation.classList.remove("active");
  playerXTrophy.classList.remove("active");
  playerOTrophy.classList.remove("active");

  winline.className = "";

  resetGameAction.disabled = true;
  downloadAction.disabled = true;
}

function onResetScore() {
  localStorage.setItem("score-x", 0);
  localStorage.setItem("score-o", 0);

  syncScoreStatus();
}

function onCell(event) {
  const { id } = event.target;

  if (gameBoard[id] === "") {
    updateBoard(id);
  }

  resetGameAction.disabled = false;
}

function updateBoard(index) {
  gameBoard[index] = currentPlayer;

  cells[index].innerHTML = getPlayerAvatar();

  const gameStatus = checkGameStatus();

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (!gameStatus) {
    if (currentPlayer === "X") {
      playerOName.classList.remove("animate-bounce");
      playerXName.classList.add("animate-bounce");
    } else {
      playerXName.classList.remove("animate-bounce");
      playerOName.classList.add("animate-bounce");
    }
  }
}

function checkGameStatus() {
  let winClassName = null;

  for (let i = 0; i < WINNING_PROBABILITIES.length; i++) {
    const [a, b, c] = WINNING_PROBABILITIES[i];

    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      winClassName = `win-${a}${b}${c}`;
      break;
    }
  }

  if (winClassName !== null) {
    announceWinner(winClassName);
    return true;
  }

  if (!gameBoard.includes("")) {
    drawModal.classList.remove("hidden");
  }

  return false;
}

function announceWinner(winClassName) {
  confettiAnimation.classList.add("active");

  board.classList.add("locked");

  winline.classList.add("win");
  winline.classList.add(winClassName);

  playerXName.classList.remove("animate-bounce");
  playerOName.classList.remove("animate-bounce");

  if (currentPlayer === "X") {
    playerXTrophy.classList.add("active");
  } else {
    playerOTrophy.classList.add("active");
  }

  updateScore();
  fireConfetti();
  syncScoreStatus();

  downloadAction.disabled = false;

  cells.forEach((cell, index) => {
    if (!winClassName.includes(index)) {
      cell.classList.add("disabled");
    }
  });
}

function updateScore() {
  const key = `score-${currentPlayer.toLocaleLowerCase()}`;
  const score = Number(localStorage.getItem(key) || 0) + 1;

  localStorage.setItem(key, score);

  if (currentPlayer === "X") {
    playerXScore.textContent = score;
  } else {
    playerOScore.textContent = score;
  }
}

function syncScoreStatus() {
  const scoreX = Number(localStorage.getItem("score-x")) || 0;
  const scoreO = Number(localStorage.getItem("score-o")) || 0;

  playerXScore.textContent = scoreX;
  playerOScore.textContent = scoreO;

  resetScoreAction.disabled = !(scoreX > 0 || scoreO > 0);
}

function getPlayerAvatar() {
  let avatar = avatarO;

  if (currentPlayer === "X") {
    avatar = avatarX;
  }

  return `<img class="h-14 w-14 md:h-28 md:w-28 rounded-full object-cover player-${currentPlayer.toLocaleLowerCase()}" src="${avatar}" alt="${currentPlayer}" />`;
}

function onDownload() {
  const board = document.getElementById("canvas");

  html2canvas(board, {
    useCors: true,
    ignoreElements: function (element) {
      return element.classList.contains("ignore");
    },
  }).then(function (canvas) {
    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height + 120;
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    ctx.drawImage(canvas, 20, 20);

    const dataURL = newCanvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "Tic Tac Toe.png";
    link.href = dataURL;

    link.click();
  });
}

function fire(particleRatio, opts) {
  confetti(
    Object.assign(
      {},
      {
        disableForReduceMotion: true,
      },
      opts,
      {
        particleCount: Math.floor(200 * particleRatio),
      }
    )
  );
}

function confettiExplosion(origin) {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin,
  });

  fire(0.2, {
    spread: 60,
    origin,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    origin,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    origin,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    origin,
  });
}

function fireConfetti() {
  const rect =
    currentPlayer === "X"
      ? playerXAvatar.getBoundingClientRect()
      : playerOAvatar.getBoundingClientRect();

  const center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
  const origin = {
    x: center.x / window.innerWidth,
    y: center.y / window.innerHeight,
  };

  confettiExplosion(origin);
}

onMount();
