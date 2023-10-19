import { create } from "zustand";
import { LIMITE_CARACTERES, NOTES } from "./constants";

interface StoreState {
  notes: NOTES[];
  addNote: (text: string) => void; 
  editNote: (id: number, text: string) => void; 
  deleteNote: (id: number) => void; 
  fetchNotes: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  notes: [],
  
  fetchNotes: async () => {
    try {
      const response = await fetch('http://localhost:5001/entry', {
        credentials: 'include',
      });
      if (response.status === 200) {
        const data = await response.json();
        set({ notes: data });
      } else {
        console.error('Error fetching notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  },
  
  addNote: async (text) => {
    const texto = text.trim();

    if (texto === "" || texto.length > LIMITE_CARACTERES) {
      return;
    }

    await fetch('http://localhost:5001/entry', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: texto }),
    });
  
    get().fetchNotes();
  },
  
  editNote: async (id, text) => {
    const texto = text.trim();

    if (texto === "" || texto.length > LIMITE_CARACTERES) {
      return;
    }

    await fetch(`http://localhost:5001/entry/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: texto }),
    });

    get().fetchNotes();
  },
  
  deleteNote: async (id) => {
    await fetch(`http://localhost:5001/entry/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    get().fetchNotes();
  },
}));
