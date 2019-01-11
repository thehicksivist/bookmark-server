// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('./middleware/config')

const { initializePassport, requireJwt } = require('./middleware/auth')

const app = express();

// parse json
app.use(express.json());

app.use(initializePassport)
app.use(cors())

const dbConn = 'mongodb://localhost/bookmarks'
mongoose.connect(dbConn, (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

app.use('/auth', require('./routes/auth'))
app.use('/bookmarks', requireJwt, require('./routes/bookmarks'))

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
