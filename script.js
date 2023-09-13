const canvas = document.getElementById("canvas");
const controls = document.getElementById("controls");
const brushSizeText = document.getElementById("brush-size");
const colorPicker = document.getElementById("color-picker");
const canvasContext = canvas.getContext("2d");

function resizeCanvas() {
  const container = document.getElementById("container");
  canvas.width = container.getBoundingClientRect().width;
  canvas.height = container.getBoundingClientRect().height - 88;
}

function drawLine({ fromX, fromY, toX, toY }) {
  canvasContext.beginPath();
  canvasContext.moveTo(fromX, fromY);
  canvasContext.lineTo(toX, toY);
  canvasContext.strokeStyle = colorPicker.value;
  canvasContext.lineCap = "round";
  canvasContext.lineWidth = brushSize;
  canvasContext.stroke();
}

function setMousePosition({ x, y }) {
  coords.x = x;
  coords.y = y;
}

let brushSize = 5;
let isDrawing = false;
const coords = { x: 0, y: 0 };

controls.addEventListener("click", function ({ target }) {
  const { control } = target.dataset;

  if (control === "decrease-width") {
    brushSize = brushSize === 1 ? brushSize : brushSize - 1;
    brushSizeText.textContent = brushSize;
  }

  if (control === "increase-width") {
    brushSize = brushSize === 50 ? brushSize : brushSize + 1;
    brushSizeText.textContent = brushSize;
  }

  if (control === "clear") canvasContext.reset();
});

canvas.addEventListener("mousedown", function ({ offsetX, offsetY }) {
  isDrawing = true;
  setMousePosition({ x: offsetX, y: offsetY });
});

canvas.addEventListener("mouseup", function () {
  isDrawing = false;
});

canvas.addEventListener("mousemove", function ({ offsetX, offsetY }) {
  if (!isDrawing) return;

  drawLine({
    fromX: coords.x,
    fromY: coords.y,
    toX: offsetX,
    toY: offsetY,
  });

  setMousePosition({ x: offsetX, y: offsetY });
});

resizeCanvas();
brushSizeText.textContent = brushSize;
window.addEventListener("resize", resizeCanvas);
