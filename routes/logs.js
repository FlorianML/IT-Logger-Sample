const express = require('express');
const { check, validationResult } = require('express-validator')

const router = express.Router();

const Tech = require('../models/Tech');
const Log = require('../models/Log');


//@route  GET logs
//@desc  get all logs
//@access  Public
router.get('/', async (_req, res) => {
    try {
        const logs = await Log.find({}).sort({ date: -1 });
        res.json(logs)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route  POST logs
//@desc  Add a log
//@access  Public
router.post('/', [
    check('message', 'Message is required').not().isEmpty(),
    check('attention', 'Include whether attention is needed or not').not().isEmpty(),
    check('tech', 'ID is required').not().isEmpty()
], async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { message, attention, tech } = req.body;

    try {
        const newLog = new Log({
            message,
            attention,
            tech
        });

        const log = await newLog.save();

        res.json(log)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//@route  PUT logs/:id
//@desc  Updates a log 
//@access  Public
router.put('/:id', async (req, res) => {
    const { message, attention, tech } = req.body;

    //Build log object
    const logFields = {}
    if (message) logFields.message = message;
    if (attention) logFields.attention = attention;
    if (tech) logFields.tech = tech;

    try {
        let log = await Log.findById(req.params.id);

        console.log(log)
        if (!log) res.status(404).json({ msg: 'Log not Found' })

        log = await Log.findByIdAndUpdate(req.params.id,
            { $set: logFields },
            { new: true }
        );

        res.json(log);
    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//@route  DELETE logs/:id
//@desc  Deletes a log 
//@access  Public
router.delete('/:id', async (req, res) => {
    try {
        await Log.findByIdAndDelete(req.params.id);
        res.send('Log Deleted')
    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;