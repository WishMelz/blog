import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import home from './home'
import backstage from './backstage'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login")
  },
  {
    path: "/",
    name: "index",
    component: () => import("@/views/Home"),
    children: [
      ...home
    ]
  },
  {
    path: "/back",
    name: "index",
    component: () => import("@/views/Backstage.vue"),
    children: [
      ...backstage
    ]
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
