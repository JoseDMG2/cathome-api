const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
    testCustomer,
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customerController.js');

// Configuración de CORS
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

// Rutas para Customer
router.get('/customer/', testCustomer);
router.post('/customer/create', createCustomer);
router.get('/customer/all', getAllCustomers);
router.get('/customer/:id', getCustomerById);
router.put('/customer/:id', updateCustomer);
router.delete('/customer/:id', deleteCustomer);

module.exports = router;
