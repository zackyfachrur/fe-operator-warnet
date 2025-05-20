import { createApp, ref } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { MotionPlugin } from "@vueuse/motion";
import "remixicon/fonts/remixicon.css";

// Global Refs
const showSidebar = ref(false);
const isLoggedIn = ref(false);

const app = createApp(App);
app.provide("isLoggedIn", isLoggedIn);
app.provide("showSidebar", showSidebar);
app.use(MotionPlugin);
app.use(router);
app.mount("#app");
