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
    // time = new Date(2018, 11, 24, 11, 59, 59, 0);
    const time = new Date();
    this.milis = this.smooth ? time.getMilliseconds() : 0;
    this.sec = time.getSeconds();
    this.min = time.getMinutes();
    this.hour = time.getHours() % 12 || 12;
    this.day = time.getDate();
  }

  hand(type, len, width, color, angle, over) {
    let handAngle;
    if (type === "hour") {
      handAngle = this.smooth
        ? this.angle * this.hour * 5 +
          5 * ((this.min * this.angle) / 60 + angle) +
          (this.sec * this.angle) / 60 / 12
        : this.angle * this.hour * 5 +
          5 * ((this.min * this.angle) / 60 + angle);
    }
    if (type === "minute") {
      handAngle = this.smooth
        ? this.angle * this.min + (this.sec * this.angle) / 60 + angle
        : this.angle * this.min + angle;
    }
    if (type === "second") {
      handAngle =
        this.angle * this.sec + (this.milis * this.angle) / 999 + angle;
    }
    const roy = this.y - this.s / len;
    const rot = rotateAround(this.x, this.y, this.x, roy, handAngle);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.lineWidth = this.s / width;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(rot.x, rot.y);
    ctx.strokeStyle = color;
    ctx.stroke();

    if (over) this.hand(type, len / 0.15, width, color, 180, false);
  }

  draw() {
    //border
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s + this.s / 9, 0, Math.PI * 2, true);
    ctx.lineWidth = this.s / 13;
    ctx.strokeStyle = "#1b5e20";
    ctx.stroke();

    for (let i = 0; i < 360; i = i + 6) {
      //points
      const rot = rotateAround(this.x, this.y, this.x, this.y - this.s, i);
      ctx.beginPath();
      let pointSize = this.s / 100;
      if (i % 30 === 0) {
        pointSize = this.s / 40;
      }
      ctx.arc(rot.x, rot.y, pointSize, 0, Math.PI * 2, true);
      ctx.fillStyle = "white";
      ctx.fill();

      // numbers
      if (i % 30 === 0) {
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        const fontSize1 = this.s / 7;
        const k = i / 30;
        const roy1 = this.y - this.s + fontSize1 / 1.05;
        const rot1 = rotateAround(this.x, this.y, this.x, roy1, i);
        ctx.font = fontSize1 + "px Arial";
        ctx.fillStyle = "white";
        ctx.fillText((12 - k).toString(), rot1.x, rot1.y);

        const fontSize2 = this.s / 10;
        const roy2 = this.y - this.s + fontSize2 / 0.3;
        const rot2 = rotateAround(this.x, this.y, this.x, roy2, i);
        ctx.font = fontSize2 + "px Arial";
        ctx.fillStyle = "#1b5e20";
        ctx.fillText((24 - k).toString(), rot2.x, rot2.y);
      }
    }

    //hands
    this.hand("hour", 1.8, 20, "white", 0, false);
    this.hand("minute", 1.3, 45, "white", 0, false);
    this.hand("second", 1.1, 100, "red", 0, true);

    //middle dot
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
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (mouseX && mouseY) {
      c.smooth = !c.smooth;
    }
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
