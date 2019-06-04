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
      <v-list dense class="pt-0">
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
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer :inset="true" app>
      <span v-on:click="showRoutes()" class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import routes from "./router";
import Vue from "vue";

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
  created() {
    // console.log("firebase init as ", this.$firebase);
    // console.log("pouchDB as ", this.$pouchDb);
    // console.log("axios as ", this.$axios);
    // console.log("matter as ", this.$matter);
    // console.log("currentuser as ", this.$firebase.auth().currentUser);
    // console.log("firestore init as ", this.$firestore);
    // console.log("resCache as ", this.$resCache);
  },
  methods: {}
};
</script>
<style scoped>
#drawer {
  margin-top: 64px !important;
  text-transform: capitalize;
}

.cls-1 {
  fill: #1697f6;
}
.cls-2 {
  fill: #7bc6ff;
}
.cls-3 {
  fill: #1867c0;
}
.cls-4 {
  fill: #aeddff;
}
</style>