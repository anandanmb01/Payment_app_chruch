const express = require('express')
const app = express()
const create = require('./routes/create')
const insert = require('./routes/insert')
const query = require('./routes/query')
const update = require('./routes/update')
var cors = require('cors');
var bodyParser = require('body-parser');
const {db} = require('./utilities/db')

// respond with "hello world" when a GET request is made to the homepage
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/',(req, res) => {
  //
})

app.use('/create',create);
app.use('/insert',insert);
app.use('/query',query);
app.use('/update',update);


app.listen(5000, () => {
  console.log(`Server started on 5000`)
})