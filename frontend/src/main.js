import { createApp } from "vue";
import { createPinia } from 'pinia'
import "./style.css";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import router from "./router";
import gsap from "gsap";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          blue_darken: "#00268f",
        },
      },
    },
  },
  defaults: {
    VBtn: {
      color: "blue_darken",
      variant: "flat",
    },
  },
});

const app = createApp(App);

app.config.globalProperties.$gsap = gsap;

app.use(createPinia())
app.use(vuetify);
app.use(router);
app.mount("#app");
