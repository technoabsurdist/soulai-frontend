import { useEffect, useState } from "react";
import { useStore } from "./store";
import Header from "./componentes/Header";
import NotesList from "./componentes/NotesList";
import Footer from "./componentes/Footer";

function App() {
  const { notes, addNote } = useStore(); 
  const [newNote, setNewNote] = useState<string>("")
  const [numChars, setNumChars] = useState<number>(0); 

  useEffect(() => {
    const notasSalvas = JSON.parse(localStorage.getItem("notes") || "[]");
    if (notasSalvas) {
      useStore.setState({ notes: notasSalvas });
    }
  }, []);

  const handleAdcNota = () => {
    if (newNote.trim() !== "") {
      addNote(newNote);
      setNewNote("");
      setNumChars(0);
    }
  };

  const handleNovaNotaChange = (text: string) => {
    setNewNote(text);
    setNumChars(text.length);
  };

  return (
    <div className="flex flex-col min-h-screen mx-10">
      <Header
        newNote={newNote}
        numChars={numChars}
        onNewNoteChange={handleNovaNotaChange}
        onAddNote={handleAdcNota}
      />
      <NotesList notes={notes} />
      <Footer />
    </div>
  );
}

export default App;
