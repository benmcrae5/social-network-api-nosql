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
            default: Date.now,
        },
        username: { //the user that created this thought
            type: String,
            required: true,
        },
        reactions: [ reaction ],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

thoughtSchema.virtual('reactCount').get(function() {
    return this.reactions.length;
})
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
