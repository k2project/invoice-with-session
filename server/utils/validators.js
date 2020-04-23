const { check } = require('express-validator');

const registerValidators = new Array(
    check('email', 'Please enter a valid email address.')
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail(),
    check('password')
        .trim()
        .escape()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage(
            'Password must be at least 8 characters long and must contain a number and a uppercase letter.'
        )
        .custom((value, { req }) => {
            if (value !== req.body.password2) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match.");
            } else {
                //to get rid of 'invalid value' error
                return true;
            }
        }),
    check('password2')
        .trim()
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match.");
            } else {
                //to get rid of 'invalid value' error
                return true;
            }
        })
);

const loginValidators = new Array(
    check('email', 'Please include valid email')
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail(),
    check('password', 'Password is required').trim().escape().not().isEmpty()
);

module.exports = {
    registerValidators,
    loginValidators,
};
