const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redisp')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

module.exports = router;
/*
REDIS_URL=redis://mypassword@localhost:6379
*/