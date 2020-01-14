const User = require("../models/usersapp");
const A = require("../models/answers")
var nodemailer = require('nodemailer');
var dotenv = require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`
  }
});

const register = async (req, res, next) => {

  try {
    const { fname, lname, email, cgpa, address, course, university, isAdmin, dob } = req.body;
    const cv = req.file.originalname
    const userId = req.user.id
    const data = await User.findOne({ email });

    if (data) {
      return res.status(409).json({
        message: `Application for ${email} has been received already`
      });

    } else {
      const newUser = new User({
        fname,
        lname,
        email,
        cgpa,
        dob,
        address,
        course,
        university,
        cv,
        userId,
        isAdmin
      });
      await newUser.save();
      const content = `
            <p>Dear ${fname},</p>
            <p>Thank you for your interest in a career opportunity at Enyata.</p>
            <p> We have received and we are currently reviewing your application.</p>
            <p> We thank you for taking the time to explore this opportunity with the Enyata. We encourage you to visit our website at <a href='enyata.com'>enyata.com</a> for additional openings.</p>
            <br>
            <p>Enyata Recruitment Team</p>`

      var mailOptions = {
        from: '"Enyata Academy" <babatundeademola4@gmail.com>',
        to: `${email}`,
        subject: 'Your application: Software Developer Academy',
        html: content
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      return res.status(201).json({
        message: 'Thank you for submitting your application, we will get back to you'
      })
    }
  } catch (err) {
    return next(err);
  }
};

allApps = async (req, res, next) => {
  try {
    console.log(req.user);
    
    if (req.user.isAdmin != true) {
      res.status(401).json({
        message: "You have to be an Admin"
      })
    } else {
      var mysort = { fname: 1 };
      const data = await User.find().sort(mysort);
      return res.status(200).json({ data, score })
    }
  } catch (err) {
    next(err)
  }
};

const oneApp = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await User.findOne({ _id: id });
    if (!data) {
      res.status(404).json({
        message: "No user in the database"
      });
    } else {
      res.status(200).json({
        data
      });
    }
  } catch (err) {
    next(err)
  }
};


module.exports = {register, allApps, oneApp};