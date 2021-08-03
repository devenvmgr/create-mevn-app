/** server/index.js
 * This is the entrypoint for our backend.
 * Here we set up environment variables, and initialize the REST API.
 */
require("dotenv").config();
const app = require("express")();
const router = require("./router");

async function start() {
  await router({ app });
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

start();
