import Point from "./point";
import Line from "./line";

const Cube = class {
  constructor(x, y, z, s) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s;
    this.vertices = [
      new Point(x - s, y - s, z - s),
      new Point(x + s, y - s, z - s),
      new Point(x + s, y + s, z - s),
      new Point(x - s, y + s, z - s),
      new Point(x - s, y - s, z + s),
      new Point(x + s, y - s, z + s),
      new Point(x + s, y + s, z + s),
      new Point(x - s, y + s, z + s),
    ];
    this.edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // back face
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4], // front face
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7], // connecting sides
    ];
  }
  update(cnv) {
    // rotate the cube along the z axis
    const speedx = 0.5;
    const speedy = 0.7;
    const speedz = 1.2;
    const timeDelta = 2;
    let angle = timeDelta * 0.001 * speedz * Math.PI * 2;
    for (let v of this.vertices) {
      let dx = v.x - this.x;
      let dy = v.y - this.y;
      let x = dx * Math.cos(angle) - dy * Math.sin(angle);
      let y = dx * Math.sin(angle) + dy * Math.cos(angle);
      v.x = x + this.x;
      v.y = y + this.y;
    }

    // rotate the cube along the x axis
    angle = timeDelta * 0.001 * speedx * Math.PI * 2;
    for (let v of this.vertices) {
      let dy = v.y - this.y;
      let dz = v.z - this.z;
      let y = dy * Math.cos(angle) - dz * Math.sin(angle);
      let z = dy * Math.sin(angle) + dz * Math.cos(angle);
      v.y = y + this.y;
      v.z = z + this.z;
    }

    // rotate the cube along the y axis
    angle = timeDelta * 0.001 * speedy * Math.PI * 2;
    for (let v of this.vertices) {
      let dx = v.x - this.x;
      let dz = v.z - this.z;
      let x = dz * Math.sin(angle) + dx * Math.cos(angle);
      let z = dz * Math.cos(angle) - dx * Math.sin(angle);
      v.x = x + this.x;
      v.z = z + this.z;
    }
  }
  draw(ctx) {
    let lines = [];
    for (let edge of this.edges) {
      lines.push(new Line(this.vertices[edge[0]], this.vertices[edge[1]]));
    }
    lines.forEach((e) => e.draw(ctx));
  }
};

export default Cube;
