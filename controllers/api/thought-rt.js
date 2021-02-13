const router = require('express').Router();
//const { thought, user } = require('../../models');

//the /api/thoughts endpoint

router.get('/', async (req, res) => {
    res.send('thoughts route "get" - functional');
})

router.get('/:id', async (req, res) => {
    res.send('thoughts route "get by id" - functional');
})

router.put('/', async (req, res) => {
    res.send('thoughts route "put" - functional');
})

router.post('/', async (req, res) => {
    res.send('thoughts route "post" - functional');
})

router.delete('/', async (req, res) => {
    res.send('thoughts route "delete" - functional');
})

module.exports = router;