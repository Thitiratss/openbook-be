const express = require('express');
const router = express.Router();
const controller = require('./film-controller');

router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.post('/',  controller.create);

module.exports = router;
