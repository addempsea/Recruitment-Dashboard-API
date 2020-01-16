const bcrypt = require("bcryptjs");
const User = require("../models/admin");
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');
const salt = 10;
const Application = require('../models/usersapp')


const register = async (req, res, next) => {

  try {
    const { lname, fname, email, password } = req.body;
    const data = await User.findOne({ email });

    if (data) {
      return res.status(409).json({
        message: `${email} is already an Admin`
      });

    } else {
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        lname,
        fname,
        password: hash,
        email
      });
      await newUser.save();
      return res.status(201).json({
        message: 'Thank you for signing up, proceed to login'
      })
    }
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(403).json({
        message: email + ' is not associated with any account'
      })
    } else {
      const match = await bcrypt.compare(password, data.password);
      if (!match) {
        return res.status(401).json({
          message: 'Invalid login details'
        })
      } else {
        const token = await jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, { expiresIn: "7h" })
        return res.status(200).json({
          message: 'Login successful',
          token: token,
          data: data
        })
      }
    }
  } catch (err) {
    return next(err)
  }
};

const edit = async (req, res, next) => {
  try {
    if (req.user.isAdmin != true) {
      res.status(401).json({
        message: "You have to be an Admin"
      })
    } else {
      const data = await User.findById(req.params.id);

      if (!data) {
        return res.status(401).json({
          message: "No data for user with ID"
        })

      } else {
        const id = req.params.id
        const profpic = "http://localhost/adminpics" + req.file.originalname

        const datar = await User.findOneAndUpdate({ _id: id }, { $set: { profpic: profpic, } }, { new: true })
        await datar.save();
        return res.status(200).json({ message: "Profile Picture added successfully" });
      }
    }
  } catch (err) {
    return next(err);
  }

};

const oneUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (req.user.isAdmin != true) {
      res.status(401).json({
        message: "You have to be an Admin"
      })
    } else {
      const count = await Application.countDocuments();
      const data = await User.findOne({ _id: id });
      if (!data) {
        res.status(404).json({
          message: "No user in the database"
        });
      } else {
        res.status(200).json({
          data,
          count
        });
      }
    }
  } catch (err) {
    next(err)
  }
};


module.exports = { register, login, edit, oneUser };