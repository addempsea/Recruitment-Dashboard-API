const bcrypt = require("bcryptjs");
const User = require("../models/admin");
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken')
const salt = 10;


const register = async (req, res, next) => {
  
  try {
    const { name, email, password } = req.body;
    const data = await User.findOne({ email });

    if (data) {
      return res.status(400).json({
        message: `${email} has been registered already`
      });

    } else {
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
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


module.exports = { register, login};