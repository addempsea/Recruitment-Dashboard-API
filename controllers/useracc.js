const bcrypt = require("bcryptjs");
const User = require("../models/users");
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken')
const salt = 10;


const register = async (req, res, next) => {
  
  try {
    const { fname, lname, phone, email, password } = req.body;
    const data = await User.findOne({ email });

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
        
      });
      await newUser.save();
      return res.status(201).json({
                message: 'Thank you for signing up, proceed to login',
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
                const token = await jwt.sign({ id: data._id }, process.env.SECRET, { expiresIn: "7h" }) 
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
}


module.exports = { register, login, oneUser};