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
let explosions = [];
let stars = [];
let megamanImg = new Image();
let explosionImg = new Image();
megamanImg.src =
  "https://zappa-havrila-net.s3.eu-central-1.amazonaws.com/7a89e9ff-59e8-404d-9228-be5b3eabf85f.png";

explosionImg.src =
  "https://zappa-havrila-net.s3.eu-central-1.amazonaws.com/cde7bbb8-5909-461b-bed0-1579c889fa3a.png";

let deltaTime = 0;

const Star = class {
  constructor(x, y, s) {
    this.pos = new Point(x, y);
    this.s = s;
  }
  update() {
    if (player.pos.x >= cnv.width / 5) {
      this.pos.x -= SPEED / 30;
    }
    if (this.pos.x < 0) {
      this.pos.x = cnv.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.s, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
  }
};

const Explosion = class {
  constructor(x, y, size, background, a) {
    this.pos = new Point(x, y);
    this.frame = 0;
    this.row = 0;
    this.size = size || Math.random() * 100 + 50;
    this.background = background || Math.round(Math.random() * 5 + 1);
    this.animation = a || Math.round(Math.random() * 5 + 2);
  }
  update() {
    if (player.pos.x >= cnv.width / 5) {
      this.pos.x -= SPEED / this.background;
    }
    if (this.pos.x + this.size < 0) {
      this.pos.x = cnv.width + Math.random() * cnv.width;
    }
  }
  draw() {
    ctx.drawImage(
      explosionImg,
      this.frame * 256,
      this.row * 256,
      256,
      256,
      this.pos.x,
      this.pos.y,
      this.size,
      this.size
    );
    if (deltaTime % this.animation === 0) {
      this.frame += 1;
      if (this.frame % 7 === 0) {
        this.frame = 0;
        this.row += 1;
        if (this.row > 5) {
          this.row = 0;
        }
      }
    }
  }
};

const Backround = class {
  constructor(x, y, w, h) {
    this.pos = new Point(x, y);
    this.width = w;
    this.height = h;
  }
  update() {
    if (player.pos.x >= cnv.width / 5) {
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
    if (player.pos.x >= cnv.width / 5) {
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
      platform.pos.y - this.height,
      platform.pos.x + platform.width,
      platform.pos.y + platform.height,
      this.pos.x,
      this.pos.y
    );
  }
  collisionExplosion(explosion) {
    return pointInsideRectangle(
      explosion.pos.x,
      explosion.pos.y - this.height,
      explosion.pos.x + explosion.size,
      explosion.pos.y + explosion.size,
      this.pos.x,
      this.pos.y
    );
  }
  update() {
    player.vel.y += G;
    this.pos.y += this.vel.y;

    if (this.pos.x < cnv.width / 4) {
      this.pos.x += this.vel.x;
    }

    if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.vel.y = 0;
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
        megamanImg,
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
      ctx.drawImage(megamanImg, 0, 405, 50, 38, this.pos.x, this.pos.y, 50, 38);

      ctx.drawImage(
        explosionImg,
        this.frame * 256,
        1 * 256,
        256,
        256,
        this.pos.x,
        this.pos.y,
        20,
        20
      );
    }
  }
};

const setup = () => {
  player = new Player(50, 50, 50, 38);
  plattforms = [
    //  new Platform(0, cnv.height - 50, cnv.width / 2, 50),
    //  new Platform(cnv.width / 2 + 20, cnv.height - 50, cnv.width / 2, 50),
    //  new Platform(100, 158, 300, 20),
    //  new Platform(100, cnv.height / 2 + 100, 4000, 20),
  ];
  for (let i = 0; i < 2; i++) {
    plattforms.push(
      new Platform(
        Math.random() * cnv.width,
        Math.random() * (cnv.height / 2) + cnv.height / 2,
        Math.random() * 1000 + 100,
        20
      )
    );
  }

  backgrounds = [
    new Backround(500, cnv.height / 2, 300, cnv.height),
    new Backround(cnv.width / 2, 200, 200, cnv.height),
    new Backround(800, 300, 400, cnv.height),
  ];
  explosions = [];
  for (let i = 0; i < 3; i++) {
    explosions.push(
      new Explosion(
        Math.random() * (cnv.width / 2) + cnv.width / 2,
        Math.random() * (cnv.height / 2) - 50
      )
    );
  }
  stars = [];
  for (let i = 0; i < 200; i++) {
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
  plattforms.forEach((platform) => {
    if (player.collision(platform)) {
      if (platform.pos.y > player.pos.y) {
        player.pos.y = platform.pos.y - player.height - 1;
      } else {
        player.pos.y += platform.height / 2;
      }
      player.vel.y = 0;
      player.action = "running";
    }
  });

  explosions.forEach((explosion) => {
    if (player.collisionExplosion(explosion)) {
      if (explosion.row > 1 && explosion.row < 4) {
        player.live = false;
      }
    }
  });

  if (!player.live) {
    setup();
  }

  stars.forEach((p) => p.update());
  backgrounds.forEach((p) => p.update());
  plattforms.forEach((p) => p.update());
  explosions.forEach((e) => e.update());
  player.update();

  stars.forEach((p) => p.draw());
  backgrounds.forEach((p) => p.draw());
  plattforms.forEach((p) => p.draw());
  explosions.forEach((e) => e.draw());
  player.draw();
};

const loop = (canvasName) => {
  cnv = document.getElementById(canvasName);
  ctx = cnv.getContext("2d");
  cnv.width = Math.floor(window.innerWidth / 1.3);
  cnv.height = Math.floor(window.innerHeight / 1.3);
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  const canvas = document.querySelector("canvas");
  canvas.addEventListener("mousedown", (e) => {
    //const rect = canvas.getBoundingClientRect();
    //const x = e.clientX - rect.left;
    //const y = e.clientY - rect.top;
    if (player.action !== "jumping") {
      player.pos.y -= 1;
    }
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
