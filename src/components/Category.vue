<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <v-layout column>
    <!-- <v-chip small> -->
    <!-- <v-icon>refresh</v-icon> -->
    {{cats_}}
    <v-layout row>
      <v-flex xs3>
        <h2>Known Categories</h2>
      </v-flex>
    </v-layout>
    <v-flex xs12 v-for="(cat,catGroup) of cats_" :key="catGroup">
      <v-layout row class="bordered bordered-green" dropzone="true" @drop="funky">
        <v-flex xs2>{{catGroup}}</v-flex>
        <v-flex class="bordered bordered-red">
          <v-chip small v-for="c of cat" :key="c">{{c}}</v-chip>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex align-center class="bordered">
      <input :v-model="newCat" placeholder="New Category Label">
      {{newCat}}
      <v-btn ripple color="info" @click="add">+</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import cats from "./Category.js";

export default {
  name:"Category",
  data() {
    return {
      cats_: cats,
      newCat: "po"
    };
  },
  props: [],
  computed: {},
  methods: {
    funky(item) {
      console.log("item dropped", item);
    },
    add() {
      let label = this.newCat.toString();
      let tempCat = {};
      // tempCat.has
      tempCat[label] = [];
      this.cats_[label] = [];
      console.log("add pressed", label, tempCat);
    }
  }
};
</script>
<style scoped>
</style>
