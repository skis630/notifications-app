const mongoose = require('./db');


// config
const SEVERITY_SCHEMA = {
    type: String,
    enum: ['info', 'succes', 'warning', 'error'],
    default: 'info'
}

// User model
const notificationsSchema =  new mongoose.Schema({
    severity: SEVERITY_SCHEMA,
    text: String
}, { collection: "notifications" });
const Notification = mongoose.model('Notification', notificationsSchema);

// Notifications model
const usersSchema = new mongoose.Schema({
    clicked_notifications: [
        { 
            id: String,
            severity: SEVERITY_SCHEMA,
            text: String
        }
    ],
    notification_duration: {
        type: Number,
        min: 1,
        max: 4
    },
    notification_interval: {
        type: Number,
        min: 5,
        max: 10
    }
}, { collection: "users" });
const User = mongoose.model('User', usersSchema);



module.exports = {
    User,
    usersSchema,
    Notification,
    notificationsSchema
}