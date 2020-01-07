const User = require("../models/usersapp");


const register = async (req, res, next) => {
  
  try {
    const { fname, lname, email, cgpa, address, course, university, isAdmin, dob } = req.body;
    const cv = req.file.originalname
    const data = await User.findOne({ email });

    if (data) {
      return res.status(400).json({
        message: `${email} has been registered already`
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