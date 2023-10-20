import { useEffect, useState } from "react";
import { useStore } from "./store";
import Header from "./componentes/Header";
import NotesList from "./componentes/NotesList";
import Footer from "./componentes/Footer";
import Login from "./componentes/Login";
import Chat from "./componentes/Chat";
import { View } from "./constants";

function App() {
  const { fetchNotes } = useStore(); 
  const [newNote, setNewNote] = useState<string>("")
  const [numChars, setNumChars] = useState<number>(0); 
  const [loggedIn, setLoggedIn] = useState<boolean>(true); 
  const [view, setView] = useState<View>(View.NOTES); 
  const [userId, setUserId] = useState<string>(localStorage.getItem("userId") || "");
  const [email, setEmail] = useState<string>(localStorage.getItem("email") || "")

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "")
    if (userId) {
      setLoggedIn(true)
    }
  }, [setUserId, userId])

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "")
  }, [setEmail])

  const handleUserLogin = () => {
    setLoggedIn(true);
    setUserId(localStorage.getItem("userId") || "")
    setEmail(localStorage.getItem("email") || "")
  }

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    const notasSalvas = JSON.parse(localStorage.getItem("notes") || "[]");
    if (notasSalvas) {
      useStore.setState({ notes: notasSalvas });
    }
  }, []);

  const handleAddNote = async () => {
    if (newNote.trim() !== "") {
      try {
        const response = await fetch('https://soul-backend-b87052aa2595.herokuapp.com/entry', {
          credentials: 'include',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: localStorage.getItem("userId"), text: newNote.trim() }),
        });
        if (response.ok) {
          setNewNote("");
          setNumChars(0);
          fetchNotes(); 
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleNewNote = (text: string) => {
    setNewNote(text);
    setNumChars(text.length);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userId")
    setLoggedIn(false); 
  }

  return (
    <div className="flex flex-col min-h-screen mx-10">
      <div className="container mx-auto lg:w-full p-5 text-justify text-sm text-zinc-500 flex justify-between">
        {loggedIn ?
          (
            <>
            <div>
              <a className="tracking-wide font-bold">{email.split("@")[0].toUpperCase()}</a> <br /> 
              <a>{email}</a>
            </div>
            <button 
              className={`px-3 text-[#515151] hover:bg-[#414141] border-0 py-2 focus:outline-none rounded text-base transition duration-300 ease-in-out tracking-wider underline`}
              onClick={handleLogOut}
            >
              Log out
            </button>
          </>
        ) : (
          <div> 

          </div>
        )}
      </div>
      {loggedIn ? (
        <>
          {view === View.NOTES ? (
            <>

              <Header
                view={view}
                newNote={newNote}
                numChars={numChars}
                onNewNoteChange={handleNewNote}
                handleViewNotes={() => setView(View.NOTES)}
                handleViewChat={() => setView(View.CHAT)}
                onAddNote={handleAddNote}
              />
              <NotesList />
            </>
          
          ) : (
            <Chat 
              view={view}
              handleViewNotes={() => setView(View.NOTES)}
              handleViewChat={() => setView(View.CHAT)}
            />
          )}

          <Footer />
        </>
      ) : (
        <Login handleUserLogin={handleUserLogin}/>
      )}
    </div>
  );
}

export default App;
