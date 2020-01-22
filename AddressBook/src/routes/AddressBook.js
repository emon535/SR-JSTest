let express = require("express");
let route = express.Router();
let PersonModel = require("./../models/person.model");
const { check, validationResult } = require("express-validator");

route.get("/status", (req, res) => {
  res.send("Server is up and Running");
});

route.post(
  "/contact",
  [check("mobile").isMobilePhone(), check("mobile").isLength(11)],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: "Must be Bangladeshi mobile number ea: 01520100000."
      });
    }

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
  }
);

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
