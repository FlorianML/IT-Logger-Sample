const express = require('express');
const { check, validationResult } = require('express-validator')

const Tech = require('../models/Tech');

const router = express.Router();

//@route  GET /techs
//@desc  get all techs
//@access  Public
router.get('/', async (req, res) => {
    try {
        const techs = await Tech.find({}); //FIND ALL 
        res.json(techs)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route  POST /techs
//@desc  Register a tech
//@access  Public
router.post('/', [
    check('firstName', 'Please add a first name').not().isEmpty(),
    check('lastName', 'Please add a last name').not().isEmpty(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { firstName, lastName } = req.body;

        try {
            tech = new Tech({
                firstName,
                lastName,
            });

            await tech.save()
            res.send('Tech Created')

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')
        }
    })

//@route  DELETE/:ID /tech
//@desc  DELETE  tech
//@access  Public
router.delete('/:id', async (req, res) => {
    try {
        await Tech.findByIdAndDelete({ _id: req.params.id });
        res.send('Tech Removed')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;