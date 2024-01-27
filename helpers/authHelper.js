const bcrypt = require("bcrypt");

//  hashpassword function

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  return hashpassword;
};

// compare Password function

const comaparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
module.export = { hashPassword, comaparePassword };
