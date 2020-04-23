const express = require('express');
const profileRoutes = express.Router();
const Profile = require('../models/Profile');
const auth = require('../utils/auth');

//@route    GET api/profile/
//@desc     Get user profile
//@status   Private
profileRoutes.get('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.session.userID });
        if (!profile)
            return res.status(400).json({ msg: "User's profile not found" });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error ---> getting the profile');
    }
});
//@route    POST api/profile/
//@desc     Update profile
//@status   Private
profileRoutes.post('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.session.userID });
        if (!profile)
            return res.status(400).json({ msg: "User's profile not found" });
        profile.details = [...req.body];
        await profile.save();
        res.send();
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error ---> updating the profile');
    }
});

module.exports = profileRoutes;
