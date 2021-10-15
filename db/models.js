const mongoose = require('mongoose');


const notificationsSchema =  new mongoose.Schema({
    type: String,
    text: String
});
const usersSchema = new mongoose.Schema({
    clicked_notifications: [{ id: mongoose.ObjectId, type: String, text: String }]
});

const User = mongoose.model('User', usersSchema);
const Notification = mongoose.model('Notification', notificationsSchema);


export {
    User,
    Notification
}