import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import router from "./router";

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

createApp(App).use(vuetify).use(router).mount("#app");
