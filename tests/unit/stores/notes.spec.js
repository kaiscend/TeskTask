import { setActivePinia, createPinia } from "pinia";
import { useNotesStore } from "@/stores/notes"; 

describe("Notes Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("adds a new note", () => {
        const notesStore = useNotesStore();
        notesStore.addNote({ id: 1, title: "New Note" });
        expect(notesStore.notes.length).toBe(1);
        expect(notesStore.notes[0].title).toBe("New Note");
    });

    it("deletes a note by ID", () => {
        const notesStore = useNotesStore();
        notesStore.addNote({ id: 1, title: "New Note" });
        notesStore.deleteNote(1);
        expect(notesStore.notes.length).toBe(0);
    });

    it("updates an existing note", () => {
        const notesStore = useNotesStore();
        notesStore.addNote({ id: 1, title: "Old Title" });
        notesStore.updateNote({ id: 1, title: "Updated Title" });
        expect(notesStore.notes[0].title).toBe("Updated Title");
    });
});

