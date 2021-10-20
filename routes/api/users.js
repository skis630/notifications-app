const express = require('express');
const router = express.Router();
const userModel = require('../../db/models');
const User = userModel.User;
const userSchema = userModel.usersSchema;
const sanitize = require('mongo-sanitize');
const between = require('../../utils').between;
// const uuid = require('uuid');
// const callback = require('../../utils').callback;


router.put("/:id/clicked_notifications", async (req, res) => {
    const newClickedNotification = sanitize(req.body);
    const id = sanitize(req.params.id);

    await User.findById(id, async (err, user) => {
        console.log(user, id);
        if (!err && user) {
            console.log(user.clicked_notifications);
            user.clicked_notifications.push(newClickedNotification);
            await user.save(error => {
                if (error) {
                    console.log("error: ", error);
                    res.send("Error updating clicked notifications")
                } else {
                    res.json(user)
                }
            })
        } else {
            console.log("error or no result found: ", err, user);
            res.send("Error finding user")
        }
    })

})

router.post("/", async (req, res) => {
    const userSchemaObj = userSchema.obj;
    // Compute notification duraton for user
    const minDuration = userSchemaObj.notification_duration.min;
    const maxDuration = userSchemaObj.notification_duration.max;
    const msgDuration = between(minDuration, maxDuration);

    // Compute notifications interval for user
    const minInterval = userSchemaObj.notification_interval.min;
    const maxInterval = userSchemaObj.notification_interval.max;
    const msgInterval = between(minInterval, maxInterval);

    await User.create(
        { 
            clicked_notifications: [],
            notification_duration: msgDuration,
            notification_interval: msgInterval 
        }, (err, user) => {
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