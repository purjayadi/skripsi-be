export default {
  secret: process.env.JWT_SECRET || 'secretKey2023',
  expiresIn: '30d' // Token expiration time
};
