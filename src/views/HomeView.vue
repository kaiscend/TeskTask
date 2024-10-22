<template>
  <div class="container">
    <h1>Заметки</h1>
    <button class="add-note-btn" @click="showModal = true">
      Добавить заметку
    </button>

    <ul class="note-list">
      <li v-for="note in notesStore.notes" :key="note.id" class="note-item">
        <router-link :to="`/note/${note.id}`" class="note-link">{{
          note.title
        }}</router-link>
        <button class="delete-btn" @click="deleteNote(note.id)">Удалить</button>
      </li>
    </ul>

    <!-- Модальное окно с формой для добавления заметки -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Новая заметка</h2>
        <label for="title">Название:</label>
        <input
          v-model="newNote.title"
          id="title"
          type="text"
          placeholder="Введите название"
          class="input-field"
        />

        <label for="description">Описание:</label>
        <textarea
          v-model="newNote.description"
          id="description"
          placeholder="Введите описание"
          class="textarea-field"
        ></textarea>

        <button class="submit-btn" @click="submitNote">Сохранить</button>
        <button class="cancel-btn" @click="closeModal">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useNotesStore } from "../stores/notes";

export default {
  data() {
    return {
      showModal: false, // Состояние модального окна
      newNote: {
        // Данные для новой заметки
        title: "",
        description: "",
      },
    };
  },
  setup() {
    const notesStore = useNotesStore();
    return { notesStore };
  },
  mounted() {
    this.fetchNotes();
  },
  methods: {
    // Закрытие модального окна
    closeModal() {
      this.showModal = false;
      this.newNote = { title: "", description: "" }; // Очистка формы
    },
    // Загрузка заметок
    async fetchNotes() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/notes/");
        this.notesStore.notes = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке заметок:", error);
      }
    },
    // Отправка новой заметки
    async submitNote() {
      if (!this.newNote.title || !this.newNote.description) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/notes/",
          this.newNote
        );
        this.notesStore.addNote(response.data);
        this.closeModal(); // Закрытие модального окна после сохранения
      } catch (error) {
        console.error("Ошибка при добавлении заметки:", error);
      }
    },
    async deleteNote(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/notes/${id}`);
        this.notesStore.deleteNote(id);
      } catch (error) {
        console.error("Ошибка при удалении заметки:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Контейнер для основного содержимого */
.container {
  max-width: 900px;
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
  text-align: center;
  color: #4a4a4a;
  margin-bottom: 20px;
}

/* Кнопка добавления заметки */
.add-note-btn {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.add-note-btn:hover {
  background-color: #0056b3;
}

/* Список заметок */
.note-list {
  list-style-type: none;
  padding: 0;
}

.note-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.note-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

/* Ссылка на заметку */
.note-link {
  font-size: 1.25rem;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.note-link:hover {
  color: #0056b3;
}

/* Кнопка удаления */
.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}

/* Модальное окно */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
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
}

.textarea-field {
  height: 100px;
  resize: none;
}

/* Кнопки в модальном окне */
.submit-btn,
.cancel-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  margin-right: 10px;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.submit-btn:hover {
  background-color: #218838;
}

.cancel-btn:hover {
  background-color: #5a6268;
}
</style>
