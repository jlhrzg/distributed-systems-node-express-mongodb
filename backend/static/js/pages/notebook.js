import { getNotebookById, updateNotebook } from "../utils/notebook.js";
import { getAllNotes, createNote, deleteNote } from "../utils/note.js";

// SELECTORS
const notebookHeading = document.querySelector("#notebook-heading");
const changeNotebookTitleBtn = document.querySelector(
  "#change-notebook-title-btn"
);
const newNotebookTitleInput = document.querySelector("#new-notebook-title");

const newNoteTitleInput = document.querySelector("#new-note-title");
const createNoteBtn = document.querySelector("#create-note-btn");
const notesList = document.querySelector(".note-list");

const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

const extractNotebookId = async () => {
  const notebookId = new URLSearchParams(window.location.search).get("id");
  const notebook = await getNotebookById(notebookId);
  document.title = notebook.title;
  notebookHeading.textContent = notebook.title;
  return notebook;
};

const getNotesFromNotebook = async (notebook) => {
  const notes = await getAllNotes();
  const notesToShow = notes.filter((note) => {
    return note.notebookId === notebook._id;
  });
  return notesToShow;
};

const createNewNote = async (event) => {
  event.preventDefault();
  if (newNoteTitleInput.value != "") {
    let newNote = {
      title: newNoteTitleInput.value,
      notebookId: new URLSearchParams(window.location.search).get("id"),
    };
    await createNote(newNote);
    newNoteTitleInput.value = "";
    initView();
  } else {
    alert("Der Titel des Notiz darf nicht leer sein.");
  }
};

const renderNotes = async (noteToShow) => {
  removeChildren(notesList);

  noteToShow.forEach((note, index) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerText = note.title;
    a.href = `/note.html?id=${note._id}`;

    li.appendChild(a);

    let deleteBtn = document.createElement("button");
    deleteBtn.dataset.noteId = note._id;
    deleteBtn.textContent = "Löschen";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", async (event) => {
      await deleteNote(event.target.dataset.noteId);
      initView();
    });

    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
};

const initView = async () => {
  let notebookId = await extractNotebookId();
  let notesToShow = await getNotesFromNotebook(notebookId);
  renderNotes(notesToShow);
};

window.addEventListener("load", async () => {
  await initView();
});

createNoteBtn.addEventListener("click", createNewNote);

changeNotebookTitleBtn.addEventListener("click", async () => {
  if (newNotebookTitleInput.value === "Titel ändern") {
    return;
  }

  if (newNotebookTitleInput.value != "") {
    let newNote = {
      ...(await extractNotebookId()),
      title: newNotebookTitleInput.value,
    };
    const updatedNotebook = await updateNotebook(newNote);
    document.title = newNotebookTitleInput.value;
    notebookHeading.textContent = newNotebookTitleInput.value;
  }
});
