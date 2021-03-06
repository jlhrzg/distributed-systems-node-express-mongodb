// import of backend API wrapper
import {
  getAllNotebooks,
  createNotebook,
  deleteNotebook,
} from "../utils/notebook.js";
import { getAllNotes, deleteNote } from "../utils/note.js";

// selectors to append data
const notebooksList = document.getElementById("notebooks-list");
const notesList = document.getElementById("notes-list");

const addNotebookInput = document.getElementById("add-notebook-input");
const addListBtn = document.getElementById("add-notebook-btn");

// render the lists on the screen
const renderNotebooks = async () => {
  var notebooks = await getAllNotebooks();
  removeChildren(notebooksList);
  notebooks.forEach((notebook) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = `/notebook.html?id=${notebook._id}`;
    a.innerText = notebook.title;
    li.appendChild(a);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.classList.add("delete-btn");
    // event listener for deleting lists
    deleteBtn.addEventListener("click", async () => {
      // delete from db
      const deleted = await deleteNotebook(notebook._id);
      if (deleted.status === 405){
        alert("Notizbuch kann aufgrund von existierenden Notizen nicht gelöscht werden.")
      }
      // when successfull remove it from local list
      await renderNotebooks();
    });

    li.appendChild(deleteBtn);
    notebooksList.appendChild(li);
  });
};

const renderNotes = async () => {
  var notes = await getAllNotes();
  removeChildren(notesList);

  notes.forEach((note) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = `/note.html?id=${note._id}`;
    a.innerText = note.title;
    li.appendChild(a);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.classList.add("delete-btn");
    // event listener for deleting lists
    deleteBtn.addEventListener("click", async () => {
      // delete from db
      const deleted = await deleteNote(note._id);

      // when successfull remove it from local list
      await renderNotes();
    });

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
};

// create a new list element and add it to db
const createNewNotebook = async (event) => {
  event.preventDefault();
  if (addNotebookInput.value != "") {
    // create list at db via api
    const reqBody = {
      title: addNotebookInput.value,
    };
    await createNotebook(reqBody);

    addNotebookInput.value = "";
    await renderNotebooks();
  } else {
    alert("Der Titel darf nicht leer sein.");
  }
};

const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

// EVENT LISTENERS

window.addEventListener("load", async () => {
  renderNotebooks();
  renderNotes();
});

addListBtn.addEventListener("click", createNewNotebook);
