import rotateAround from "../lib/rotateAround";

let fps = 30;
let cnv, ctx;

let planets = [];

const Planet = class {
  constructor(name, au, size, color) {
    //const AU = 149.6e9;
    //const G = 6.67428e-11;
    //const SCALE = 250 / AU;
    //const TIME = 3600 * 24;

    this.speed_constant = 30;
    this.name = name;
    this.radius = size;
    this.color = color;
    this.xvel = 0;
    this.yvel = 0;
    this.isStar = au > 0 ? false : true;
    this.distance = au * this.speed_constant;
    this.orbit = [];

    if (this.isStar) {
      this.x = cnv.width / 2;
      this.y = cnv.height / 2;
    } else {
      this.x = cnv.width / 2 - this.distance;
      this.y = cnv.height / 2;
    }
  }
  draw(ctx) {
    this.orbit.forEach((p) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(p[0], p[1], 1, 0, Math.PI * 2, true);
      ctx.fill();
    });

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
  }
  update(cnv) {
    if (!this.isStar) {
      let rot = rotateAround(
        cnv.width / 2,
        cnv.height / 2,
        this.x,
        this.y,
        (this.speed_constant * 10) / this.distance
      );
      this.x = rot[0];
      this.y = rot[1];
      this.orbit.push([this.x, this.y]);
      if (this.orbit.length > 400) this.orbit.shift();
    }
  }
};

const setup = () => {
  planets = [];
  planets.push(new Planet("Sun", 0, 20, "yellow"));
  planets.push(new Planet("Mercury", 1, 5, "gray"));
  planets.push(new Planet("Venus", 2, 7, "purple"));
  planets.push(new Planet("Earth", 3, 9, "blue"));
  planets.push(new Planet("Mars", 4, 6, "red"));
  planets.push(new Planet("Jupiter", 5, 13, "olive"));
  planets.push(new Planet("Saturn", 6, 12, "orange"));
  planets.push(new Planet("Uranus", 7, 11, "cyan"));
  planets.push(new Planet("Neptune", 8, 10, "navy"));
  planets.push(new Planet("Pluto", 9, 3, "brown"));

  //planets = [];
  //planets.push(new Planet("Sun", 0, 696000e3, "yellow"));
  //planets.push(new Planet("Mercury", 0.39, 2440e3, "gray"));
  //planets.push(new Planet("Venus", 0.72, 6052, "purple"));
  //planets.push(new Planet("Earth", 1, 6371, "blue"));
  //planets.push(new Planet("Mars", 1.52, 3390, "red"));
  //planets.push(new Planet("Jupiter", 5.2, 69911, "olive"));
  //planets.push(new Planet("Saturn", 9.54, 58232, "orange"));
  //planets.push(new Planet("Uranus", 19.2, 25362, "cyan"));
  //planets.push(new Planet("Neptune", 30.06, 24622, "navy"));
};

const render = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  planets.forEach((planet) => planet.update(cnv));
  planets.forEach((planet) => planet.draw(ctx));
};

const planetsGame = (canvasName) => {
  cnv = document.getElementById(canvasName);
  ctx = cnv.getContext("2d");
  cnv.width = window.innerWidth / 1.3;
  cnv.height = window.innerHeight / 1.3;
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  setup();
  return setInterval(() => {
    render();
  }, 1000 / fps);
};

export default planetsGame;
