const Q = require("../models/questions");
const A = require('../models/answers') 

const postQ = async (req, res, next) => {
  const { question, options, correctAns } = req.body;
  const image = "http://localhost:3000/adminfile" + req.file.originalname;
  const right = options[correctAns];

  try {
    if (req.user.isAdmin != true) {
      res.status(401).json({
        message: "You have to be an Admin"
      });
    } else {
      const data = await Q.findOne({ question });
      if (data) {
        res.status(409).json({
          message: "Question posted already"
        });
      } else {
        newQ = new Q({
          question,
          options,
          correctAns,
          image,
          right
        });
        await newQ.save();

        return res.status(201).json({
          message: "Question created",
          newQ
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

const getQ = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    
    const user = await A.findOne({userId: userId});
    

    function shuffle (array) {
      return array.sort(() => Math.random() - 0.5);
    }

    const data = await Q.find().limit(30);

  
    const sorted = await shuffle(data)
    console.log(sorted);
    

    
    if(user == null) {
      
      return res.status(200).json({sorted});
      
    }else {
      res.status(200).json({
        message: "you have taken the test already"
      })
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { postQ, getQ };
