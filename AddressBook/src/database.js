let mongoose = require("mongoose");

const server = "ds211709.mlab.com";
const database = "emon-mlab";
const user = "emon535";
const password = "535Emon//";
const db = mongoose.connection;

const dbPath = "mongodb://emon535:535Emon//@ds211709.mlab.com:11709/emon-mlab";
mongoose.connect(dbPath);

db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});

module.exports = mongoose;
