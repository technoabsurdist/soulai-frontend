import { useStore } from "../store";
import Note from "./Note";

const NotesList = () => {
  const { notes } = useStore();
  const listNotes = [...notes].reverse();

  return (
    <>
      {listNotes.length === 0 ? (
        <div>
          
        </div>
      ) : (
        <div className="container mx-auto flex flex-wrap items-start my-10 lg:my-20">
          {listNotes.map((nota) => (
            <div className="w-full md:w-1/2 xl:w-1/4 p-4" key={nota.id}>
              <Note id={nota.id} text={nota.text} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotesList;
