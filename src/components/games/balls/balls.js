let loop;
let fps = 30;
let cnv, ctx;
let numberOfBalls = 100;
let balls = [];

const collors = [
  "yellow",
  "blue",
  "red",
  "green",
  "white",
  "orange",
  "brown",
  "cyan",
  "navy",
];

const Ball = class {
  constructor(x, y, size, color, xv, yv) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.xvel = xv;
    this.yvel = yv;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.fill();
  }
  update(cnv, otherballs) {
    this.x += this.xvel;
    this.y += this.yvel;
    this.checkForCollisions(cnv, otherballs);
  }
  checkForCollisions(cnv, otherballs) {
    if (this.x + this.size / 2 > cnv.width || this.x - this.size / 2 < 0) {
      this.xvel = -this.xvel;
    }
    if (this.y + this.size / 2 > cnv.height || this.y - this.size / 2 < 0) {
      this.yvel = -this.yvel;
    }
    otherballs.forEach((ball) => {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (this.size + ball.size >= dist) {
          this.yvel = -this.yvel;
          this.xvel = -this.xvel;
        }
      }
    });
  }
};

const ballgame = () => {
  cnv = document.getElementById("ballsCanvas");
  ctx = cnv.getContext("2d");
  cnv.width = window.innerWidth / 1.3;
  cnv.height = window.innerHeight / 1.3;
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  setup();
  loop = setInterval(() => {
    update();
    render();
  }, 1000 / fps);
  return loop;
};

const setup = () => {
  balls = [];
  for (let i = 0; i < numberOfBalls; i++) {
    balls.push(
      new Ball(
        Math.random() * cnv.width,
        Math.random() * cnv.height,
        Math.random() * 10 + 1,
        collors[Math.floor(Math.random() * collors.length)],
        Math.random() * 6 + 1,
        Math.random() * 6 + 1
      )
    );
  }
};

const update = () => {
  balls.forEach((ball) => ball.update(cnv, balls));
};

const render = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  balls.forEach((ball) => ball.draw(ctx));
};

export default ballgame;
