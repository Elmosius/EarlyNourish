const Jwt = require('@hapi/jwt');

const generateToken = (payload, key, ttlSec = 14400) => {
  return Jwt.token.generate(
    payload,
    {
      key,
      algorithm: 'HS256',
    },
    {
      ttlSec,
    }
  );
};

module.exports = {
  generateToken,
};
