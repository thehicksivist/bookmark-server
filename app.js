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

// below is for local mongodb
// const dbConn = 'mongodb://localhost/bookmarks'
const dbConn = 'mongodb://dbadmin:open5e5ame@ds139959.mlab.com:39959/thehicksivist'
// 
// process.env.MONGODB_DEPLOYED 
// mongodb://<dbuser>:<dbpassword>@ds139959.mlab.com:39959/thehicksivist
mongoose.connect(dbConn, (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

app.use('/auth', require('./routes/auth'))
app.use('/bookmarks', require('./routes/bookmarks'))
// put below into the above to enable auth
// requireJwt, 

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
