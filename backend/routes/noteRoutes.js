const express = require("express");
const router = express.Router();

// import Note schema
const Note = require("../models/noteModel");

// create a note
router.post("/", async (req, res) => {
  const note = await Note.create({
    title: req.body.title,
    description: req.body.description,
    content: "New Note",
    notebookId: req.body.notebookId
  });
  res.status(201).json(note);
});

// get all notes
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// get note by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findById(id);
    res.json(note);
  } catch (error) {
    res.status(404).send();
  }
});

// update Note
router.put("/:id", async (req, res) => {
  // check if the note that should be updated is available
  try {
    let note = await Note.findById(req.params.id);
  } catch (err) {
    res.status(404).send();
  }

  // if the note is available, then update it
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    notebookId: req.body.notebookId
  });

  // return the updated note
  res.json(updatedNote);
});

// delete a note by id
router.delete("/:id", async (req, res) => {
  // check if the desired note is available
  try {
    let note = await Note.findById(req.params.id);
  } catch (err) {
    // if it is not available, return 404 - Not Found
    res.status(404).send();
  }

  // if it is available, then delete it
  let note = await Note.findByIdAndDelete(req.params.id);
  res.json(note);
});

module.exports = router;
