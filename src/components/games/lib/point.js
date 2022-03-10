const Point = class {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  add(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
  }
};

export default Point;
