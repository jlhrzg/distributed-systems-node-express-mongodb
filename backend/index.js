// imports express, database
const express = require("express");
const connectDb = require("./config/db");

const app = express();
const router = express.Router();

// configuration of the port of our webserver
const PORT = process.env.PORT || 3000;

// connect to database
connectDb();

// middleware to parse JSON requests
app.use(express.json());


router.get("/", async (req, res) => {
    res.json({"message": "Hello from server"});
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });