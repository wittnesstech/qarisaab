<template>
  <div>
    <vue-p5
      @sketch="sketch"
      @preload="preload"
      @setup="setup"
      @draw="draw"
      @keypressed="keyPressed"
      @mousemoved="mouseMoved"
      @mousedragged="mouseDragged"
    ></vue-p5>
    <v-btn @click="loop=!loop">Toggle Loop</v-btn> 
    <p>
      Red: {{ red }}
      <br>
    </p>
    <p>
      Green: {{ green }}
      <br>
    </p>sketch
    <p>
      Blue: {{ blue }}
      <br>
    </p>
    <p>
      Press
      <button @click="toggleRed()">button</button> to toggle red color
      <br>Press
      <code @click="toggleGreen()">g</code> to toggle green color
      <br>Use mouse to draw lines
      <br>
    </p>
  </div>
</template>

<script>
import VueP5 from "vue-p5";
// import Matter from "matter-js";
import Particle from "../particle";

export default {
  name: "p5-example",
  components: {
    "vue-p5": VueP5
  },
  data: () => ({
    loop:false,
    red: 255,
    green: 0,
    blue: 0,
    lines: [],
    backgroundImage: null,
    preloaded: null,
    ayahString: null,
    Engine: null,
    World: null,
    Bodies: null,
    Constraint: null,
    Mouse: null,
    MouseConstraint: null,
    engine: null,
    world: null,
    particles: [],
    boundaries: [],
    ground: null,
    mConstraint: null
    // preloaded: null,
    // ayahString: null
  }),
  methods: {
    beadify(inString) {
      let words = inString.split(" ");
      //particles
      var prev = null;
      // for (var x = 200; x < 400; x += 20) {
      for (var i = 0; i < words.length; i++) {
        var fixed = false;
        if (!prev || i + 1 == words.length) {
          fixed = true;
        }
        var p = new Particle(
          i * 70,
          100,
          30,
          fixed,
          words[i],
          this.Bodies,
          this.World
        );
        // var p2 = new Particle(200, 150, 10);
        this.particles.push(p);
        if (prev) {
          var options = {
            bodyA: p.body,
            bodyB: prev.body,
            length: 15,
            stiffness: 0.4
          };
          var constraint = this.Constraint.create(options);
          this.World.add(this.world, constraint);
        }
        prev = p;
      }
    },
    sketch(sketch) {
      // sketch.draw = () => {
      //   this.blue = (this.blue + 3) % 255;

      //   const { red, green, blue } = this;
      //   sketch.background(red, green, blue);
      // };
    },
    preload(sketch) {
      // console.log(VueP5);
      this.preloaded = sketch.loadJSON(
        "https://api.alquran.cloud/v1/ayah/" +
          Math.floor(1 + sketch.random(6666))
      );
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
    },
    setup(sketch) {
      console.log(this.$Matter);
      this.Engine = this.$Matter.Engine;
      this.World = this.$Matter.World;
      this.Bodies = this.$Matter.Bodies;
      this.Constraint = this.$Matter.Constraint;
      this.Mouse = this.$Matter.Mouse;
      this.MouseConstraint = this.$Matter.MouseConstraint;
      console.log(this.$el.clientHeight)
      sketch.createCanvas(this.$el.clientWidth,this.$el.clientHeight);
      this.ayahString = this.preloaded.data.text;
      this.engine = this.Engine.create();
      this.world = this.engine.world;
      this.beadify(this.ayahString);

      // sketch.noLoop();
      var canvasmouse = this.Mouse.create(sketch.canvas.elt);
      canvasmouse.pixelRatio = sketch.pixelDensity();
      //console.log(canvasmouse);
      var options = {
        mouse: canvasmouse
      };
      this.mConstraint = this.MouseConstraint.create(this.engine, options);
      this.World.add(this.world, this.mConstraint);
      // console.log(mConstraint);
    },
    draw(sketch) {
      const {red,green,blue}=this;
      // console.log(sketch)
      const { width, height } = sketch;
      sketch.background(red,green,blue);
      sketch.stroke(255);
      sketch.fill(100, 128, 100);
      sketch.textSize(48);
      this.Engine.update(this.engine);
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show(sketch);
      }
      if (this.mConstraint.body) {
        var pos = this.mConstraint.body.position;
        var offset = this.mConstraint.constraint.pointB;
        var m = this.mConstraint.mouse.position;
        sketch.stroke(0, 255, 0);
        sketch.line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
      }
    },
    keyPressed({ keyCode }) {
      // 'g' key
      if (keyCode === "g" || 71) {
        this.toggleGreen();
      }
    },
    mouseMoved({ mouseX, mouseY, pmouseX, pmouseY }) {
      this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 0 });
    },
    mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
      this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 255 });
    },
    toggleRed() {
      this.red = 255 - this.red;
    },
    toggleGreen() {
      this.green = 255 - this.green;
    },
    pushLine(line) {
      let lines = this.lines;
      lines.push(line);
      this.lines = lines.slice(-100);
    }
  }
};
</script>