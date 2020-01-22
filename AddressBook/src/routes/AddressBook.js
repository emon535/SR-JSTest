let express = require("express");
let route = express.Router();
let PersonModel = require("./../models/person.model");

route.get("/status", (req, res) => {
  res.send("Server is up and Running");
});

route.post("/contact", (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");
  let model = new PersonModel(req.body);
  model
    .save()
    .then(doc => {
      console.log("Then", doc);
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });

  console.log("Data Saved");
});

route.get("/contacts", (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");
  PersonModel.find()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.get("/contact", (req, res) => {
  if (!req.query.mobile) {
    return res.status(400).send("URL Parameter missing: phone number");
  }

  PersonModel.findOne({
    mobile: req.query.mobile
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.put("/contact", (req, res) => {
  if (!req.query.mobile) {
    return res.status(400).send("URL Parameter missing: phone number");
  }

  PersonModel.findOneAndUpdate(
    {
      mobile: req.query.mobile
    },
    req.body,
    {
      new: true
    }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.delete("/contact", (req, res) => {
  if (!req.query.mobile) {
    return res.status(400).send("URL Parameter missing: phone number");
  }

  PersonModel.findOneAndRemove({
    mobile: req.query.mobile
  })
    .then(doc => {
      res.json("Deleted Successfully");
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = route;
