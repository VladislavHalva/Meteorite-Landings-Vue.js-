import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/stats",
    name: "Stats",
    component: () => import("../views/Stats.vue")
  },
  {
    path: "/mapView",
    name: "MapView",
    component: () => import("../views/MapView.vue")
  },
  {
    path: "/detail/:id/",
    name: "Detail",
    props: true,
    component: () => import("../views/Detail.vue")
  },
  {
    path: "/objectsList",
    name: "ObjectsList",
    component: () => import("../views/ObjectsList.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
