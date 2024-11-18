import { useState } from "react";

export default function InputFormNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const newNote = {
      title: title,
      description: description,
    };

    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:3000/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newNote),
        credentials: 'include', // Asegúrate de que las cookies se incluyan
      });
  
      if (!response.ok) {
        throw new Error('No autorizado');
      }

      setDescription("");
      setTitle("");
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al crear la nota', error);
    }
  };
  

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="grid w-full gap-2">
        <input
          type="text"
          placeholder="Titulo de la nota"
          className="p-3 rounded-md border-2 border-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción de la nota"
          className="p-3 rounded-md border-2 border-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="bg-blue-600 p-3 rounded-md text-white">
          Guardar
        </button>
      </form>
    </div>
  );
}
