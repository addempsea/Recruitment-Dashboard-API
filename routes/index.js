var express = require('express');
var router = express.Router();
var upload = require('../multer/files');
var control = require('../controllers/userapp');
var controller = require('../controllers/useracc');
var admincontroller = require('../controllers/adminacc');
var auth = require('../middleware/token')
var application = require('../controllers/adminappcreate');
var Q = require('../controllers/question');
var A = require('../controllers/answer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/application', auth, upload.upload.single('file'), control.register)
router.get('/api/application/:id', auth, control.oneApp)
router.get('/api/user/:id', auth, controller.oneUser)
router.post('/api/user/login', controller.login)
router.post('/api/user/register', controller.register)
router.get('/verify', controller.verify)
router.put('/verify', controller.verify)
router.put('/api/user/profilepic/:id', auth,  upload.uploadProfile.single('file'), controller.edit)



router.post('/api/admin/register', admincontroller.register)
router.post('/api/admin/login', admincontroller.login)
router.get('/api/admin/:id', auth, admincontroller.oneUser)
router.put('/api/admin/profilepic/:id', auth, upload.uploadProfileAd.single('file'), admincontroller.edit)




router.get('/api/applications', auth, control.allApps)
router.post('/api/admin/create', auth, upload.uploadImage.single('file'), application.appCreate)
router.get('/api/batches', application.batches)

router.post('/api/admin/question/create', auth, upload.uploadImage.single('file'), Q.postQ)
router.get('/api/questions', auth, Q.getQ)


router.post('/api/user/question/submit', auth, A)

router.get('/api/scores', auth, control.appWithScore)

module.exports = router;