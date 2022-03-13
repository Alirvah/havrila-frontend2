import Circle from "../lib/circle";

let cnv, ctx;
let fps = 30;

let c;

const setup = () => {
  c = new Circle(100, 100, 10);
  c.addMouse("mousemove");
};

const render = () => {
  c.update();
  c.draw(ctx, cnv);
};

const rays = (canvasName) => {
  cnv = document.getElementById(canvasName);
  ctx = cnv.getContext("2d");
  cnv.width = Math.floor(window.innerWidth / 1.3);
  cnv.height = Math.floor(window.innerHeight / 1.3);
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  setup();
  return setInterval(() => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    render();
  }, 1000 / fps);
};

export default rays;
