var express = require('express');
var router = express.Router();
var upload = require('../multer/files');
var control = require('../controllers/userapp');
var controller = require('../controllers/useracc')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/application', upload.single('file'), control)


router.post('/api/user/login', controller.login)
router.post('/api/user/register', controller.register)

module.exports = router;