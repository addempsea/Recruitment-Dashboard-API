var express = require('express');
var router = express.Router();
var upload = require('../multer/files');
var control = require('../controllers/userapp');
var controller = require('../controllers/useracc');
var admincontroller = require('../controllers/adminacc')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/application', upload.single('file'), control)


router.post('/api/user/login', controller.login)
router.post('/api/user/register', controller.register)


router.post('/api/admin/register', admincontroller.register)
router.post('/api/admin/login', admincontroller.login)

module.exports = router;