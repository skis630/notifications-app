const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/notificationsDB';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("error connecting database: ", err));


module.exports = mongoose; 