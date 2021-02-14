const router = require('express').Router();
const { thought, user } = require('../../models');
const User = require('../../models/user');

//the /api/user endpoint

router.get('/', async ({ body }, res) => {
    
})

router.get('/:id', async (req, res) => {
    res.send('user route "get by id" - functional');
})

router.put('/', async (req, res) => {
    res.send('user route "put" - functional');
})

router.post('/', async ({ body }, res) => {
    try{
        const user = new User(body);
        let userData = await User.create(user);
        res.json(userData);
    } catch (err) {
        res.json(err);
    }

})

router.delete('/', async (req, res) => {
    res.send('user route "delete" - functional');
})

module.exports = router;