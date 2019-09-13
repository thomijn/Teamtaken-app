const express = require("express");
const router = express.Router();


// Item Model
const Item = require("../models/Item");

//get items
router.get('/', (req, res) => {
  Item.find()
    .then(items => res.json(items));
});

//get specific item
router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ msg: "not found" }))
})

//add item
router.post("/", (req, res) => {
  if (!req.body.name) return res.status(400).json({ msg: "bad request" })

  const newItem = new Item({
    name: req.body.name
  });

  newItem.save()
    .then(item => res.json(item));
});

//delete item
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove()
      .then(() => res.json({ msg: "item removed" })))
    .catch(err => res.status(404).json({ msg: "not found" }));
})

module.exports = router;
