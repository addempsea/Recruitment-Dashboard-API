const bcrypt = require("bcryptjs");
const User = require("../models/usersapp");
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken')
const salt = 10;


const register = async (req, res, next) => {
  
  try {
    const { fname, lname, email, password, cgpa, address, course, university, isAdmin } = req.body;
    const cv = req.file.originalname
    const data = await User.findOne({ email });

    if (data) {
      return res.status(400).json({
        message: `${email} has been registered already`
      });

    } else {
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        fname,
        lname,
        password: hash,
        email,
        cgpa, 
        address, 
        course, 
        university,
        cv,
        isAdmin
      });
      await newUser.save();
      return res.status(201).json({
                message: 'Thank you for submitting your application, we will get back to you'
            })
    }
  } catch (err) {
    return next(err);
  }
};


module.exports = register;