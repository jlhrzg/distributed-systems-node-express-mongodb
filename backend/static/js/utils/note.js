const API_URL = "http://localhost:3000/api/note";

export const getAllNotes = async () => {
  const notes = await fetch(API_URL);
  return await notes.json();
};

export const getNoteById = async (id) => {
  const note = await fetch(`${API_URL}/${id}`);
  return await note.json();
};

export const createNote = async (reqBody) => {
  const newNote = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  return newNote;
};

export const updateNote = async (note) => {
  const updatedNote = await fetch(`${API_URL}/${note._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return updatedNote.json();
};

export const deleteNote = async (id) => {
  const deleted = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return deleted;
};
