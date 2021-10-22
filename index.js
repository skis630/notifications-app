const express = require('express');
const bodyParser = require('body-parser');
var users = require('./routes/api/users');
var notifications = require('./routes/api/notifications');


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", users);
app.use("/notifications", notifications)
//app.use("/", (req, res) => res.end("Dummy server"));



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));