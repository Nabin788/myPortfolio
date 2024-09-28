const express = require("express");
require("dotenv").config();
const mail = require("./controller/mail.js");
const bodyParser = require("body-parser");
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

// Start Server
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});
