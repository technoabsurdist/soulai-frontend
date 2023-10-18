import { useEffect, useState } from "react";
import { useStore } from "./store";
import Header from "./componentes/Header";
import NotesList from "./componentes/NotesList";
import Footer from "./componentes/Footer";

function App() {
  const { notes, addNote } = useStore(); 
  const [novaNota, setNovaNota] = useState<string>("");
  const [numCaracteres, setNumCaracteres] = useState<number>(0);

  useEffect(() => {
    const notasSalvas = JSON.parse(localStorage.getItem("notes") || "[]");
    if (notasSalvas) {
      useStore.setState({ notes: notasSalvas });
    }
  }, []);

  const handleAdcNota = () => {
    if (novaNota.trim() !== "") {
      addNote(novaNota);
      setNovaNota("");
      setNumCaracteres(0);
    }
  };

  const handleNovaNotaChange = (text: string) => {
    setNovaNota(text);
    setNumCaracteres(text.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        novaNota={novaNota}
        numCaracteres={numCaracteres}
        onNovaNotaChange={handleNovaNotaChange}
        onAdcNota={handleAdcNota}
      />
      <NotesList notas={notes} />
      <Footer />
    </div>
  );
}

export default App;
