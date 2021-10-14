const { urlencoded } = require('body-parser');
const express = require('express');
// const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use("/", (req, res) => res.send("Dummy server"));



app.listen(port, () => console.log(`Server listening on port ${3000}`));