<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      id="drawer"
      v-model="primaryDrawer.model"
      :permanent="primaryDrawer.type === 'permanent'"
      mini-variant.sync
      absolute
      overflow
      app
    >
      <!-- <v-icon>fingerprint</v-icon> -->
      <v-list class="pt-3 mt-5">
        <v-list-tile v-for="item in myRoutes" :key="item.name" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title :to="item.path">{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!-- <v-btn to="/about" tag="button">about</v-btn>
      
      <router-link class="nav-link" to="/home" tag="button">Home</router-link>
      <router-link to="/example" tag="button">Example</router-link>-->
    </v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Qari Saab</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <!-- <v-container fluid> -->
      <!-- <v-layout align-center justify-center> -->
      <!-- <v-flex xs10> -->
      <router-view/>
      <!-- </v-flex> -->
      <!-- </v-layout> -->
      <!-- </v-container> -->
    </v-content>
    <v-footer :inset="true" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import routes from "./router";
import Vue from "vue";
import Vuetify from "vuetify";
// import Matter from "matter-js";
import axios from "axios";
// https://www.npmjs.com/package/vue-swatches
// Import the styles too, globally
import "vue-swatches/dist/vue-swatches.min.css";
import FlagIcon from "vue-flag-icon";
Vue.use(FlagIcon);

// import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: "fa"
});

import PouchDB from "pouchdb";
// Vue.use(PouchDB);
const resCache = new PouchDB("resCache");
Object.defineProperty(Vue.prototype, "$resCache", { value: resCache });
const settingsDB = new PouchDB("settingsDB");
Object.defineProperty(Vue.prototype, "$settingsDB", { value: settingsDB });
// import Router from "vue-router";
// Object.defineProperty(Vue.prototype, "$Matter", { value: Matter });
Object.defineProperty(Vue.prototype, "$axios", { value: axios });
export default {
  name: "App",
  data: () => ({
    dark: true,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: true,
      floating: false,
      mini: true
    },
    myRoutes: routes.options.routes
    // myRoutes: [
    //   { title: "Home", icon: "dashboard" },
    //   { title: "About", icon: "question_answer" }
    // ]
  }),
  mounted: function() {
    // console.log("app mounted :");
    // console.log("pouch :", PouchDB);
  },
  methods: {
    goto: pathstring => {
      this.$router.push(pathstring);
    }
  }
};
</script>
<style scoped>
#drawer {
  /* margin-top: 64px !important; */
  text-transform: capitalize;
}
</style>