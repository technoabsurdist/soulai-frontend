// src/store.js
import { create } from "zustand";
import { NOTES, LIMITE_CARACTERES } from "./constants";

interface StoreState {
  notes: NOTES[];
  addNote: (text: string) => void; 
  editNote: (id: number, text: string) => void; 
  deleteNote: (id: number) => void; 
}

export const useStore = create<StoreState>((set) => ({
  notes: JSON.parse(localStorage.getItem("notes") || "[]") as NOTES[],

  addNote: (text) => {
    const texto = text.trim();

    if (texto === "") {
      window.alert("Invalid input: Please enter a non-empty note.");
      return;
    }

    if (texto.length > LIMITE_CARACTERES) {
      window.alert(
        `Sua nota excedeu o limite de ${LIMITE_CARACTERES} caracteres.`
      );
      return;
    }

    set((state) => {
      const newNote = { id: Date.now(), text: texto };
      const updatedNotes= [...state.notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return { notes: updatedNotes };
    });
  },

  editNote: (id, text) => {
    const texto = text.trim();

    if (texto === "") {
      window.alert("Please first add your new note")
      return;
    }

    if (texto.length > LIMITE_CARACTERES) {
      window.alert(
        `Your note exceeds the ${LIMITE_CARACTERES} character limit`
      );
      return;
    }

    set((state) => {
      const notesAtualizadas = state.notes.map((nota) =>
        nota.id === id ? { ...nota, text: texto } : nota
      );
      localStorage.setItem("notes", JSON.stringify(notesAtualizadas));
      return { notes: notesAtualizadas };
    });
  },

  deleteNote: (id) => {
    const confirmacao = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirmacao) {
      set((state) => {
        const notesAtualizadas = state.notes.filter((nota) => nota.id !== id);
        localStorage.setItem("notes", JSON.stringify(notesAtualizadas));
        return { notes: notesAtualizadas };
      });
    }
  },
}));
