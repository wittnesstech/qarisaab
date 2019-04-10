import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Example from "./components/Example.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      icon:"mdi-home"
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
      icon:""
    },
    {
      path: "/about",
      name: "about",
      icon:"",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
