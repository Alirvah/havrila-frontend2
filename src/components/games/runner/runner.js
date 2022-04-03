import Point from "../lib/point";
import pointInsideRectangle from "../lib/pointInsideRectangle";
import Vector from "../lib/vector";

let cnv, ctx;
let fps = 60;
let G = 0.5;
let SPEED = 5;
let player;
let plattforms = [];
let backgrounds = [];
let img = new Image();
let deltaTime = 0;

const Backround = class {
  constructor(x, y, w, h) {
    this.pos = new Point(x, y);
    this.width = w;
    this.height = h;
  }
  update() {
    if (player.pos.x >= cnv.width / 3) {
      this.pos.x -= SPEED / 2;
    }
    if (this.pos.x + this.width < 0) {
      this.pos.x = cnv.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.stroke();
  }
};

const Platform = class {
  constructor(x, y, w, h) {
    this.pos = new Point(x, y);
    this.width = w;
    this.height = h;
  }
  update() {
    if (player.pos.x >= cnv.width / 3) {
      this.pos.x -= SPEED;
    }
    if (this.pos.x + this.width < 0) {
      this.pos.x = cnv.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "silver";
    ctx.fill();
    ctx.stroke();
  }
};

const Player = class {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.pos = new Point(x, y);
    this.vel = new Vector(SPEED, G);
    this.colliding = false;
    this.action = "running";
    this.frame = 0;
    this.live = true;
  }

  collision(platform) {
    return pointInsideRectangle(
      platform.pos.x,
      platform.pos.y - player.height,
      platform.pos.x + platform.width,
      platform.pos.y + platform.height,
      this.pos.x,
      this.pos.y
    );
  }
  update() {
    player.vel.y += G;
    this.pos.y += this.vel.y;

    if (this.pos.x < cnv.width / 3) {
      this.pos.x += this.vel.x;
    }

    if (this.pos.y > cnv.height) {
      this.live = false;
    }
  }
  draw() {
    if (this.action === "running") {
      if (deltaTime % 2 === 0) {
        this.frame += 1;
        if (this.frame > 7) {
          this.frame = 0;
        }
      }
      ctx.drawImage(
        img,
        this.frame * 50,
        203,
        50,
        38,
        this.pos.x,
        this.pos.y,
        50,
        38
      );
    }
    if (this.action === "jumping") {
      ctx.drawImage(img, 0, 405, 50, 38, this.pos.x, this.pos.y, 50, 38);
    }
  }
};

const setup = () => {
  player = new Player(300, 50, 50, 38);
  plattforms = [
    new Platform(0, cnv.height - 50, cnv.width / 2, 50),
    new Platform(cnv.width / 2 + 100, cnv.height - 50, cnv.width / 2, 50),
    new Platform(200, 300, 300, 20),
    new Platform(300, 500, 4000, 20),
  ];
  backgrounds = [
    new Backround(500, cnv.height / 2, 300, cnv.height),
    new Backround(cnv.width / 2, 200, 200, cnv.height),
    new Backround(800, 400, 400, cnv.height),
  ];
};

const render = () => {
  plattforms.forEach((platform) => {
    if (player.collision(platform)) {
      player.pos.y = platform.pos.y - player.height - 1;
      player.vel.y = 0;
      player.action = "running";
    }
  });

  if (!player.live) {
    setup();
  }

  backgrounds.forEach((p) => p.update());
  plattforms.forEach((p) => p.update());
  player.update();

  backgrounds.forEach((p) => p.draw());
  plattforms.forEach((p) => p.draw());
  player.draw();
};

const loop = (canvasName) => {
  cnv = document.getElementById(canvasName);
  ctx = cnv.getContext("2d");
  cnv.width = Math.floor(window.innerWidth / 1.3);
  cnv.height = Math.floor(window.innerHeight / 1.3);
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  img.onload = function () {
    //ctx.drawImage(img, 50, 50);
  };
  img.src =
    "https://www.nicepng.com/png/full/222-2222069_megaman-sprite-png-megaman-sprite-sheet-png.png";

  const canvas = document.querySelector("canvas");
  canvas.addEventListener("mousedown", (e) => {
    //const rect = canvas.getBoundingClientRect();
    //const x = e.clientX - rect.left;
    //const y = e.clientY - rect.top;
    player.vel.y -= 10;
    player.action = "jumping";
  });

  setup();
  return setInterval(() => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    render(cnv, ctx);
    deltaTime += 1;
  }, 1000 / fps);
};

export default loop;
