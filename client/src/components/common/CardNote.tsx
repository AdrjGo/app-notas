import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  description: string;
}

export default function CardNote() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token"); // O donde guardas tu token

      if (!token) {
        console.error("No se encontró el token");
        return;
      }

      fetch("http://localhost:3000/api/notes/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        credentials: "include", 
      })
        .then((response) => {
          if (!response.ok) {

            if (response.status === 401) {
              console.error("Token expirado o no autorizado");
              localStorage.removeItem("token");
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data.notes)) {
            setNotes(data.notes);
          } else {
            console.error("Las notas no están en formato de array");
          }
        })
        .catch((error) => {
          console.error("Error al recuperar las notas", error);
        });
    }, 5000); 


    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:p-3 w-[50vw] my-1 max-lg:w-full">
      <ul className="overflow-y-scroll max-h-[30vh]">
        {notes.length === 0 ? (
          <li>No hay notas disponibles.</li>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              className="border-2 border-white rounded-lg my-3 text-left p-3"
            >
              <h2 className="text-[1vw] font-bold text-white">{note.title}</h2>
              <p className="text-[1vw] text-gray-400">{note.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
