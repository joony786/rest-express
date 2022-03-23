import  client from '../../client';

const router = require('express').Router();

router.get('/users', async (req, res) => {
  try {
    const users = await client.user.findMany();
    console.log(users);
    return res.json(users);
  } catch (error) {
    return error;
  }
});

module.exports = router;
