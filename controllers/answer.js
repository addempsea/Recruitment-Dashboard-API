const Q = require('../models/questions');
const A = require('../models/answers');

const Ans = async (req, res, next) => {
    try {
        console.log(req.user.id);
        
        const {questionId, answer} = req.body;
        const userId = req.user.id;
        var score = 0;
        var data = await Q.find();
        var q = []
        
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < questionId.length; j++) {
                if (data[i]._id == questionId[j]) {
                    q.unshift(data[i]._id)
                }
            }
        }
        console.log(q);
        for (let k = 0; k < q.length; k++) {
            for (let l = 0; l < answer.length; l++) {
                var correct = await Q.findById({_id: q[k]});
                if (correct.right == answer[l]) {
                    score += 1
                }
                
            }
            
        }
        newA = new A({
            answer,
            userId,
            score,
            questionId,
            doneTest: true
        });
        await newA.save();
        return res.status(201).json({
            message: "Answer Submitted",
            newA
        });
        
    } catch (err) {
        next(err)
    }
}

module.exports = Ans