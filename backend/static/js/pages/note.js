import { getNoteById, updateNote } from "../utils/note.js";
import { getNotebookById } from "../utils/notebook.js";

// Saving note and notebook after loading
let note = {};
let notebook = {};

const noteTitle = document.getElementById("note-title");
const notebookLink = document.getElementById("notebook-link");
const noteCreated = document.getElementById("note-created");
const noteUpdated = document.getElementById("note-updated");
const noteContent = document.getElementById("note-content-area");
const noteSaveButton = document.getElementById("note-save");

const initNote = async (note) => {
  document.title = note.title;
  noteTitle.textContent = note.title;
  let createdDate = new Date(note.createdAt);
  let updatedDate = new Date(note.updatedAt);

  noteCreated.textContent =
    createdDate.toLocaleDateString() + ", " + createdDate.toLocaleTimeString();
  noteUpdated.textContent =
    updatedDate.toLocaleDateString() + ", " + updatedDate.toLocaleTimeString();
};

const addNotebookLink = async (notebook) => {
  let a = document.createElement("a");
  a.innerText = notebook.title;
  a.href = `/notebook.html?id=${notebook._id}`;
  return a;
};

window.addEventListener("load", async () => {
  const noteId = new URLSearchParams(window.location.search).get("id");
  note = await getNoteById(noteId);

  notebook = await getNotebookById(note.notebookId);
  const linkToNotebook = await addNotebookLink(notebook);
  notebookLink.appendChild(linkToNotebook);

  // setting content after loading
  await initNote(note);
  noteContent.textContent = note.content;
});

noteSaveButton.addEventListener("click", async () => {
  let updatedNote = {
    _id: note._id,
    notebookId: note.note,
    title: note.title,
    content: noteContent.value,
  };

  let update = await updateNote(updatedNote);
  initNote(update);
  alert(`Die Notiz ${update.title} wurde erfolgreich gespeichert.`);
});
