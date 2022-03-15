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
    this.smooth = false;
  }
  update() {
    //this.milis += 999 / 60;
    //if (this.milis % this.milis === 0) this.sec += 1;
    //const time = new Date(
    //  2018,
    //  11,
    //  24,
    //  this.hour,
    //  this.min,
    //  this.sec,
    //  this.milis
    //);
    //const time = new Date(2018, 11, 24, 11, 59, 59, 0);
    const time = new Date();
    this.milis = this.smooth ? time.getMilliseconds() : 0;
    this.sec = time.getSeconds();
    this.min = time.getMinutes();
    this.hour = time.getHours() % 12 || 12;
    this.day = time.getDate();
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s + this.s / 9, 0, Math.PI * 2, true);
    ctx.lineWidth = this.s / 13;
    ctx.strokeStyle = "#1b5e20";
    ctx.stroke();

    let rot;
    for (let i = 0; i < 360; i = i + 6) {
      rot = rotateAround(this.x, this.y, this.x, this.y - this.s, i);
      ctx.beginPath();
      let pointSize = this.s / 100;
      if (i % 30 === 0) {
        pointSize = this.s / 40;
      }
      ctx.arc(rot.x, rot.y, pointSize, 0, Math.PI * 2, true);
      ctx.fill();
      if (i === 0) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x - 23,
          this.y - this.s + 50,
          i
        );
        ctx.font = "40px Arial";
        ctx.fillText("12", rot.x, rot.y);
      }
      if (i === i * 90) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x + 13,
          this.y - this.s + 40,
          i - 90
        );
        ctx.font = "40px Arial";
        ctx.fillText("3", rot.x, rot.y);
      }
      if (i === i * 2 * 90) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x + 12,
          this.y - this.s + 20,
          i - 2 * 90
        );
        ctx.font = "40px Arial";
        ctx.fillText("6", rot.x, rot.y);
      }
      if (i === i * 270) {
        rot = rotateAround(
          this.x,
          this.y,
          this.x - 13,
          this.y - this.s + 20,
          i - 270
        );
        ctx.font = "40px Arial";
        ctx.fillText("9", rot.x, rot.y);
      }
    }

    ctx.lineCap = "round";

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 1.7,
      this.smooth
        ? this.angle * this.hour * 5 +
            5 * ((this.min * this.angle) / 60) +
            (this.sec * this.angle) / 60 / 12
        : this.angle * this.hour * 5 + 5 * ((this.min * this.angle) / 60)
    );
    ctx.beginPath();
    ctx.lineWidth = this.s / 18;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot.x, rot.y);
    ctx.strokeStyle = "white";
    ctx.stroke();

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 15,
      this.smooth
        ? this.angle * this.hour * 5 +
            5 * ((this.min * this.angle) / 60 + 180) +
            (this.sec * this.angle) / 60 / 12
        : this.angle * this.hour * 5 + 5 * ((this.min * this.angle) / 60 + 180)
    );
    ctx.beginPath();
    ctx.lineWidth = this.s / 18;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot.x, rot.y);
    ctx.strokeStyle = "white";
    ctx.stroke();

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 1.1,
      this.smooth
        ? this.angle * this.min + (this.sec * this.angle) / 60
        : this.angle * this.min
    );
    ctx.beginPath();
    ctx.lineWidth = this.s / 45;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot.x, rot.y);
    ctx.strokeStyle = "white";
    ctx.stroke();

    rot = rotateAround(
      this.x,
      this.y,
      this.x,
      this.y - this.s / 15,
      this.smooth
        ? this.angle * this.min + (this.sec * this.angle) / 60 + 180
        : this.angle * this.min + 180
    );
    ctx.beginPath();
    ctx.lineWidth = this.s / 45;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot.x, rot.y);
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
    ctx.lineWidth = this.s / 100;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot.x, rot.y);
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
    ctx.lineTo(rot.x, rot.y);
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s / 30, 0, Math.PI * 2, true);
    ctx.fill();
  }
};

const setup = () => {
  const min = Math.min(cnv.width, cnv.height);
  c = new Clock(cnv.width / 2, cnv.height / 2, min / 3);
  const canvas = document.querySelector("canvas");
  canvas.addEventListener("mousedown", (e) => {
    c.smooth = !c.smooth;
  });
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
