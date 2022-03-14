const Wall = class {
  constructor(line) {
    this.line = line;
    this.x1 = line.x1;
    this.y1 = line.y1;
    this.x2 = line.x2;
    this.y2 = line.y2;
  }
  draw(c, x) {
    this.line.draw(c, x);
  }
};

export default Wall;
