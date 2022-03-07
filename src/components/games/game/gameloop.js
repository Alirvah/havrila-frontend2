let fps = 30;
let cnv, ctx;

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
        if (this.areCirclesIntersecting(ball)) {
          this.yvel = -this.yvel;
          this.xvel = -this.xvel;
        }
      }
    });
  }

  areCirclesIntersecting(c) {
    const dx = this.x - c.x;
    const dy = this.y - c.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (this.size + c.size >= dist) {
      return true;
    }
    return false;
  }
};

let sun = new Ball(20, 100, 30, "yellow");
let balls = [];

const collors = ["yellow", "blue", "red", "green", "white", "orange"];

const gameloop = () => {
  cnv = document.getElementById("myCanvas");
  ctx = cnv.getContext("2d");
  cnv.width = window.innerWidth / 1.3;
  cnv.height = window.innerHeight / 1.3;
  setup();
  setInterval(() => {
    update();
    render();
  }, 1000 / fps);
};

const setup = () => {
  for (let i = 0; i < 50; i++) {
    balls.push(
      new Ball(
        Math.random() * cnv.width,
        Math.random() * cnv.height,
        Math.random() * 10 + 1,
        collors[Math.floor(Math.random() * collors.length)],
        Math.random() * 4,
        Math.random() * 4
      )
    );
  }
};

const update = () => {
  sun.update(cnv, balls);
  balls.forEach((ball) => ball.update(cnv, balls));
};

const render = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  sun.draw(ctx);
  balls.forEach((ball) => ball.draw(ctx));
};

export default gameloop;
