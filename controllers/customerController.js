const Customer = require('../models/customer.js'); // Importar el modelo Customer

// Prueba de funcionalidad
const testCustomer = (req, res) => {
    res.json('El controlador de clientes está funcionando');
};

// Crear un cliente
const createCustomer = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address } = req.body;

        // Validar datos
        if (!firstName || !lastName || !email || !phone || !address) {
            return res.json({
                error: 'Los campos "firstName", "lastName", "email", "phone" y "address" son obligatorios',
            });
        }

        // Crear el cliente
        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            phone,
            address,
        });

        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

// Leer todos los clientes
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find(); // Obtener todos los clientes
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Leer un cliente por ID
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Actualizar un cliente
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, address } = req.body;

        // Validar datos
        if (!firstName || !lastName || !email || !phone || !address) {
            return res.json({
                error: 'Los campos "firstName", "lastName", "email", "phone" y "address" son obligatorios',
            });
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { firstName, lastName, email, phone, address },
            { new: true } // Retornar el cliente actualizado
        );

        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json(updatedCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = {
    testCustomer,
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
