import Line from "./line";
import Point from "./point";
import rotateAround from "./rotateAround";

const Ray = class {
  constructor(x, y, a, s) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.ar = (Math.PI / 180) * a;
    this.s = s;
    this.rot = rotateAround(this.x, this.y, this.x + this.s, this.y, this.a);
    this.mx = x + s;
    this.my = y + s;
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
  update(cnv, ctx) {
    this.rot = rotateAround(this.x, this.y, this.x + this.s, this.y, this.a);
  }
  hittingWall(wall) {
    const x1 = wall.x1;
    const y1 = wall.y1;
    const x2 = wall.x2;
    const y2 = wall.y2;
    const x3 = this.x;
    const y3 = this.y;
    const x4 = this.rot.x;
    const y4 = this.rot.y;
    const t_numerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const t_denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const t = t_numerator / t_denominator;
    const u_numerator = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);
    const u_denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const u = u_numerator / u_denominator;
    if (0 <= t && t <= 1 && u > 0) {
      return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
    } else {
      return [];
    }
  }
  draw(cnv, ctx, xi, yi) {
    const p1 = new Point(this.x, this.y);
    //const p2 = new Point(this.rot.x, this.rot.y);
    //const p2 = new Point(this.mx, this.my);
    const p2 = new Point(xi, yi);
    const l = new Line(p1, p2);
    l.draw(cnv, ctx);
  }
};

export default Ray;
