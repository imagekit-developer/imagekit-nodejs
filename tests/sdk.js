// import module
const ImageKit = require('./../index');

const config = {
  publicKey: 'your_public_api_key',
  privateKey: 'your_private_api_key',
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/',
};

module.exports = new ImageKit(config);
