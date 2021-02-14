const router = require('express').Router();
const { thought, user } = require('../../models');
const User = require('../../models/user');

//the /api/user endpoint

//finds all users
router.get('/', async ( req, res ) => {
    const users = await User.find();
    res.json(users);
})

//finds one user by its _id value
router.get('/:id', async ( req, res ) => {
    const oneUser = await User.findById(req.params.id);
    res.json(oneUser);
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

module.exports = router;