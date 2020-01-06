var express = require('express');
var router = express.Router();
var upload = require('../multer/files');
var control = require('../controllers/accounts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', upload.single('file'), control.register)

module.exports = router;
