const express = require('express');
const router = express.Router();
const User = require('../../db/models').User;
const sanitize = require('mongo-sanitize');
const uuid = require('uuid');
const callback = require('../../utils').callback;


router.put("/:id/clicked_notifications", (req, res) => {
    const newClickedNotification = sanitize(req.body);
    const id = sanitize(req.params.id);

    User.findById(id, (err, user) => {
        console.log(user, id);
        if (!err && user) {
            console.log(user.clicked_notifications);
            user.clicked_notifications.push(newClickedNotification);
            user.save(error => {
                if (error) {
                    console.log("error: ", error);
                }
            })
        } else {
            console.log("error or no result found: ", err, user);
        }
    })

    res.end();
})

router.post("/", async (req, res) => {
    await User.create({ clicked_notifications: [] }, (err, user) => {
        if (err) {
            res.status(500);
            res.send("Error in creating new user")
            console.log("Error: ", err)
        } else {
            console.log(user);
            res.json(user)
        }
    });
        
})


module.exports = router;