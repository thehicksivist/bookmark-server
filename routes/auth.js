const express = require('express');
const router = express.Router();

const { register, signJwtForUser, login } = require('../middleware/auth')


router.get('/', (req, res) => {
  res.send('Anyone can view this page!')
})

router.post('/register', register, signJwtForUser)
router.post('/login', login, signJwtForUser)

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200)
});

module.exports = router;
