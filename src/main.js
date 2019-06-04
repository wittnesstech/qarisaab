import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";

import "./preset";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
