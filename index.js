const express = require("express");
require("dotenv").config();
const mail = require("./controller/mail.js");
const cors = require('cors');
const compression = require("compression");

const app = express();

// Middleware to set the X-Content-Type-Options header
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());

// Serve static files with proper Cache-Control headers
app.use(express.static("views"));

const port = process.env.PORT || 1000;

app.set("view engine", "hbs");

// Endpoint for sending mail
app.post("/send", mail);


// Middleware to set Cache-Control for dynamic routes (HTML pages)
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

// SPA routes handling with proper Content-Type and charset
app.get("*", (req, res) => {
    const spaRoutes = ["/", "/home", "/about", "/portfolio", "/contact"];

    if (spaRoutes.includes(req.path)) {
        res.status(200).render("index");
    } else {
        res.status(404).send("404 Page not found");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});
