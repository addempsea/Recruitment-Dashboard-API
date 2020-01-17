const Q = require("../models/questions");
const A = require("../models/answers");
const P = require("../models/usersapp");

const Ans = async (req, res, next) => {
  try {
    const { questionId, answer } = req.body;
    const userId = req.user.id;
    console.log(questionId);
    
    const NN = await A.findById({ _id: userId });
    if (NN) {
      res.status(403).json({
        message: "You have submitted your answers already"
      });

    } else {
      var score = 0;
      var data = await Q.find();
      var q = [];
      var o = [];
      var y = [];
      
      const profile = await P.findOne({userId: userId });
      console.log(profile);
      

      for (let i = 0; i < questionId.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (questionId[i] == data[j]._id) {
            q.unshift(questionId[i]);
          }
        }
      }
      
      for (let k = 0; k < q.length; k++) {
        var correct = await Q.findById({ _id: q[k] });
        y.unshift(correct.right);
      }
      for (let l = 0; l < answer.length; l++) {
        o.unshift(answer[l]);
      }

      console.log(o);
      console.log(y);
      for (let l = 0; l < o.length; l++) {
        for (let x = 0; x < y.length; x++) {
          if (l == x) {
            if (o[l] === y[x]) {
              score += 1;
            }
          } else {
            continue;
          }
        }
      }
      console.log(score);
      

      newA = new A({
        answer,
        userId,
        score,
        questionId,
        doneTest: true,
        userProfile: profile
      });
      await newA.save();
      return res.status(201).json({
        message: "Answer Submitted",
        newA,
        profile
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = Ans;
