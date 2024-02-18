const { Router } = require('express');

const router = Router();
const ContactController = require('./app/controllers/contact.controller');
const CategoryController = require('./app/controllers/category.controller');

router.get('/contacts', ContactController.findAll);
router.get('/contacts/:id', ContactController.findById);
router.post('/contacts', ContactController.save);
router.put('/contacts/:id', ContactController.update);
router.delete('/contacts/:id', ContactController.delete);

router.get('/categories', CategoryController.findAll);
router.get('/categories/:id', CategoryController.findById);
router.post('/categories', CategoryController.save);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
