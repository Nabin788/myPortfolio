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
app.use(express.static("views", {
    setHeaders: (res, path) => {
        res.setHeader("Cache-Control", "public, max-age=315360000");
        res.setHeader("X-Content-Type-Options", "nosniff");

        // Explicitly set the correct charset for JavaScript and CSS
        if (path.endsWith('.js')) {
            res.setHeader("Content-Type", "application/javascript; charset=utf-8");
        } else if (path.endsWith('.css')) {
            res.setHeader("Content-Type", "text/css; charset=utf-8");
        }
    }
}));

const port = process.env.PORT || 1000;

app.set("view engine", "hbs");

// Endpoint for sending mail
app.post("/send", async (req, res) => {
    try {
        await mail(req, res);
        res.status(200).send("Message sent successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to send message.");
    }
});

// Middleware to set Cache-Control for dynamic routes (HTML pages)
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

// SPA routes handling with proper Content-Type and charset
app.get("*", (req, res) => {
    const spaRoutes = ["/", "/home", "/about", "/portfolio", "/contact"];

    if (spaRoutes.includes(req.path)) {
        res.setHeader("Content-Type", "text/html; charset=utf-8"); // Correct charset for HTML
        res.render("index");
    } else {
        res.status(404).send("404 Page not found");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
});
