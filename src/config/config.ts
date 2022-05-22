require('dotenv').config();

const {
  MONGODB_URI,
  MONGODB_URI_TEST,
  NODE_PORT,
} = process.env;

export const config = {
  mongoConnection: `${MONGODB_URI}?retryWrites=true&w=majority&authSource=admin`,
  mongoTestConnection: `${MONGODB_URI_TEST}?retryWrites=true&w=majority&authSource=admin`,
  secret: "bitsjwtsecret",
  port: NODE_PORT || 3001,
};
