const express = require("express");
const router = express.Router();

// import Notebook schema
const Notebook = require("../models/noteBookModel");

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
  const notebook = await Notebook.create({
    title: req.body.title,
    description: req.body.description
  });
  res.status(201).json(notebook);
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
  const updatedNotebook = await Notebook.findByIdAndUpdate(req.params.id, req.body, {
    title: req.body.title,
    description: req.body.description
  });

  // return the updated notebook
  res.json(updatedNotebook);
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

  // if it is available, then delete it
  let notebook = await Notebook.findByIdAndDelete(req.params.id);
  res.json(notebook);
});

module.exports = router;
