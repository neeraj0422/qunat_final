module.exports = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,          
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
};
