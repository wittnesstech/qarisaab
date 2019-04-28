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
    <v-slider
          v-model="red"
          label="Red"
          max=255
        ></v-slider>
         <swatches :v-model="bgcolor"></swatches>
         {{bgcolor}}
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
  </div>
</template>

<script>
import VueP5 from "vue-p5";
import Swatches from 'vue-swatches'
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
    loop:false,
    red: 255,
    green: 0,
    blue: 0,
    bgcolor:'#F64272',
    preloaded: null,
    // preloaded: null,
  }),
  methods: {
    sketch(sketch) {
    },
    preload(sketch) {
    },
    setup(sketch) {
    },
    draw(sketch) {
      const {red,green,blue,bgcolor}=this;
      // console.log('loaded Color',bgcolor)
      const { width, height } = sketch;
      // sketch.background((bgcolor));
      sketch.stroke(255);
      sketch.fill(100, 128, 100);
      sketch.textSize(48);
      sketch.fill();
      sketch.ellipse(sketch.width/2,25,44)
      
    },
    keyPressed({ keyCode }) {
      // 'g' key
      if (keyCode === "g" || 71) {
        this.toggleGreen();
      }
    },
    mouseMoved({ mouseX, mouseY, pmouseX, pmouseY }) {
      // this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 0 });
    },
    mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
      // this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 255 });
    },
    toggleRed() {
      this.red = 255 - this.red;
    },
    toggleGreen() {
      this.green = 255 - this.green;
    },
    // pushLine(line) {
    //   let lines = this.lines;
    //   lines.push(line);
    //   this.lines = lines.slice(-100);
    // }
  }
};
</script>
