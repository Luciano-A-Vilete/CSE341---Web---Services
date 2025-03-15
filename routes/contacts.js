const router = require('express').Router();

const contactsController = require('../controllers/contacts');


router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContacts);
router.put('/:id', contactsController.updateContacts);
router.delete('/:id', contactsController.deleteContacts);

module.exports = router;
