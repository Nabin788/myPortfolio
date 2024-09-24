const express = require("express");
const path = require("path");

const app = express();
const port = 1000;

const html = path.join(__dirname, "./views/html");

app.use(express.static("views"));
app.set("view engine", "hbs");
app.set("views", html);

app.get("/", (req,res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Server is listening from: http://localhost:${port}`);
});