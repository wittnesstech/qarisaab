<template>
  <v-container xs12>
    <div v-if="busybusybusy">is this busy? {{busybusybusy}}</div>
    <div v-else>
      this busy? {{busybusybusy}}//
      <div>
        <v-btn @click="clickedBtn2">Ad</v-btn>------------------------------------
        <br>

        <v-btn @click="clickedBtn">$</v-btn>
        <Surah v-bind:surah="surah"></Surah>
      </div>
    </div>
  </v-container>
</template>

<script>
import { setTimeout } from "timers";
import Surah from "../views/Surah.vue";
import Translation from "../views/Translation.vue";
// import Example from "../components/Example"
export default {
  props: ["prefs"],
  data: () => ({
    busybusybusy: false,
    surah: null
    // surah: null
  }),
  components: {
    Surah,
    Translation
    // Example
  },
  methods: {
    clickedBtn: function() {
      this.surah = "asdasdasd" + Math.random();
    },
    clickedBtn2: function() {
      this.adPrefs = Math.random();
      console.log("btn clicked adPrefs:", this.adPrefs);
    }
  },
  created: function() {
    this.cSurah = "adsfdsafsdf";
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Amiri|Katibeh|Lalezar|Lateef|Mada");
.arabicText {
  font-family: "Lateef", cursive;
  direction: rtl;
}
.translation {
  /* direction: ltr !important; */
}
.slate {
  /* direction: rtl; */
}

.infoPanel {
  /* font-family: 'Lateef', cursive; */
  /* direction: ltr; */
}

.info_name {
  /* direction: rtl; */
}

.bigText {
  font-size: 4rem;
}

.medText {
  font-size: 2em;
}

.smallText {
  font-size: 1em;
}
.redText {
  color: red;
}
.blueText {
  color: blue;
}
</style>

