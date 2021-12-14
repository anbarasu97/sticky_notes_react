import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    const newNote = {
      id: String(Math.floor(Math.random() * 10000)),
      content: "",
    };
    setNotes([...notes, newNote]);
  };

  const updateNotes = (idNote, contentNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === idNote) {
        note.content = contentNote;
      }
      return note;
    });
    setNotes([...updatedNotes]);
    localStorage.setItem("sticky-notes", JSON.stringify(updatedNotes));
  };

  const deleteNotes = (idNote, contentNote) => {
    const updatedNotes = notes.filter((note) => {
      return note.id !== idNote;
    });
    setNotes([...updatedNotes]);
    localStorage.setItem("sticky-notes", JSON.stringify(updatedNotes));
  };

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("sticky-notes") || "[]"));
  }, []);

  return (
    <div className="app">
      {notes.map((note, index) => {
        return (
          <textarea
            className="note"
            onChange={(e) => updateNotes(e.target.id, e.target.value)}
            onDoubleClick={(e) => deleteNotes(e.target.id, e.target.value)}
            value={note.content}
            key={index}
            id={note.id}
          />
        );
      })}

      <button className="add-note" onClick={() => addNote()} type="button">
        +
      </button>
    </div>
  );
}

export default App;
