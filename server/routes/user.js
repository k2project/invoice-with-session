const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');
const { registerValidators, loginValidators } = require('../utils/validators');
const auth = require('../utils/auth');
const { profileInitDetails } = require('../utils/initDetails');

//@route    POST api/user/register
//@desc     Register user
//@status   Public
userRoutes.post('/register', [...registerValidators], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`VALIDATION ERR: REGISTER`, errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists.', param: 'email' }],
            });
        }
        user = new User({
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        let profile = new Profile({
            user: user._id,
            details: profileInitDetails(email),
            updated: false,
        });
        await profile.save();

        res.send('Account created successfully.');
    } catch (err) {
        res.status(500).send('Server Error: REGISTRATION ERR');
    }
});
//@route    POST api/user/login
//@desc     Sign in user
//@status   Public
userRoutes.post('/login', [...loginValidators], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`VALIDATION ERR: LOGIN`, errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        const { _id, logins } = user;
        if (!user)
            return res.status(400).json({
                errors: [{ msg: 'Invalid login credentials' }],
            });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                errors: [{ msg: 'Invalid login credentials' }],
            });
        req.session.userID = user._id;
        //save new loggins
        logins.unshift(new Date());
        await user.save();
        res.json({ _id, email, lastLogin: logins[1] });
    } catch (err) {
        res.status(500).send('Server Error: LOGIN ERR');
    }
});
//@route    GET api/user
//@desc     Get current user
//@status   Private
userRoutes.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const { _id, email, logins } = user;
        res.json({ _id, email, lastLogin: logins[1] });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error on getting the user');
    }
});
//@route    DELTE api/user
//@desc     Log out user
//@status   Private
userRoutes.delete('/', ({ session }, res) => {
    session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie(process.env.SESS_NAME);
            res.end();
        }
    });
});

module.exports = userRoutes;
