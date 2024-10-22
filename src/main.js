import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(router); // Подключение маршрутизации
app.use(createPinia()); // Подключение Pinia для управления состоянием
app.mount("#app"); // Монтирование приложения
