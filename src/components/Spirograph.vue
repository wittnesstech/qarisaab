<template>
  <div>
    Playing:{{playing}}
    <vue-p5
      @sketch="sketch"
      @preload="preload"
      @setup="setup"
      @draw="draw"
      @keypressed="keyPressed"
      @mousemoved="mouseMoved"
      @mousedragged="mouseDragged"
      @mouseclicked="loopToggle"
    ></vue-p5>
    <!-- Pts:{{shapeBucket}} -->
    <!-- <v-btn @click="loopToggle">Toggle Loop</v-btn> -->

    <!-- <v-slider
          v-model="red"
          label="Red"
          max=255
    ></v-slider>-->
    <v-btn @click="resetSketch">Reset</v-btn>
    {{sketchSettings}}
    <v-slider v-model="sketchSettings.vectorMags[0]" label="Vector1" step="0.01" max="300" min="-1"></v-slider>
    <v-slider v-model="sketchSettings.vectorMags[1]" label="Vector2" step="0.01" max="150" min="-2"></v-slider>
    <v-slider v-model="sketchSettings.vectorSpeeds[0]" label="Vector1" step="0.01" max="3" min="-1"></v-slider>
    <v-slider v-model="sketchSettings.vectorSpeeds[1]" label="Vector2" step="0.01" max="5" min="-2"></v-slider>
    <div v-for="(colorType,colorSlot) in drawingColors" xs4>
      {{colorSlot}}
      <swatches v-model="drawingColors[colorSlot]" colors="material-basic"></swatches>
    </div>
    <!-- {{drawingColors}} -->
  </div>
</template>

<script>
import VueP5 from "vue-p5";
import Swatches from "vue-swatches";
// import Helper from '../helper'
// import Matter from "matter-js";
// import Particle from "../particle";

export default {
  name: "p5-example",
  components: {
    "vue-p5": VueP5,
    Swatches
  },
  data: () => ({
    playing: true,
    drawingColors: {
      bgColor: "#795548",
      textColor: "#FF5722",
      strokeColor: "#CDDC39",
      fillColor: "#3F51B5"
      //{ "bgColor": "#795548", "textColor": "#FF5722", "strokeColor": "#CDDC39", "fillColor": "#3F51B5" }
    },
    sketchSettings: {
      vectorSpeeds: [0.1, 0.01],
      vectorMags: [5, 12],
      reset: false
    },
    preloaded: null,
    shapeBucket: []
    // preloaded: null,
  }),
  methods: {
    resetSketch() {
      this.shapeBucket = [];
      this.sketchSettings.reset = true;
      console.log(this.sketchSettings);
    },
    sketch(sketch) {
      let myVector1, myVector2, vel1, vel2;
      // let shapeBucket = [{ x: 0, y: 0 }];
    },
    preload(sketch) {},
    setup(sketch) {
      const { sketchSettings } = this;
      sketch.createCanvas(600, 400);
      // sketch.noLoop();
      sketch.myVector1 = sketch.createVector(
        sketch.random(sketch.width / 4),
        sketch.random(sketch.height / 4)
      );
      sketch.myVector2 = sketch.createVector(
        sketch.random(sketch.width / 4),
        sketch.random(sketch.height / 4)
      );
    },
    draw(sketch) {
      const {
        red,
        green,
        blue,
        drawingColors,
        shapeBucket,
        sketchSettings
      } = this;
      // console.log('loaded Color',bgcolor)
      const { width, height } = sketch;
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.background(drawingColors.bgColor);
      sketch.stroke(drawingColors.strokeColor);
      sketch.fill(drawingColors.fillColor);
      // sketch.textSize(48);
      // sketch.fill();
      // sketch.ellipse(sketch.width / 2, 25, 44);
      if (this.sketchSettings.reset) {
        sketch.myVector1 = sketch.createVector(
          this.sketchSettings.vectorMags[0],
          0
        );
        sketch.myVector2 = sketch.createVector(
          this.sketchSettings.vectorMags[1],
          0
        );
        this.sketchSettings.reset = false;
      }
      sketch.line(0, 0, sketch.myVector1.x, sketch.myVector1.y);
      sketch.line(0, 0, sketch.myVector2.x, sketch.myVector2.y);
      sketch.myVector1.rotate(this.sketchSettings.vectorSpeeds[0]);
      sketch.myVector2.rotate(this.sketchSettings.vectorSpeeds[1]);
      // push calculated pts
      shapeBucket.push({
        x: (sketch.myVector1.x + sketch.myVector2.x) / 2,
        y: (sketch.myVector1.y + sketch.myVector2.y) / 2
      });
      // trace shape
      sketch.beginShape();
      for (let i = 0; i < shapeBucket.length; i++) {
        sketch.vertex(shapeBucket[i].x, shapeBucket[i].y);
      }
      sketch.endShape();
    },
    keyPressed({ keyCode }) {
      // 'g' key
      if (keyCode === "g" || 71) {
        // this.toggleGreen();
      }
    },
    mouseMoved({ mouseX, mouseY, pmouseX, pmouseY }) {
      // this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 0 });
    },
    mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
      // this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 255 });
    },
    loopToggle(sketch) {
      // console.log("sketch", sketch);
      // console.log("this.sketch", this.sketch);
      if (this.playing) sketch.noLoop();
      else sketch.loop();
      this.playing = !this.playing;
    }
    // pushLine(line) {
    //   let lines = this.lines;
    //   lines.push(line);
    //   this.lines = lines.slice(-100);
    // }
  }
};
</script>
