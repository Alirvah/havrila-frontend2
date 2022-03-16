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
  rotate(origin, angle) {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
    const ny = cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
    return new Point(nx, ny);
  }
};

export default Point;
