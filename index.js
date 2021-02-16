"use strict";

require("dotenv").config();

const server = require("./server");

const port = process.env.SERVER_PORT || 3082;

async function main() {
  await server.listen(port);
  console.log(`Listening port ${port}...`);
}

main();
