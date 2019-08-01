// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3800;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const reservations = [];
const waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/viewTables", function (req, res) {
    res.sendFile(path.join(__dirname, "viewTables.html"));
});

// Displays all characters
app.get("/api/tables", function (req, res) {
    return res.json(reservations);
});

// Displays all characters
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

function resChecker (){

    if (waitlist.length >= 5){
        app.post("/api/waitlist", function (req, res) {
            let newWaiter = req.body;

            console.log(newWaiter);

            waitlist.push(newWaiter);
          
            res.json(newWaiter);


        });

    } else{
        app.post("/api/reservations", function (req, res) {
            let newWaiter = req.body;

            console.log(newWaiter);

            reservations.push(newWaiter);
          
            res.json(newWaiter);
        });

    }

}

resChecker();

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });