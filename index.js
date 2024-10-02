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
app.use(express.static("views", {
    setHeaders: (res, path) => {
        res.setHeader("Cach-Control", "public, max-age=315360000");
        res.setHeader("X-Content-Type-Options", "nosniff");
    }
}
));

const port = process.env.PORT || 1000;

app.set("view engine", "hbs");

app.post("/send", async (req, res) => {
    try {
        await mail(req, res);
        res.status(200).send("message send sucessfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("failed to send message.");
    }
});


// Middleware to set Cache-Control for dynamic routes (HTML pages)
app.use((req, res, next) => {
    res.setHeader("Cach-Control", "no-cach, no-store, must-revalidate");
    next();
});

// Routes
app.get("*", (req, res) => {
    // Define your SPA routes
    const spaRoutes = ["/", "/home", "/about", "/portfolio", "/contact"];

    if (spaRoutes.includes(req.path)) {
        res.setHeader("Content-Type", "text/html; charset= utf-8");
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
