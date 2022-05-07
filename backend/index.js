// imports express, database
const express = require("express");
const connectDb = require("./config/db");
const notebookRouter = require("./routes/notebookRoutes");
const app = express();

// configuration of the port of our webserver
const PORT = process.env.PORT || 3000;

// connect to database
connectDb();

// middleware to parse JSON requests
app.use(express.json());


app.use("/api/notebook", notebookRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });