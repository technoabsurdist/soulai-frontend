import { NOTES } from "../constants";
import Nota from "./Nota";

interface NotasProps {
  notas: NOTES[];
}

const NotesList: React.FC<NotasProps> = ({ notas }) => {
  const lista = [...notas].reverse();

  return (
    <>
      {lista.length === 0 ? (
        <p className="text-center font-bold text-2xl text-zinc-300 mt-20 lg:mt-32 px-7">
          Time to write your first note!
        </p>
      ) : (
        <div className="container mx-auto flex flex-wrap items-start my-10 lg:my-20">
          {lista.map((nota) => (
            <div className="w-full md:w-1/2 xl:w-1/4 p-4" key={nota.id}>
              <Nota id={nota.id} text={nota.text} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotesList;
