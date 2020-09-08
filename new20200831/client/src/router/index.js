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
    component: () => import("@/views/Login"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/",
    name: "index",
    component: () => import("@/views/Home"),
    meta: {
      title: "首页"
    },
    children: [
      ...home
    ]
  },
  {
    path: "/back",
    name: "back",
    component: () => import("@/views/Backstage.vue"),
    meta: {
      title: "后台管理系统"
    },
    children: [
      ...backstage
    ]
  },
  {
    path:"*",
    redirect:"/404"
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
