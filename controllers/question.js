const Q = require('../models/questions');

const postQ = async (req, res, next) => {
    const { question, options, correctAns } = req.body;
    const image = 'http://localhost:3000/adminfile' + req.file.originalname;
    const right = options[correctAns]

    try {
        const data = await Q.findOne({ question });
        if (data) {
            res.status(409).json({
                message: "Question posted already"
            })
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

    } catch (err) {
        next(err)
    }
}

const getQ = async (req, res, next) => {
    try {
        const n = await Q.countDocuments();
        const r = await Math.floor(await Math.random() * n)
        console.log(n + ' , ' + r);
        const x = [];
        await x.unshift(r)
        console.log(x);
        
        for (let i = 0; i < x.length; i++) {
            if (i != r) {
                const data = await Q.find().limit(1).skip(r);
                
                return res.status(200).json({ data })
                
            }
        }


    } catch (err) {
        next(err)
    }
}

module.exports = { postQ, getQ }