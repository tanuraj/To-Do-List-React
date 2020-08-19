const express = require("express");
const connectDB = require("./config/db");
const { PORT } = require("./config/config");
const path = require("path");

const app = express();

//connect database
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

const PORT_ADDRESS = PORT || 5005;


app.listen(PORT_ADDRESS, () => console.log(`Server started on port ${PORT}`));