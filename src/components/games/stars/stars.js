import Vector from "../lib/vector";

let cnv, ctx;
let fps = 30;
let stars = [];

const Star = class {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.init_x = x;
    this.init_y = y;
    this.prew_x = x;
    this.prew_y = y;
    this.s = s;
    this.init_s = s;
    this.v = new Vector(x - cnv.width / 2, y - cnv.height / 2);
    this.init_v = new Vector(x - cnv.width / 2, y - cnv.height / 2);
    this.a = new Vector();
  }
  isOffScreen() {
    return (
      this.x > cnv.width || this.x < 0 || this.y > cnv.height || this.y < 0
    );
  }
  update() {
    this.prew_x = this.x;
    this.prew_y = this.y;
    this.y += this.v.y / 50;
    this.x += this.v.x / 50;
    //this.s += this.s / 500;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.prew_x, this.prew_y);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
};

const setup = () => {
  stars = [];
  for (let i = 0; i < 800; i++) {
    stars.push(
      new Star(
        Math.random() * cnv.width,
        Math.random() * cnv.height,
        Math.random()
      )
    );
  }
};

const render = () => {
  stars.forEach((star) => {
    if (star.isOffScreen()) {
      star.x = star.init_x;
      star.y = star.init_y;
      star.s = star.init_s;
      star.v = star.init_v;
    }
    star.update();
    star.draw();
  });
};

const loop = (canvasName) => {
  cnv = document.getElementById(canvasName);
  ctx = cnv.getContext("2d");
  cnv.width = Math.floor(window.innerWidth / 1.3);
  cnv.height = Math.floor(window.innerHeight / 1.3);
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  setup();
  return setInterval(() => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    render(cnv, ctx);
  }, 1000 / fps);
};

export default loop;
