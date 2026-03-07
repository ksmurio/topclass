import { createApp } from "vue";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import "./style.css";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import router from "./router";
import gsap from "gsap";
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
    icons: {
    defaultSet: 'mdi',
  },
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

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.config.globalProperties.$gsap = gsap;
app.use(pinia);
app.use(vuetify);
app.use(router);
app.mount("#app");