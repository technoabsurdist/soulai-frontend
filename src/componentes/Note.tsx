import { useState } from "react";
import { useStore } from "../store";
import { NOTES } from "../constants";

const Note: React.FC<NOTES> = ({ id, text }) => {
  const { deleteNote, editNote } = useStore();
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text); 

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    editNote(id, editedText);
    setEditing(false);
  };

  return (
    <div className="h-64 bg-zinc-700 bg-opacity-40 p-6 rounded-lg relative hover:ring-1 ring-[#b9aee8]">
      {editing ? (
        <>
          <textarea
            name="note"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full h-full bg-zinc-800 text-[0.9rem] text-[#b9aee8] leading-5 font-semibold underline underline-offset-4 overflow-hidden focus:outline-none"
          />
          <div className="absolute bottom-0 right-0 flex p-4">
            <button
              onClick={handleSave}
              className="bg-[#b9aee8] hover:bg-indigo-600 text-white  text-[13px] font-bold py-1 px-3 mr-2  mt-10 rounded transition duration-300 ease-in-out"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-[0.9rem] text-white leading-5 font-semibold overflow-hidden">
            {text}
          </p>
          <div className="absolute bottom-0 right-0 flex p-4">
            <button
              title="Edit"
              onClick={handleEdit}
              className="bg-zinc-900 lg:opacity-70 hover:opacity-100 text-white hover:text-yellow-500  text-[13px] font-bold py-1 px-3 mr-2  mt-10 rounded transition duration-300 ease-in-out"
            >
              Edit
            </button>
            <button
              title="Delete"
              onClick={() => deleteNote(id)}
              className="bg-zinc-900 lg:opacity-70 hover:opacity-100 text-white hover:text-red-500  text-[13px] font-bold py-1 px-3 mt-10 rounded transition duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
