const express = require('express');
const router = express.Router();

const redis = require('../redisp')

router.post('/', async (req, res) => {
  await redis.setAsync('val',0)
  const v2 = await redis.getAsync('val')
  res.status(200).send(v2)
});

router.get('/', async (req, res) => {
	const v2 = await redis.getAsync('val')
	res.status(200).send(v2)
});
  

module.exports = router