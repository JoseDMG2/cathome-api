const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
    testOrder,
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController.js');

// Configuración de CORS
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

// Rutas para Order
router.get('/order/', testOrder);
router.post('/order/create', createOrder);
router.get('/order/all', getAllOrders);
router.get('/order/:id', getOrderById);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);

module.exports = router;
