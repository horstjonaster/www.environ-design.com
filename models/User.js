const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        first_name:
        {
            type: String,
            required: true
        },

        insertion:
        {
            type: String,
            required: false
        },

        last_name:
        {
            type: String,
            required: true
        },

        rank:
        {
            type: Number,
            required: true,
            min: 0,
            max: 3,
            default: 1 /* 0 = blocked, 1 = customer, 2 = employee, 3 = administrator */
        },

        phone_number:
        {
            type: String,
            required: false
        },

        email:
        {
            type: String,
            required: true
        },

        address:
        {
            country:
            {
                type: String,
                required: false
            },

            city:
            {
                type: String,
                required: false
            },

            street:
            {
                type: String,
                required: false
            },

            house:
            {
                type: String,
                required: false
            },

            postal_code:
            {
                type: String,
                required: false
            }
        },
        password:
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

const model = mongoose.model('User', schema);
module.exports = model;