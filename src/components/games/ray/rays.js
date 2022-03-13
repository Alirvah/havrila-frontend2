import Line from "../lib/line";
import Point from "../lib/point";
import Wall from "../lib/wall";
import Ray from "../lib/ray";
import Circle from "../lib/circle";

let cnv, ctx;
let fps = 30;

let c;
let r;
let rays = [];
let walls = [];

const setup = () => {
  c = new Circle(100, 100, 5);
  c.addMouse("mousemove");
  for (let i = 0; i < 360; i = i + 6) {
    rays.push(new Ray(100, 100, i, 20));
  }
  //r.addMouse("mousemove");
  for (let i = 0; i < 5; i++) {
    const min = 50;
    const x1 = Math.random() * cnv.width + min;
    const y1 = Math.random() * cnv.height + min;
    const x2 = Math.random() * cnv.width + min;
    const y2 = Math.random() * cnv.height + min;
    const p1 = new Point(x1, y1);
    const p2 = new Point(x2, y2);
    walls.push(new Wall(new Line(p1, p2)));
  }
  walls.push(new Wall(new Line(new Point(0, 0), new Point(cnv.width, 0))));
  walls.push(new Wall(new Line(new Point(0, 0), new Point(0, cnv.height))));
  walls.push(
    new Wall(
      new Line(new Point(cnv.width, 0), new Point(cnv.width, cnv.height))
    )
  );
  walls.push(
    new Wall(
      new Line(new Point(0, cnv.height), new Point(cnv.width, cnv.height))
    )
  );
  //c.addMouse("mousemove");
};

const render = (cnv, ctx) => {
  walls.forEach((w) => {
    w.draw(cnv, ctx);
  });

  c.update();
  for (let ra of rays) {
    ra.x = c.x;
    ra.y = c.y;
    ra.update();
    let minDistance = Infinity;
    let nearest = null;
    for (let w of walls) {
      const hit = ra.hittingWall(w);
      if (hit.length > 0) {
        //const c = new Circle(hitting[0], hitting[1], 5);
        //c.draw(cnv, ctx);
        const dx = hit[0] - ra.x;
        const dy = hit[1] - ra.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = hit;
        }
      }
    }
    if (nearest) {
      ra.draw(cnv, ctx, nearest[0], nearest[1]);
    }
  }
  c.draw(cnv, ctx);
};

const raysGame = (canvasName) => {
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

export default raysGame;
