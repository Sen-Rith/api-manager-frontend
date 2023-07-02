import { createVuetify } from "vuetify";
import { VInfiniteScroll } from "vuetify/lib/labs/components.mjs";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VInfiniteScroll
    }
  });

  nuxtApp.vueApp.use(vuetify);

  return {
    provide: {
      vuetify,
    },
  }
});
