const router = require('express').Router();

const userController = require('../controllers/contacts');


router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

module.exports = router;
