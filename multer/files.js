let multer = require('multer');


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file type");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files')
  },


  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if (file.mimetype === 'application/pdf') {
      filetype = 'pdf';
    }
    if (file.mimetype === 'application/msword') {
      filetype = 'doc';
    }
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      filetype = 'docx';
    }
    console.log(filetype);
    cb(null, file.originalname);
  }
})

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = upload