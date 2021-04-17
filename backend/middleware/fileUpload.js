const multer = require('multer');
const UploadsFolder = "/Uploads/";


const fileUpload = multer({
    dest: UploadsFolder
});

module.exports = fileUpload;