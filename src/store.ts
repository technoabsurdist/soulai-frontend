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
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://soul-backend-b87052aa2595.herokuapp.com/entry/${userId}`, {
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

    await fetch('https://soul-backend-b87052aa2595.herokuapp.com/entry', {
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

    await fetch(`https://soul-backend-b87052aa2595.herokuapp.com/entry/${id}`, {
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
    await fetch(`https://soul-backend-b87052aa2595.herokuapp.com/entry/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    get().fetchNotes();
  },
}));
