var express = require('express');
var router = express.Router();
var upload = require('../multer/files');
var control = require('../controllers/userapp');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/application', upload.single('file'), control)
router.post('/login', control)

module.exports = router;