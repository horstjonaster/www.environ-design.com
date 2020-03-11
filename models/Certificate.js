const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        created:
        {
            type: Date,
            required: true,
            default: Date.now()
        },
        updated:
        {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
);

const model = mongoose.model('Certificate', schema);

module.exports = model;