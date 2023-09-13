const canvas = document.getElementById("canvas");
const controls = document.getElementById("controls");
const brushSizeText = document.getElementById("brush-size");
const colorPicker = document.getElementById("color-picker");
const canvasContext = canvas.getContext("2d");

const controlsHeight = controls.getBoundingClientRect().height;

function resizeCanvas() {
  const container = document.getElementById("container");
  canvas.width = container.getBoundingClientRect().width;
  canvas.height = container.getBoundingClientRect().height - controlsHeight;
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

function drawOnCanvas({ fromX, fromY, toX, toY }) {
  drawLine({
    fromX,
    fromY,
    toX,
    toY,
  });

  setMousePosition({
    x: toX,
    y: toY,
  });
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

  drawOnCanvas({
    fromX: coords.x,
    fromY: coords.y,
    toX: offsetX,
    toY: offsetY,
  });
});

canvas.addEventListener(
  "touchmove",
  function ({ touches }) {
    const { clientX, clientY } = touches[0];

    drawOnCanvas({
      fromX: coords.x,
      fromY: coords.y,
      toX: clientX - controlsHeight / 4,
      toY: clientY - controlsHeight,
    });
  },
  { passive: true }
);

canvas.addEventListener(
  "touchstart",
  function ({ touches }) {
    isDrawing = true;
    const { clientX, clientY } = touches[0];
    setMousePosition({
      x: clientX - controlsHeight / 4,
      y: clientY - controlsHeight,
    });
  },
  { passive: true }
);

canvas.addEventListener(
  "touchend",
  function () {
    isDrawing = false;
  },
  { passive: true }
);

resizeCanvas();
brushSizeText.textContent = brushSize;
window.addEventListener("resize", resizeCanvas);
