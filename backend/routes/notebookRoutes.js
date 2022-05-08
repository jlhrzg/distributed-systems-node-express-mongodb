const express = require("express");
const router = express.Router();

// import Notebook schema
const Notebook = require("../models/noteBookModel");
// import Note schema for safe delete
const Note = require("../models/noteModel");


// get all notebooks
router.get("/", async (req, res) => {
  const notebooks = await Notebook.find();
  res.json(notebooks);
});

// get one by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const notebook = await Notebook.findById(id);
    res.json(notebook);
  } catch (error) {
    res.status(404).send();
  }
});

// create one
router.post("/", async (req, res) => {
  try {
    const notebook = await Notebook.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(notebook);
  } catch (err) {
    res.status(405).send();
  }
});

// update one
router.put("/:id", async (req, res) => {
  // check if the notebook that should be updated is available
  try {
    let notebook = await Notebook.findById(req.params.id);
  } catch (err) {
    res.status(404).send();
  }

  // if the notebook is available, then update it
  try {
    const updatedNotebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        title: req.body.title,
        description: req.body.description,
      }
    );

    // return the updated notebook
    res.json(updatedNotebook);
  } catch (err) {
    res.status(405).send();
  }
});

// delete one
router.delete("/:id", async (req, res) => {
  // check if the desired notebook is available
  try {
    let notebook = await Notebook.findById(req.params.id);
  } catch (err) {
    // if it is not available, return 404 - Not Found
    res.status(404).send();
  }
  let associatedNotes = await Note.find({ notebookId: req.params.id })
  if(associatedNotes.length === 0){
    // if it is available, then delete it
    let notebook = await Notebook.findByIdAndDelete(req.params.id);
    res.json(notebook);
  }else{
    res.status(405).send();
  }
});

module.exports = router;
