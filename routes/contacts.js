const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const contactsController = require('../controllers/contacts');

// Middleware para lidar com erros de validação
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validações para criação de contato (POST)
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('O nome é obrigatório'),
        body('email').isEmail().withMessage('E-mail inválido'),
        body('phone').isMobilePhone().withMessage('Número de telefone inválido'),
        validate
    ],
    contactsController.createContacts
);

// Validações para atualização de contato (PUT)
router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('ID inválido'),
        body('name').optional().notEmpty().withMessage('O nome não pode estar vazio'),
        body('email').optional().isEmail().withMessage('E-mail inválido'),
        body('phone').optional().isMobilePhone().withMessage('Número de telefone inválido'),
        validate
    ],
    contactsController.updateContacts
);

// Validação para ID em deleção de contato
router.delete(
    '/:id',
    [
        param('id').isMongoId().withMessage('ID inválido'),
        validate
    ],
    contactsController.deleteContacts
);

router.get('/', contactsController.getAll);
router.get('/:id', param('id').isMongoId().withMessage('ID inválido'), validate, contactsController.getSingle);

module.exports = router;
