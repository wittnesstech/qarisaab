import Vue from "vue";
import firebase from "firebase";
import PouchDB from "pouchdb";
import Matter from "matter-js";
import axios from "axios";
import { firestorePlugin } from "vuefire";
import { constants } from "crypto";//??

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vue-swatches/dist/vue-swatches.min.css";
// https://www.npmjs.com/package/vue-swatches
// Import the styles too, globally

const firebaseConfig = {
  apiKey: "AIzaSyDct7FWIDpymYRsS4OsBnMhzgXeqt4kaY0",
  authDomain: "qarisaab-55802.firebaseapp.com",
  databaseURL: "https://qarisaab-55802.firebaseio.com",
  projectId: "qarisaab-55802",
  storageBucket: "qarisaab-55802.appspot.com",
  messagingSenderId: "475854722350",
  appId: "1:475854722350:web:22552ffb55bb9f25"
};

// Get a Firestore instance
const firebase_ = firebase.initializeApp(firebaseConfig);

const firestore_ = firebase_.firestore();

//POUCHDB client DB
const settingsDB = new PouchDB("settings");

//base vue init func
function baseVueInit() {
  Vue.config.productionTip = false;
  const resCache = new PouchDB("resCache");//response cache for http requests... ugh
  // Vue.use(PouchDB);
  Vue.use(firestorePlugin);
  Object.defineProperty(Vue.prototype, "$pouchDb", { value: PouchDB });
  Object.defineProperty(Vue.prototype, "$matter", { value: Matter });
  Object.defineProperty(Vue.prototype, "$axios", { value: axios });
  Object.defineProperty(Vue.prototype, "$firebase", { value: firebase_ });
  Object.defineProperty(Vue.prototype, "$firestore", { value: firestore_ });
  Object.defineProperty(Vue.prototype, "$resCache", { value: resCache });
}
baseVueInit();