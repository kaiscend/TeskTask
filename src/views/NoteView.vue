<template>
  <div class="container">
    <h1>Редактирование заметки</h1>
    <input
      v-model="editableNote.title"
      placeholder="Заголовок"
      class="input-field"
    />
    <textarea
      v-model="editableNote.description"
      placeholder="Описание"
      class="textarea-field"
    ></textarea>
    <button @click="updateNote" class="submit-btn">Сохранить изменения</button>
    <router-link to="/" class="back-link">Назад</router-link>
  </div>
</template>

<script>
import { useNotesStore } from "../stores/notes";
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "NoteView",
  setup() {
    const route = useRoute(); // Получаем ID заметки из маршрута
    const notesStore = useNotesStore();

    // Находим заметку по ID
    const note = computed(() =>
      notesStore.notes.find((n) => n.id === Number(route.params.id))
    );

    // Создаем редактируемую копию заметки
    const editableNote = reactive({
      title: note.value ? note.value.title : "",
      description: note.value ? note.value.description : "",
    });

    // Метод для обновления заметки
    const updateNote = async () => {
      try {
        const updatedNote = {
          title: editableNote.title,
          description: editableNote.description,
        };

        // Отправляем PUT-запрос на сервер для обновления заметки
        const response = await axios.put(
          `http://127.0.0.1:8000/notes/${note.value.id}`,
          updatedNote
        );

        // Обновляем заметку в хранилище Pinia
        notesStore.updateNote(response.data);

        alert("Заметка успешно обновлена!");
      } catch (error) {
        console.error("Ошибка при обновлении заметки:", error);
      }
    };

    return { editableNote, updateNote };
  },
};
</script>

<style scoped>
/* Контейнер для редактирования заметки */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f4f4f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Заголовок */
h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Поля ввода */
.input-field,
.textarea-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.textarea-field {
  height: 120px;
  resize: none;
}

/* Кнопка сохранения */
.submit-btn {
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.submit-btn:hover {
  background-color: #218838;
}

/* Ссылка назад */
.back-link {
  display: inline-block;
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #5a6268;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 600px) {
  .container {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .input-field,
  .textarea-field {
    font-size: 1rem;
  }

  .submit-btn,
  .back-link {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
