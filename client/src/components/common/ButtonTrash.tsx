import Trash from "../../../public/icons/TrashIcon";
import { Note } from "./CardNote";

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  notes: Note[];
  id: number;
}

export default function ButtonTrash({ setNotes, notes, id }: Props) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar la nota");
      }

      setNotes(notes.filter((note) => note.id !== id));
      console.log("Nota eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-red-600 hover:bg-red-800 rounded-lg p-3 text-[1vw]"
        onClick={handleDelete}
      >
        <Trash />
      </button>
    </div>
  );
}
