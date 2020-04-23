module.exports = function (req, res, next) {
    if (!req.session.userID) {
        return res.status(401).json({ msg: 'Authorisation failed!' });
    } else {
        next();
    }
};
