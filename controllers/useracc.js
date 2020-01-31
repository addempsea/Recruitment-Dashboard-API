const bcrypt = require("bcryptjs");
const User = require("../models/users");
const A = require('../models/usersapp')
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken')
const salt = 10;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`
  }
});

const register = async (req, res, next) => {
  
  try {
    const { fname, lname, phone, email, password } = req.body;
    const data = await User.findOne({ email });
    const token = await jwt.sign({ id: email }, process.env.SECRET)
    console.log(token);
     
    

    if (data) {
      return res.status(400).json({
        message: `${email} has been registered already`
      });

    } else {
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        lname,
        fname,
        password: hash,
        email,
        phone,
        token
      });
      await newUser.save();

      const content = `
            <p>Dear ${fname},</p>
            <p>Thank you for your interest in a career opportunity at Enyata.</p>
            <p>Kindly click on the link to confirm your account <a href='http://localhost:3000/verify?token=${token}'>Click here</a> </p>
            <br>
            <p>Enyata Recruitment Team</p>`


      var mailOptions = {
        from: '"Enyata Academy" <babatundeademola4@gmail.com>',
        to: `${email}`,
        subject: 'Confirm your Email',
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
                message: 'Thank you for signing up, check your email for confirmation link',
            })
    }
  } catch (err) {
    return next(err);
  }
};

const login = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email });
        const applied =  await A.findOne({ email })
        var hasApplied = ""
        if (applied) {
          hasApplied = true
        } else {
          hasApplied = false
        }
        if (!data) {
            return res.status(403).json({
                message: email + ' is not associated with any account'
            })
        } else if(!data.isVerified) {
            return res.status(403).json({
              message: email + ' is not verified'
            })
        } else {
            const match = await bcrypt.compare(password, data.password);
            if (!match) {
                return res.status(401).json({
                    message: 'Invalid login details'
                })
            } else {
                const token = await jwt.sign({ id: data._id }, process.env.SECRET, { expiresIn: "17h" }) 
                return res.status(200).json({
                    message: 'Login successful',
                    token: token,
                    data: data,
                    hasApplied
                })
            }
        }
    } catch (err) {
        return next(err)
    }
};

const oneUser = async (req, res, next) => {
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

const edit = async (req, res, next) => {
  try {
      const data = await User.findById(req.params.id);
      
      if(!data) {
          return res.status(401).json({
              message: "No data for user with ID"
          });

      } else {
          const id = req.params.id
          const profpic = "http://localhost:3000/userpics/" + req.file.originalname

          const datar = await User.findOneAndUpdate({ _id: id }, { $set: { profpic: profpic, } }, { new: true })
          await datar.save();
          return res.status(200).json({ message: "Profile Picture added successfully" });
      }

  } catch (err) {
      return next(err);
  }

}

const verify = async (req, res, next) => {
  try {
    console.log(req.query.token);
    
    const data = await User.findOne({token: req.query.token});
    if(!data) {
      return res.status(404).json({
          message: "No data found"
      });
    } else {
      const toke = req.query
      const datar = await User.findOneAndUpdate({ token: toke.token }, { $set: { isVerified: true, } }, { new: true })
      await datar.save();
      return res.status(200).send("Email confirmed, Proceed to login")
    }
    
  } catch (err) {
    next(err)
  }
}


module.exports = { register, login, oneUser, edit, verify};