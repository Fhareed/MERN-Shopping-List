const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// bring in the item model from models/item.js
const User = require('../../models/User');

// @route GET api/users
//@desc register new users
//@access Public 

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //Simple Validation
    if(!name || !email || !password) {
        res.status(400).json({ msg: 'Please enter all fields.'});
    }

    // check for existing user 
    User.findOne({ email })
      .then(user => {
        if(user) {
            return res.status(400).json({ msg: 'User already exists'});
        }

        const newUser = new User({
            name,
            email,
            password
        });

        // Create salt and hash 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password.toString(), salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                  .then(user => {
                    res.json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                  });
            })
        })
      })
});

module.exports =  router;
