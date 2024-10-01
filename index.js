const express = require("express");
require("dotenv").config();
const mail = require("./controller/mail.js");
const cors = require('cors');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 1000;

app.use(express.static("views"));
app.set("view engine", "hbs");

app.post("/send", (req, res) => {
    mail(req, res);
});

// Routes
app.get("*", (req, res) => {
    // Define your SPA routes
    const spaRoutes = ["/", "/home", "/about" , "/portfolio", "/contact"];

    if (spaRoutes.includes(req.path)) {
        // Render index.hbs for SPA routes
        res.render("index");
    } else {
        // Send 404 for all other routes
        res.status(404).send("404 Page not found");
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});
