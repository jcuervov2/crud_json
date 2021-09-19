// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id/', productsController.detail);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy);

/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.create);
router.post('/', productsController.store);


/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id/', productsController.edit);
router.put('/edit/:id', productsController.update);




module.exports = router;