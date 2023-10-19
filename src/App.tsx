import { useEffect, useState } from "react";
import { useStore } from "./store";
import Header from "./componentes/Header";
import NotesList from "./componentes/NotesList";
import Footer from "./componentes/Footer";
import Login from "./componentes/Login";

function App() {
  const { notes, addNote } = useStore(); 
  const [newNote, setNewNote] = useState<string>("")
  const [numChars, setNumChars] = useState<number>(0); 
  const [loggedIn, setLoggedIn] = useState<boolean>(false); 

  const handleUserLogin = () => {
    setLoggedIn(true);
}

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

  const handleNewNote = async (text: string) => {
    setNewNote(text);
    setNumChars(text.length);
    try {
      const title = 'Testing Title 1';
      const response = await fetch('http://localhost:5001/entry', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, text: text }),
      });
      return response; 
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="flex flex-col min-h-screen mx-10">
      {loggedIn ? (
        <>
          <Header
            newNote={newNote}
            numChars={numChars}
            onNewNoteChange={handleNewNote}
            onAddNote={handleAdcNota}
          />
          <NotesList notes={notes} />
          <Footer />
        </>
      ) : (
        <Login handleUserLogin={handleUserLogin}/>
      )}
   </div>
  );
}

export default App;
