// src/components/Header.tsx
import { LIMITE_CARACTERES, View } from "../constants";

interface HeaderProps {
  view: View
  newNote: string; 
  numChars: number; 
  onNewNoteChange: (text: string) => void;
  handleViewNotes: () => void;
  handleViewChat: () => void; 
  onAddNote: () => void; 
}
const Header: React.FC<HeaderProps> = ({
  view,
  newNote, 
  numChars,
  onNewNoteChange,
  handleViewNotes,
  handleViewChat,
  onAddNote,
}) => {

  return (
    <div className="container px-5 pt-24 mx-auto flex flex-wrap">
      <div className="flex flex-col text-center w-full mb-5 md:mb-20">
        <div>
        <button
          onClick={handleViewNotes}
          className={`mx-2 text-white bg-[#313131] border-0 py-2 px-6 focus:outline-none rounded text-base font-bold transition duration-300 ease-in-out tracking-wider ${view === View.NOTES ? "bg-[#b9aee8]" : ""}`}
        >
          Notes 
        </button>
        <button
          onClick={handleViewChat}
          className={`mx-2 text-white bg-[#313131] border-0 py-2 px-6 focus:outline-none rounded text-base font-bold transition duration-300 ease-in-out tracking-wider ${view === View.CHAT ? "bg-[#b9aee8]" : ""}`}
        >
          Chat
        </button>
        </div>
        <h1 className="mt-10 mb-4 text-6xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-2xl">
          Soul
        </h1>
        <h2 className="text-s text-[#b9aee8] text-600 tracking-widest font-bold uppercase">
          Organize your thoughts and pinpoint behavioral patterns; <br /> 
          Decode your subconscious and discover your inner realm. 
        </h2>
      </div>

      <div className="flex w-full lg:flex-row flex-col mx-auto items-end sm:space-x-4 sm:space-y-0 space-y-4">
        <div className="relative md:mb-4 flex-grow w-full">
          <input
            type="text"
            name="nota"
            placeholder="What are you thinking..."
            value={newNote}
            onChange={(e) => onNewNoteChange(e.target.value)}
            className="w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#b9aee8] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider"
          />
        </div>
        <div className="flex lg:pb-4">
          <p className="text-zinc-500  py-2 pr-3 text-lg">
            {numChars}/{LIMITE_CARACTERES}
          </p>
          <button
            onClick={onAddNote}
            className="text-white bg-[#b9aee8] border-0 py-2 px-6 focus:outline-none hover:bg-[#2fa0d6] rounded text-base font-bold transition duration-300 ease-in-out tracking-wider"
          >
          Add 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
