import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import Example from "./components/Example.vue";
// import Spirograph from "./components/Spirograph.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "reader",
      component: Home,
      icon: "fingerprint"
    },
    // {
    //   path: "/spirograph",
    //   name: "spirograph",
    //   component: Spirograph,
    //   icon: "refresh"
    // },
    // {
    //   path: "/example",
    //   name: "example",
    //   component: Example,
    //   icon: "transform"
    // },
    {
      path: "/about",
      name: "about",
      icon: "copyright",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
