const express = require('express');
const router = express.Router();

// bring in the item model from models/item.js
const Item = require('../../models/item');

// @route GET api/items 
//@desc GET All Items
//@access Public 

router.get('/', (req, res) => {// instead of using api/Item we just use '/' because we already declared that in server.js
    Item.find()
      .sort({ date: -1}) // sort in descending order
      .then(items => res.json(items))

});

// @route POST api/items 
//@desc Create an item
//@access Public 

router.post('/', (req, res) => {// instead of using api/Item we just use '/' because we already declared that in server.js
    const newItem = new Item({ //creating a new item model we required 
        name: req.body.name
    });

    newItem.save().then(item => res.json(item))
});

// @route DELETE api/items/:id
//@desc Delete an item 
//@access Public 

router.delete('/:id', (req, res) => {// instead of using api/Item we just use '/' because we already declared that in server.js
    Item.findById(req.params.id)
     .then(item => item.remove().then(() => res.json({ success: 'Done' })))
     .catch(err => res.status(404).json({ success: 'Failed' }));
});
module.exports =  router;
