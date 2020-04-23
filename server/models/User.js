const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        logins: {
            type: Array,
        },
    },
    { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
