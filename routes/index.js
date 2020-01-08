var express = require('express');
var router = express.Router();
var upload = require('../multer/files');
var control = require('../controllers/userapp');
var controller = require('../controllers/useracc');
var admincontroller = require('../controllers/adminacc');
var auth = require('../middleware/token')
var application = require('../controllers/adminappcreate');
var Q = require('../controllers/question')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/application', upload.upload.single('file'), control.register)

router.get('/api/user/:id', auth, controller.oneUser)

router.post('/api/user/login', controller.login)
router.post('/api/user/register', controller.register)


router.post('/api/admin/register', admincontroller.register)
router.post('/api/admin/login', admincontroller.login)
router.get('/api/admin/applications', auth, control.allApps)
router.post('/api/admin/create', upload.uploadImage.single('file'), application.appCreate)

router.post('/api/admin/question/create', Q.postQ)
router.get('/api/admin/questions', Q.getQ)

module.exports = router;