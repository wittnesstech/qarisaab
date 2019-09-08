export default class Particle {
  options;
  body;
  r;
  word;
  constructor(x, y, r, fixed, word,Bodies){
    this.options = {
      friction: 0,
      restitution: 0.95,
      isStatic: fixed,
      inertia: Infinity
    }
    this.body = Bodies.circle(x, y, r, this.options);
    this.r = r;
    this.word = word;
  }
  show = function (sketch) {
    var pos = this.body.position;
    var angle = this.body.angle;
    sketch.push();
    sketch.translate(pos.x, pos.y);
    sketch.rotate(angle);
    sketch.rectMode(sketch.CENTER);
    sketch.strokeWeight(1);
    sketch.stroke(255);
    sketch.fill(127);
    sketch.text(this.word, 0, 0);
    sketch.pop();
  }
}