const router = require('express').Router();
const Thought = require('../../models/thought');
const User = require('../../models/user')

//the /api/thoughts endpoint

//gets all thoughts
router.get('/', async (req, res) => {
    const thoughts = await Thought.find().populate({
        path: "reactions",
        select: "-__v"
    })
    res.json(thoughts);
})

//gets a single thought by _id
router.get('/:id', async (req, res) => {
    try{
        const oneThought = await Thought.findById(req.params.id);
        res.json(oneThought);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//edits an existing thought by _id using body information
router.put('/:id', async ({ body, params }, res) => {
    try{
        const result = await Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
            );
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//create new thought
router.post('/', async ({ body }, res) => {
    try{
        const thoughtData = new Thought(
            {
                thoughtText: body.thoughtText,
                username: body.username,
            }
        );
        const newThought = await Thought.create(thoughtData);
        let thoughtOwner = await User.findByIdAndUpdate(
            body.userId,
            { $push: {
                thoughts: { _id: newThought._id }
            }},
            { runValidators: true, new: true }
        );
        res.json(newThought);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//delete thought by _id
router.delete('/:id', async (req, res) => {
    try{
        const removed = await Thought.remove(
            { _id: req.params.id }    
        );
        res.json(removed);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//reaction routes

router.post('/:thoughtId/reactions', async ({params, body}, res) => {
    try {
        let thought = await Thought.findByIdAndUpdate( 
            params.thoughtId,
            { $push : { reactions:  body } },
            { runValidators: true, new: true },
            )
        res.json(thought);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.delete('/:thoughtId/reactions/:reactionId', async ({params, body}, res) => {
    try {
        let removal = await Thought.findByIdAndUpdate(
            params.thoughtId,
            { $pull: {
                reactions: { 
                    reactionID: params.reactionId, 
                    },
                },
            },
            { runValidators: true, new: true }
        );
        if (!removal) {
            return res.status(404).send('Invalid ID')
        }
        res.json(removal);
    } catch (err) {
        res.status(500).send(err.message)
    }
})


module.exports = router;