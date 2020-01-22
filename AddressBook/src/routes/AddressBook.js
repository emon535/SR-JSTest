let express = require("express");
let route = express.Router();
let PersonModel = require("./../models/person.model");

route.get("/status", (req, res) => {
  res.send("Server is up and Running");
});

route.post("/contact/new", (req, res) => {
  console.log("Inside Request");
  if (!req.body) return res.status(400).send("Request body is missing");
  console.log(req.body);
  let model = new PersonModel(req.body);
  console.log("Model", model);

  model.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });

  //   model
  //     .save()
  //     .then(doc => {
  //       console.log("Then", doc);
  //       res.status(201).send(doc);
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });

  console.log("Data Saved");
});

module.exports = route;
