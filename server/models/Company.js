const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        details: {
            type: Array,
        },
        tasks: {
            type: Array,
        },
    },
    { timestamps: true }
);
module.exports = Company = mongoose.model('company', CompanySchema);
