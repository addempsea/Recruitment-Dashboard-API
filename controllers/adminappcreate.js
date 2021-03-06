const Application = require('../models/adminappcreate')

const appCreate = async (req, res, next) => {

    try {
        if (req.user.isAdmin != true) {
            res.status(401).json({
                message: "You have to be an Admin"
            })
        } else {
            const { link, batch_id, closing_date, instructions } = req.body;
            const file = req.file.originalname
            const data = await Application.findOne({ batch_id });

            if (data) {
                return res.status(409).json({
                    message: `Application for ${batch_id} has been created already`
                });

            } else {
                const newApp = new Application({
                    link,
                    batch_id,
                    closing_date,
                    instructions,
                    file
                });
                await newApp.save();
                return res.status(201).json({
                    message: "Application created"
                });
            }
        }
    }
    catch (err) {
        next(err)
    }
}

const batches = async (req, res, next) => {
    try {
        const data = await Application.find();
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

module.exports = { appCreate, batches }