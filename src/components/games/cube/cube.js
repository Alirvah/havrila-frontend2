import Cube from "../lib/cube";

let cnv, ctx;
let fps = 30;

let cube;

const setup = () => {
  cube = [];
  cube.push(new Cube(cnv.width / 2, cnv.height / 2, 0, 50));
  const canvas = document.querySelector("canvas");
  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cube.push(new Cube(x, y, 0, 50));
  });
};

const render = () => {
  cube.forEach((e) => e.update(cnv));
  cube.forEach((e) => e.draw(cnv, ctx));
};

const cube3d = (canvasName) => {
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

export default cube3d;
