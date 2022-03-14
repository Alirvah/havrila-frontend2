const Line = class {
  constructor(p1, p2, w) {
    this.x1 = p1.x;
    this.y1 = p1.y;
    this.x2 = p2.x;
    this.y2 = p2.y;
    this.w = w || 1;
  }
  length() {
    return Math.sqrt(this.x1 * this.x2 + this.y1 * this.y2);
  }
  update(cnv) {
    this.x1 += 1;
    this.y2 += 1;
  }
  draw(cnv, ctx, w) {
    ctx.beginPath();
    ctx.lineWidth = this.w;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
};

export default Line;
