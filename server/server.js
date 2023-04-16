const express = require("express");
const app = express();
const create = require("./routes/create");
const insert = require("./routes/insert");
const query = require("./routes/query");
const update = require("./routes/update");
var cors = require("cors");
var bodyParser = require("body-parser");
const { db } = require("./utilities/db");
var path = require('path');


app.use(express.static(path.join(__dirname, 'assets')));

// respond with "hello world" when a GET request is made to the homepage
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use("/create", create);
app.use("/insert", insert);
app.use("/query", query);
app.use("/update", update);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/assets/index.html");
});



app.listen(5000, () => {
  console.log(`Server started on 5000`);
});
