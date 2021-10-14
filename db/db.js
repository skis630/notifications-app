const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notificationsDB', {
    useNewUrlParser: true
},
err => {
    if (err) {
        console.log(`DB connection error: ${err}`)
    } else {
        console.log('DB connection successful')
    }
})