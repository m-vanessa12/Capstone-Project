// const cloudinary = require('cloudinary').v2;
// //const cloudinary = require('cloudinary')
// // const dotenv = require('dotenv/config')
// //require("dotenv").config();
// // import "dotenv/config";
// cloudinary.config({
// 	cloud_name: 'drg31i65t',
// 	api_key: '195979976358543',
// 	api_secret: 'ZZWC_aCjOuVBQWH_z1gQboM5UVU',
// });

// module.exports = cloudinary.uploader;

// // export default cloudinary;


// require("dotenv").config(); // This line should be at the very top
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_USER_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary.uploader;
