const app = require('./app');
const { default: client } = require('./client');


require('dotenv').config();

const PORT = process.env.PORT;


// app.get('/users', async (req, res) => {
//   const users = await client.user.findMany();
//   console.log(users);
//   return res.json(users);
// });
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`))
