const randomString = require("./randomString");

const createIdUser = async (role) => {
  let firstChar, randomChar, id;

  firstChar = new Date().getFullYear().toString();
  randomChar = randomString(10);

  if (role === "ADMIN") {
    id = `ADMN${firstChar}${randomChar}`;
  } else {
    id = `USER${firstChar}${randomChar}`;
  }

  return id;
};

const createIdToko = async () => {
  let firstChar, randomChar;

  firstChar = new Date().getFullYear().toString();
  randomChar = randomString(10);

  return `TOKO${firstChar}${randomChar}`;
};

const createIdLokasi = async () => {
  let firstChar, randomChar;

  firstChar = new Date().getFullYear().toString();
  randomChar = randomString(10);

  return `LKSI${firstChar}${randomChar}`;
};

const createIdProduk = async () => {
  let firstChar, randomChar;

  firstChar = new Date().getFullYear().toString();
  randomChar = randomString(10);

  return `PRDK${firstChar}${randomChar}`;
};

module.exports = { createIdLokasi, createIdToko, createIdUser, createIdProduk };
