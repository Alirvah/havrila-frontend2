import Vector from "../lib/vector";

let fps = 30;
let cnv, ctx;
let numberOfBalls = 50;
let balls = [];
let b;

const collors = [
  "yellow",
  "blue",
  "red",
  "green",
  "orange",
  "brown",
  "cyan",
  "navy",
];

const Ball = class {
  constructor(x, y, size, color, v) {
    const G = 1;
    //this.lossCoeficient = 0.5;
    this.lossCoeficient = 0.1;
    this.x = x;
    this.y = y;
    this.size = size;
    this.m = size;
    this.color = color;
    this.v = v || new Vector();
    //this.a = new Vector(0, G);
    this.a = new Vector();
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.fill();
  }
  update(cnv, balls) {
    this.checkForCollisions(cnv, balls);
    if (this.color !== "white") {
      this.v.x += this.a.x;
      this.v.y += this.a.y;

      this.x += this.v.x;
      this.y += this.v.y;
    }
  }
  checkForCollisions(cnv, balls) {
    const xsubs = this.x - this.size;
    const ysubs = this.y - this.size;
    if (this.x + this.size > cnv.width || xsubs < 0) {
      //moemntum loss
      this.v.x = this.v.x - this.lossCoeficient * this.v.x;
      this.v.y = this.v.y - this.lossCoeficient * this.v.y;

      this.v.x = -this.v.x;
      this.x = xsubs < 0 ? this.size : cnv.width - this.size;
    }
    if (this.y + this.size > cnv.height || ysubs < 0) {
      //moemntum loss
      this.v.x = this.v.x - this.lossCoeficient * this.v.x;
      this.v.y = this.v.y - this.lossCoeficient * this.v.y;

      this.v.y = -this.v.y;
      this.y = ysubs < 0 ? this.size : cnv.height - this.size;
    }
    balls.forEach((other) => {
      if (this !== other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const collision = this.size + other.size > dist;
        if (collision) {
          let angle = Math.atan2(dy, dx);
          let sin = Math.sin(angle);
          let cos = Math.cos(angle);

          const distCorrection = this.size + other.size - dist;
          other.x += cos * distCorrection;
          other.y += sin * distCorrection;

          //lossMomentum
          this.v.x = this.v.x - this.lossCoeficient * this.v.x;
          this.v.y = this.v.y - this.lossCoeficient * this.v.y;

          // circle1 perpendicular velocities
          let perpendicular_vx1 = this.v.x * cos + this.v.y * sin;
          let perpendicular_vy1 = this.v.y * cos - this.v.x * sin;

          // circle2 perpendicular velocities
          let perpendicular_vx2 = other.v.x * cos + other.v.y * sin;
          let perpendicular_vy2 = other.v.y * cos - other.v.x * sin;

          // swapping the x velocity
          // and rotating back the adjusted perpendicular velocities
          this.v.x = perpendicular_vx2 * cos - perpendicular_vy1 * sin;
          this.v.y = perpendicular_vy1 * cos + perpendicular_vx2 * sin;
          other.v.x = perpendicular_vx1 * cos - perpendicular_vy2 * sin;
          other.v.y = perpendicular_vy2 * cos + perpendicular_vx1 * sin;
        }
      }
    });
  }
};

const setup = () => {
  balls = [];
  //balls.push(new Ball(400, 401, 10, "blue", new Vector(-6, 0)));
  for (let i = 0; i < numberOfBalls; i++) {
    balls.push(
      new Ball(
        Math.random() * cnv.width,
        Math.random() * cnv.height,
        //Math.random() * 10 + 2,
        10,
        collors[Math.floor(Math.random() * collors.length)],
        new Vector(
          Math.random() * 4 + 1 * Math.round(Math.random()) * 2 - 1,
          Math.random() * 4 + 1 * Math.round(Math.random()) * 2 - 1
        )
      )
    );
  }
};

const render = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  balls.forEach((ball) => ball.update(cnv, balls));
  balls.forEach((ball) => ball.draw(ctx));
  b.update(cnv, balls);
  b.draw(ctx);
};

const ballgame = (canvasName) => {
  cnv = document.getElementById(canvasName);
  ctx = cnv.getContext("2d");
  cnv.width = Math.floor(window.innerWidth / 1.3);
  cnv.height = Math.floor(window.innerHeight / 1.3);

  //function getCursorPosition(canvas, event) {
  //  const rect = canvas.getBoundingClientRect();
  //  const x = event.clientX - rect.left;
  //  const y = event.clientY - rect.top;
  //  console.log("x: " + x + " y: " + y);
  //}
  const canvas = document.querySelector("canvas");
  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log("clicked x: " + x + " clicked y: " + y);
  });
  b = new Ball(400, 401, 20, "white");
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    b.x = x;
    b.y = y;
  });
  //canvas.addEventListener("mouseover", function (e) {
  //  getCursorPosition(canvas, e);
  //});

  ctx.clearRect(0, 0, cnv.width, cnv.height);
  setup();
  return setInterval(() => {
    render();
  }, 1000 / fps);
};

export default ballgame;
