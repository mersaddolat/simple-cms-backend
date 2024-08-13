const config = require("config");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

// Routes
require("./routes")(app);

// Middlewares
require("./middleware/logging")();

// Connect to the Database
mongoose.connect(config.get("db.connection"))
    .then(() => console.log("Database connected successfully."));


const port = config.get("port") || 3000;
app.listen(port, () => console.log(`Server runing on port ${port}`));