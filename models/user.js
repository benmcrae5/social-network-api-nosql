const {Schema, model } = require('mongoose');
const thoughtSchema = require('./thought')

const userSchema = new Schema(
    {
       username: {
        type: String,
        unique: "That username already exists",
        required: 'username is a required field',
        trim: true,
       },
       email: {
        type: String,
        unique: "that email already exists",
        required: 'Email is a required field',
        match: [/^\S+@\S+\.\S{2,6}$/, "please enter a valid email address"],
       },
       thoughts: [thoughtSchema],
       friends: [ this ],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;