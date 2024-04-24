module.exports = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: 360000,          
  jwtRefreshExpiration: 604800,
};
