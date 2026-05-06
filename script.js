const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

const input = document.getElementById("optionInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("optionList");

let options = ["A", "B", "C", "D", "E", "F"];
let currentRotation = 0;
let isSpinning = false;

// 🎨 วาดวงล้อ
function drawWheel() {
  const arc = (2 * Math.PI) / options.length;

  ctx.clearRect(0, 0, 400, 400);

  options.forEach((option, i) => {
    const angle = i * arc;

    // สี
    ctx.fillStyle = `hsl(${i * 360 / options.length}, 70%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc);
    ctx.fill();

    // text
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = "white";
    ctx.font = "16px sans-serif";
    ctx.fillText(option, 120, 10);
    ctx.restore();
  });
}

// ➕ เพิ่ม option
addBtn.onclick = () => {
  const value = input.value.trim();
  if (!value) return;

  options.push(value);
  input.value = "";
  updateList();
  drawWheel();
};

// 📋 update list
function updateList() {
  list.innerHTML = "";
  options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;

    li.onclick = () => {
      options.splice(i, 1);
      updateList();
      drawWheel();
    };

    list.appendChild(li);
  });
}

// 🎡 spin
spinBtn.onclick = () => {
  if (isSpinning || options.length < 2) return;

  isSpinning = true;
  spinBtn.disabled = true;
  resultDiv.textContent = "Spinning...";

  const slice = 360 / options.length;

  // สุ่มผู้ชนะ (pro technique)
  const winnerIndex = Math.floor(Math.random() * options.length);

  const targetAngle =
    360 - (winnerIndex * slice) - (slice / 2);

  const spin = 360 * 6 + targetAngle;

  currentRotation += spin;

  canvas.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    resultDiv.textContent = `🎉 Result: ${options[winnerIndex]}`;
    spinBtn.disabled = false;
    isSpinning = false;
  }, 4000);
};

// init
updateList();
drawWheel();
