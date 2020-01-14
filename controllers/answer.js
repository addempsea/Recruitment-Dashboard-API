const Q = require('../models/questions');
const A = require('../models/answers');


const Ans = async (req, res, next) => {
    try {

        console.log(req.user.id);

        const { questionId, answer } = req.body;
        const userId = req.user.id;
        var score = 0;
        var data = await Q.find();
        var q = [];
        var o = [];
        var y = [];
        var e = []
        console.log(q);


        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < questionId.length; j++) {
                if (data[i]._id == questionId[j]) {
                    q.unshift(data[i]._id)
                }
            }
        }
        console.log(q);
        for (let k = 0; k < q.length; k++) {
            var correct = await Q.findById({ _id: q[k] })
            y.unshift(correct.right);
        }
        for (let l = 0; l < answer.length; l++) {
            console.log(answer[l]);
            o.unshift(answer[l])

        };

        console.log(o);
        console.log(y);
        for (let l = 0; l < o.length; l++) {
            for (let x = 0; x < y.length; x++) {
                console.log(l, x);
                if (l == x) {
                    if (o[l] === y[x]) {
                        console.log(o[l], y[x], o[l] === y[x]);

                        score += 1
                    }
                } else {
                    continue
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