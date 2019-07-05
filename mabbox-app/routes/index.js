const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", (req, res) => {
  const { name, description, imageUrl, latitude, longtitude } = req.body;
  console.log(req.body);

  Place.create({
    name,
    description,
    imageUrl,
    location: {
      type: "Point",
      coordinates: [latitude, longtitude]
    }
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/api/places", (req, res, next) => {
  Place.find({}).then(places => {
    res.json(places);
  });
});

module.exports = router;
