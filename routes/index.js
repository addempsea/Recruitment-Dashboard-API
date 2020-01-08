var express = require('express');
var router = express.Router();
var upload = require('../multer/files');
var control = require('../controllers/userapp');
var controller = require('../controllers/useracc');
var admincontroller = require('../controllers/adminacc');
var auth = require('../middleware/token')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/application', upload.single('file'), control.register)

router.get('/api/user/:id', auth, controller.oneUser)

router.post('/api/user/login', controller.login)
router.post('/api/user/register', controller.register)


router.post('/api/admin/register', admincontroller.register)
router.post('/api/admin/login', admincontroller.login)
router.get('/api/admin/applications', auth, control.allApps)

module.exports = router;