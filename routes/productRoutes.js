const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
    testProduct,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController.js');

// Configuración de CORS
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

// Rutas para Product
router.get('/product/', testProduct);
router.post('/product/create', createProduct);
router.get('/product/all', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;
