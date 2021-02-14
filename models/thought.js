const {Schema, model } = require('mongoose');
const reaction = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Text is required',
            validate: [ ({ length }) => (length <= 280 && length > 0), 'Text must be between 1 and 280 characters'],
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
        username: { //the user that created this thought
            type: String,
            required: true,
        },
        reactions: []
    }
)