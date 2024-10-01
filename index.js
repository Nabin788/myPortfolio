const express = require("express");
require("dotenv").config();
const mail = require("./controller/mail.js");
const cors = require('cors');


const app = express();

app.use(cors({origin: "*"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 1000;

app.use(express.static("views"));
app.set("view engine", "hbs");

// Routes
app.get("*", (req, res) => {
    res.render("index");
});

app.post("/send", (req,res) =>{
    mail(req,res);
});

// 404 Error handling
app.use((req, res) => {
    res.status(404).send("Page not found");
});



// Start Server
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});
