var express = require('express');
var router = express.Router();
// import * as controller from '../offices/office-controller';
const controller = require('../offices/office-controller');

router.get('/', controller.getAllOffice)
router.get('/:id', controller.getOfficeById)
router.post('/', controller.createNewOffice)
router.put('/:id', controller.updateOffice)
router.delete('/:id', controller.deleteOffice)

module.exports = router;
