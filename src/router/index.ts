import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import User from "../views/User/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
