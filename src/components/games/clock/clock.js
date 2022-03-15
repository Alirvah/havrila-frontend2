import rotateAround from "../lib/rotateAround";

let cnv, ctx;
let fps = 60;
let c;

const Clock = class {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.angle = -6;
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.milis = 0;
    this.day = 0;
  }
  update() {
    //const time = new Date(2018, 11, 24, 11, 0, 0, 0);
    const time = new Date();
    this.milis = time.getMilliseconds();
    this.sec = time.getSeconds();
    this.min = time.getMinutes();
    this.hour = time.getHours() % 12 || 12;
    this.day = time.getDate();
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s + 22, 0, Math.PI * 2, true);
    ctx.lineWidth = 13;
    ctx.strokeStyle = "#003300";
    ctx.stroke();

    let rot;
    for (let i = 0; i < 360; i = i + 6) {
      rot = rotateAround(this.x, this.y, this.x, this.y - this.s, i);
      ctx.beginPath();
      let pointSize = 1;
      if (i % 30 == 0) {
        pointSize = 5;
      }
      ctx.arc(rot[0], rot[1], pointSize, 0, Math.PI * 2, true);
      ctx.fill();
      if (i == 0) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x - 23,
          this.y - this.s + 50,
          i
        );
        ctx.font = "40px Arial";
        ctx.fillText("12", rot[0], rot[1]);
      }
      if (i == i * 90) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x + 13,
          this.y - this.s + 40,
          i - 90
        );
        ctx.font = "40px Arial";
        ctx.fillText("3", rot[0], rot[1]);
      }
      if (i == i * 2 * 90) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x + 12,
          this.y - this.s + 20,
          i - 2 * 90
        );
        ctx.font = "40px Arial";
        ctx.fillText("6", rot[0], rot[1]);
      }
      if (i == i * 270) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x - 13,
          this.y - this.s + 20,
          i - 270
        );
        ctx.font = "40px Arial";
        ctx.fillText("9", rot[0], rot[1]);
      }
    }

    ctx.lineCap = "round";

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 1.7,
      this.angle * this.hour * 5 + (5 * this.min * this.angle) / 60
    );
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot[0], rot[1]);
    ctx.strokeStyle = "white";
    ctx.stroke();

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 15,
      this.angle * this.hour * 5 + (5 * this.min * this.angle) / 60 + 180
    );
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot[0], rot[1]);
    ctx.strokeStyle = "white";
    ctx.stroke();

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 1.1,
      this.angle * this.min + (this.sec * this.angle) / 60
    );
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot[0], rot[1]);
    ctx.strokeStyle = "white";
    ctx.stroke();

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 15,
      this.angle * this.min + (this.sec * this.angle) / 60 + 180
    );
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot[0], rot[1]);
    ctx.strokeStyle = "white";
    ctx.stroke();

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 1.1,
      this.angle * this.sec + (this.milis * this.angle) / 999
    );
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot[0], rot[1]);
    ctx.strokeStyle = "red";
    ctx.stroke();
    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 7,
      this.angle * this.sec + (this.milis * this.angle) / 999 + 180
    );
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot[0], rot[1]);
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
    ctx.fill();
  }
};

const setup = () => {
  const min = Math.min(cnv.width, cnv.height);
  c = new Clock(cnv.width / 2, cnv.height / 2, min / 3);
};
const render = () => {
  c.update();
  c.draw();
};

const clockLoop = (canvasName) => {
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

export default clockLoop;
