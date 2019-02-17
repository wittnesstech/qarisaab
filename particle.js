// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/W-ou_sVlTWk

function Particle(x, y, r, fixed, word) {
  var options = {
    friction: 0,
    restitution: 0.95,
    isStatic: fixed,
    inertia: Infinity
  }
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.word = word;
  World.add(world, this.body);

  this.isOffScreen = function () {
    var pos = this.body.position;
    return (pos.y > height + 100);
  }

  this.removeFromWorld = function () {
    World.remove(world, this.body);
  }

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    ellipse(0, 0, this.r * 2);
    // line(0, 0, this.r, 0);
    text(this.word, 0, 0);
    pop();
  }

}