const { Schema, Types } = require('mongoose');
const { userSchema } = require('./user');

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: "Reaction Body is required",
        validate: [({ length }) => length <= 280, 'cannot exceed maximum character count (280)']
    },
    username: {
        type: String,
        required: 'Username is required',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = reactionSchema;