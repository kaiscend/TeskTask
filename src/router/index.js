import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NoteView from "../views/NoteView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView, // Главная страница со списком заметок
  },
  {
    path: "/note/:id", // Параметр :id для отображения конкретной заметки
    name: "Note",
    component: NoteView, // Страница конкретной заметки
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
