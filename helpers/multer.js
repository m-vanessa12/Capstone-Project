const cloudinaryUploader = require('./cloudinary')
//const multer = require('multer')

const fileFilter = async (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("invalid image file!", false);
	}
};
const fileUpload = async (req) => {
    let imageUrl = "";
    try {
        await cloudinaryUploader.upload(
            req.file.path,
            async function (err, image) {
                if (err) {
                    console.error("Error uploading image to Cloudinary:", err);
                    throw err; // Throw the error to be caught by the caller
                }
                if (image && image.url) {
                    imageUrl = image.url;
                } else {
                    console.error("Error: No image URL returned from Cloudinary");
                }
            }
        );
    } catch (error) {
        console.error("Error occurred during file upload:", error);
    }
    return imageUrl;
};


module.exports ={
    fileFilter, fileUpload
}
