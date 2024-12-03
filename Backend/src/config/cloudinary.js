const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'cloudname',
  api_key: 'apikey',
  api_secret: 'apisecret',
  secure: true,
});

module.exports = cloudinary