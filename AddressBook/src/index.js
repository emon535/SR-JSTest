let express = require("express");
let path = require("path");
let app = express();
let addressBookRoute = require("./routes/AddressBook");
let bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${new Date().toString()} = > ${req.originalUrl}`, req.body);
  next();
});

app.use(addressBookRoute);
app.use(express.static("public"));

// Handled 404 -Resource Not found;
app.use(function(req, res, next) {
  res.status(404);
  res.type("txt").send("Not found -404");
});

// Handled 500 -Resource Not found;
app.use(function(req, res, next) {
  res.status(500);
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "../public/500.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server started on ", PORT));
