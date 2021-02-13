const router = require('express').Router();
//const { thought, user } = require('../../models');

//the /api/user endpoint

router.get('/', async (req, res) => {
    res.send('user route "get" - functional');
})

router.get('/:id', async (req, res) => {
    res.send('user route "get by id" - functional');
})

router.put('/', async (req, res) => {
    res.send('user route "put" - functional');
})

router.post('/', async (req, res) => {
    res.send('user route "post" - functional');
})

router.delete('/', async (req, res) => {
    res.send('user route "delete" - functional');
})

module.exports = router;