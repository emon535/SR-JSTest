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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: "Must be Bangladeshi mobile number ea: 01520100000."
      });
    }

    if (!req.body) return res.status(400).send("Request body is missing");

    let model = new PersonModel(req.body);
    const doc = await model.save();
    
    try {
        res.status(201).send(doc);
    } 
    catch (error) {
      res.status(500).json(error);
    }
    console.log("Data Saved");
  }
);

route.get("/contacts", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");
  
  const doc = await PersonModel.find();

  try {
    res.json(doc);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.get("/contact/:mobile", async (req, res) => {
  if (!req.params.mobile) {
    return res.status(400).send("URL Parameter missing: phone number");
  }

  const doc  = await PersonModel.findOne({
    mobile: req.params.mobile
  });

  try {
    res.json(doc);
  } catch (error) {
    
    res.status(500).json(error);
  }
});



route.put("/contact/:mobile", async (req, res) => {
  if (!req.params.mobile) {
    return res.status(400).send("URL Parameter missing: Mobile number");
  }

  try {
    
  const doc =await PersonModel.findOneAndUpdate(
    {
      mobile: req.params.mobile
    },
    req.body,
    {
      new: true
    }
  )
  res.json(doc);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.delete("/contact/:mobile",  async (req, res) => {
  if (!req.params.mobile) {
    return res.status(400).send("URL Parameter missing: phone number");
  }

  try {
      const doc = await PersonModel.findOneAndRemove({
        mobile: req.params.mobile
      })
      res.json("Deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }

});

module.exports = route;
