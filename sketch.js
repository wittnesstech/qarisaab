/// <reference path="./node_modules/@types/p5/global.d.ts" />
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/W-ou_sVlTWk

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];

var ground;

var mConstraint;
let preloaded, ayahString;
function preload() {
  preloaded = loadJSON("https://api.alquran.cloud/v1/ayah/" + Math.floor(1 + random(6666)));
  // preloaded = {
  //   "data": {
  //     "edition": { "identifier": "quran-simple", "language": "ar", "name": "Simple", "englishName": "Simple", "format": "text" },
  //     "hizbQuarter": 2,
  //     "juz": 1,
  //     "manzil": 1,
  //     "number": 33,
  //     "numberInSurah": 26,
  //     "page": 5,
  //     "ruku": 4,
  //     "sajda": false,
  //     "surah": { "number": 2, "name": "سورة البقرة", "englishName": "Al-Baqara", "englishNameTranslation": "The Cow", "numberOfAyahs": 286 },
  //     "text": "۞ إِنَّ اللَّهَ لَا يَسْتَحْيِي أَنْ يَضْرِبَ مَثَلًا مَا بَعُوضَةً فَمَا فَوْقَهَا ۚ فَأَمَّا الَّذِينَ آمَنُوا فَيَعْلَمُونَ أَنَّهُ الْحَقُّ مِنْ رَبِّهِمْ ۖ َ"
  //   }
  // }
}
function setup() {
  // console.log('preloaded:', preloaded);
  ayahString = preloaded.data.text;
  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);

  beadify(ayahString);

  //boundaries
  boundaries.push(new Boundary(200, height, width, 50, 0));

  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  //console.log(canvasmouse);
  var options = {
    mouse: canvasmouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  // console.log(mConstraint);
}

// function keyPressed() {
//   if (key == ' ') {
//   }
// }

// function mouseDragged() {
//   circles.push(new Circle(mouseX, mouseY, random(5, 10)));
// }
// let tokens, token;
function beadify(inString) {
  let words = inString.split(' ');
  //particles
  var prev = null;
  // for (var x = 200; x < 400; x += 20) {
  for (var i = 0; i < words.length; i++) {
    var fixed = false;
    if (!prev || i + 1 == words.length) {
      fixed = true;
    }
    var p = new Particle(i * 40, 100, 10, fixed, words[i]);
    // var p2 = new Particle(200, 150, 10);
    particles.push(p);
    if (prev) {
      var options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 5,
        stiffness: 0.4
      };
      var constraint = Constraint.create(options);
      World.add(world, constraint);
    }
    prev = p;
  }
}

function draw() {
  background(51);
  stroke(255);
  fill(127);
  textSize(24)
  // text(ayahString, width / 3, height / 3)//,width/2 + 50,height/2 + 50)
  // tokens = ayahString.split(' ');
  // for (var index = 0; index < tokens.length; index++) {

  //   text(tokens[index], 10 + 7 * index, 15 + 7 * index)//,width/2 + 50,height/2 + 50)
  // }

  Engine.update(engine);
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  //line(particles[0].body.position.x, particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y);

  if (mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    var m = mConstraint.mouse.position;
    stroke(0, 255, 0);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}