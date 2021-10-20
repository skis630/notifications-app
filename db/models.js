const mongoose = require('mongoose');


const notificationsSchema =  new mongoose.Schema({
    type: String,
    text: String
});
const usersSchema = new mongoose.Schema({
    clicked_notifications: [{ id: String, type: String, text: String }]
}, { collection: "users", typeKey: '$type' });

const User = mongoose.model('User', usersSchema);
const Notification = mongoose.model('Notification', notificationsSchema);


module.exports = {
    User,
    Notification
}