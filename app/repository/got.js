"use strict";

const fetch = require("node-fetch");

async function getGot(url) {
  const url2 = `https://anapioficeandfire.com/api${url}`;
  const data = await (await fetch(url2)).json();
  return data;
}

module.exports = { getGot };
