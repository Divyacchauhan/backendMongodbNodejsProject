const express = require("express");
const cors = require("cors");
const db = require("./app/models")

const app = express();

var corsOptions = {
  origin: "http://localhost:4050"
};

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node express mondb CRUD application." });
});

require("./app/routes/tutorial.routes")(app)
// set port, listen for requests
const PORT = process.env.PORT || 4050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});