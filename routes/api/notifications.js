const express = require('express');
const router = express.Router();
const Notification = require('../../db/models').Notification;
const sanitize = require('mongo-sanitize');


router.get("/", (req, res) => {
    Notification.find({}, (err, notifications) => {
        if (err || !notifications) {
            console.log("Error or empty notifications result: ", err);
            res.status(500);
            res.send("Error fetching notifications from server");
        } else {
            res.send(notifications);
        }
    })
})


module.exports = router