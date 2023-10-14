
const jwt = require('jsonwebtoken');
const secretKey = 'kuncikuat'; 

const signToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, secretKey);
    return data;
  } catch (err) {
    return null;
  }
};

module.exports = { signToken, verifyToken };
