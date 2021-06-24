const randomString = require("./randomString");

const createIdUser = async (role) => {
  let firstChar, randomChar, id;

  firstChar = new Date().getFullYear().toString();
  randomChar = randomString(10);

  if (role === "ADMIN") {
    id = `ADMIN_${firstChar}${randomChar}`;
  } else if (role === "OWNER") {
    id = `OWNER${firstChar}${randomChar}`;
  } else {
    id = `USER${firstChar}${randomChar}`;
  }

  return id;
};

const createIdToko = async () => {
  let firstChar, randomChar;

  firstChar = new Date().getFullYear().toString();
  randomChar = randomString(10);

  return `TOKO_${firstChar}${randomChar}`;
};

const createIdLokasi = async () => {
  let firstChar, randomChar;

  firstChar = new Date().getFullYear().toString();
  randomChar = randomString(10);

  return `LOKASI_${firstChar}${randomChar}`;
};

module.exports = { createIdLokasi, createIdToko, createIdUser };
