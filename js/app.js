const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 500, 500);

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const offSetX = event.offsetX;
  const offSetY = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(offSetX, offSetY);
  } else {
    ctx.lineTo(offSetX, offSetY);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  startPainting();
}

function onMouseUp(event) {
  stopPainting();
}

function onMouseLeave(event) {
  stopPainting();
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const range = event.target.value;
  ctx.lineWidth = range;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, 500, 500);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "CanvasJS";
  link.click();
}

function init() {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
  }

  Array.from(color).forEach((color) =>
    color.addEventListener("click", handleColor)
  );

  if (range) {
    range.addEventListener("input", handleRangeChange);
  }

  if (mode) {
    mode.addEventListener("click", handleModeClick);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }
}

init();
