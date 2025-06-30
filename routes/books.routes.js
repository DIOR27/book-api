const express = require('express');
const controller = require('../controllers/books.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
