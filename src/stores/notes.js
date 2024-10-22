import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [],
  }),
  actions: {
    addNote(note) {
      this.notes.push(note); // Добавление новой заметки
    },
    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id); // Удаление заметки по ID
    },
    updateNote(updatedNote) {
      const index = this.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        this.notes[index] = updatedNote;
      }
    },
  },
});
