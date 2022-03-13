import Line from "./line";
import Point from "./point";
import rotateAround from "./rotateAround";
import Vector from "./vector";

const Circle = class {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.v = new Vector();
    this.a = new Vector();
    this.color = "white";
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
      const circleToMouseCoeficient = 1;
      this.x += dx / circleToMouseCoeficient;
      this.y += dy / circleToMouseCoeficient;
    }
  }
  draw(ctx, cnv) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2, true);
    ctx.fill();

    for (let i = 0; i < 360; i = i + 20) {
      const rayDistance = 100;
      //const dx = this.mx - this.x;
      //const dy = this.my - this.y;
      //const m = dy/dx
      //const lineEq =
      const rot = rotateAround(
        this.x,
        this.y,
        cnv.width / 2,
        cnv.height / 2,
        i
      );
      const p1 = new Point(this.x, this.y);
      const p2 = new Point(rot[0], rot[1]);
      const l = new Line(p1, p2);
      l.draw(ctx);
    }

    //let lines = [];
    //lines.push(new Line(new Point(100, 100), new Point(400, 400)));
    //lines.push(new Line(new Point(400, 100), new Point(500, 400)));
    ////lines.push(new Line(new Point(0, 0), new Point(cnv.width, 0)));
    ////lines.push(new Line(new Point(0, 0), new Point(0, cnv.height)));
    ////lines.push(
    ////  new Line(new Point(cnv.width, 0), new Point(cnv.width, cnv.height))
    ////);
    ////lines.push(
    ////  new Line(new Point(0, cnv.height), new Point(cnv.width, cnv.height))
    ////);
    //lines.forEach((l) => {
    //  l.draw(ctx);
    //  let ll = [];
    //  const dx = (l.x1 + l.x2) / 2;
    //  const dy = (l.y1 + l.y2) / 2;
    //  ll.push(new Line(new Point(this.x, this.y), new Point(dx, dy)));
    //  ll.push(new Line(new Point(this.x, this.y), new Point(l.x1, l.y1)));
    //  ll.push(new Line(new Point(this.x, this.y), new Point(l.x2, l.y2)));
    //  ll.forEach((lll) => lll.draw(ctx));
    //});
  }
};

export default Circle;
