const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        project:
        {
            type: mongoose.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        category:
        {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        price:
        {
            type: Number,
            required: true
        },
        rating:
        {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        sizes:
        [
            {
                size:
                {
                    type: String,
                    required: true
                },
                quantity:
                {
                    type: String,
                    required: true
                },
            }
        ],
        images:
        [
            {
                type: String,
                required: true
            }
        ],
        certificates:
        [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Certificate',
                required: false
            }
        ],
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

const model = mongoose.model('Product', schema);

module.exports = model;