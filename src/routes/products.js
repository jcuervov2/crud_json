// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
        //Set for dir to save the images
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname + '../../../public/images/products'));
        },
        filename: (req, file, cb) => {

            const newFilename = 'group-' + Date.now() + path.extname(file.originalname);
            cb(null, newFilename);
        }


    }

)

const upload = multer({ storage });

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
router.post('/', upload.single('image'), productsController.store);


/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id/', productsController.edit);
router.put('/edit/:id', productsController.update);




module.exports = router;