const generateRandomString = () => {
  const length = 30; // You can adjust the length as needed
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

async function isTokenUnique(token, model) {
  // Check if the token already exists in the ForgetPasswordModel
  const existingToken = await model.findOne({ token });
  return !existingToken; // Return true if the token is unique, false otherwise
}

async function generateUniqueToken(model) {
  let token;
  do {
    token = generateRandomString();
  } while (!(await isTokenUnique(token, model))); // Regenerate if the token is not unique
  return token;
}

async function generateUniqueStrategySecretKey(model) {
  let secret_key;
  do {
    secret_key = generateRandomString();
  } while (!(await isTokenUnique(secret_key, model))); // Regenerate if the token is not unique
  return secret_key;
}
async function generateUniqueStrategyId(model) {
  let strategy_id;
  do {
    strategy_id = generateRandomString();
  } while (!(await isTokenUnique(strategy_id, model))); // Regenerate if the token is not unique
  return strategy_id;
}

module.exports = {
  generateRandomString,
  generateUniqueToken,
  generateUniqueStrategySecretKey,
  generateUniqueStrategyId,
};
