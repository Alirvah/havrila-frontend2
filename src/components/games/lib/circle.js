import Ray from "./ray";
import Line from "./line";
import Point from "./point";
import rotateAround from "./rotateAround";
import Vector from "./vector";
import Wall from "./wall";

const Circle = class {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.v = new Vector();
    this.a = new Vector();
    this.color = "red";
    this.onMouse = false;
    this.mx = x;
    this.my = y;
  }
  addMouse(type) {
    this.onMouse = true;
    const canvas = document.querySelector("canvas");
    canvas.addEventListener(type, (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mx = e.clientX - rect.left;
      this.my = e.clientY - rect.top;
    });
  }
  update() {
    if (this.onMouse) {
      const dx = this.mx - this.x;
      const dy = this.my - this.y;
      const circleToMouseCoeficient = 10;
      this.x += dx / circleToMouseCoeficient;
      this.y += dy / circleToMouseCoeficient;
    }
  }
  draw(cnv, ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2, true);
    ctx.fill();

    //const rot = rotateAround(this.x, this.y, this.x + 10, this.y, 0);
    //const r = new Ray(this.x, this.y, 10, 10);
    //r.draw(cnv, ctx);
  }
};

export default Circle;
