const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        name:
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

const model = mongoose.model('Project', schema);
module.exports = model;