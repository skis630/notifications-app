const mongoose = require('./db');


// User model
const notificationsSchema =  new mongoose.Schema({
    type: String,
    text: String
}, { collection: "notifications", typeKey: '$type' });
const Notification = mongoose.model('Notification', notificationsSchema);

// Notifications model
const usersSchema = new mongoose.Schema({
    clicked_notifications: [{ id: String, type: String, text: String }]
}, { collection: "users", typeKey: '$type' });
const User = mongoose.model('User', usersSchema);


module.exports = {
    User,
    Notification
}