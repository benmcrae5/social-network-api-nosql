const router = require('express').Router();
const User = require('../../models/user');
const Thought = require('../../models/thought');

//the /api/user endpoint

//finds all users
router.get('/', async ( req, res ) => {
    const users = await User.find().populate({
        path: "thoughts",
        select: "-__v"
    })
    res.json(users);
})

//finds one user by its _id value
router.get('/:id', async ( req, res ) => {
    try{
        const oneUser = await User.findById(req.params.id);
        res.json(oneUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//updates one user by its _id value using the body information
router.put('/:id', async ( { body, params }, res ) => {
    try {
        const result = await User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
            )
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//creates a new user
router.post('/', async ({ body }, res) => {
    try{
        const user = new User(body);
        let userData = await User.create(user);
        res.json(userData);
    } catch (err) {
        res.json(err);
    }

})

//deletes user by _id value
router.delete('/:id', async (req, res) => {
    try{
        const removed = await User.remove(
            { _id: req.params.id }
        )
        res.json(removed);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


//friends list routes

//post a friend to a user's friend list
router.post("/:userId/friends/:friendId", async ({params, body}, res) => {
    try {
        const addedFriend = await User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {
                friends: { _id: params.friendId }
            }    
            },
            { runValidators: true, new: true }
        )
        if(!addedFriend) {
            return res.status(404).send("No user with that ID");
        }
        res.json(addedFriend)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.delete("/:userId/friends/:friendId", async ({params, body}, res) => {
    try {
        const removedFriend = await User.findOneAndUpdate(
            { _id: params.userId },
            { $pull : {
                friends: { _id: params.friendId }
            }    
            },
            { runValidators: true, new: true }
        )
        if(!removedFriend) {
            return res.status(404).send("No user with that ID")
        }
        res.json(removedFriend)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router;