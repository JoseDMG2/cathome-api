const Order = require('../models/order.js'); // Importar el modelo Order

// Prueba de funcionalidad
const testOrder = (req, res) => {
    res.json('El controlador de órdenes está funcionando');
};

// Crear una orden
const createOrder = async (req, res) => {
    try {
        const { title, price, discountPercentage, quantity } = req.body;

        // Validar datos
        if (!title || !price || !discountPercentage || !quantity) {
            return res.json({
                error: 'Todos los campos son obligatorios',
            });
        }

        // Calcular el total
        const total = price * quantity - (price * quantity * (discountPercentage / 100));

        // Crear la orden
        const order = await Order.create({
            title,
            price,
            discountPercentage,
            quantity,
            total,
        });

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

// Leer todas las órdenes
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Obtener todas las órdenes
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

// Leer una orden por ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la orden' });
    }
};

// Actualizar una orden
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, discountPercentage, quantity } = req.body;

        // Validar datos
        if (!title || !price || !discountPercentage || !quantity) {
            return res.json({
                error: 'Todos los campos son obligatorios',
            });
        }

        // Calcular el total
        const total = price * quantity - (price * quantity * (discountPercentage / 100));

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { title, price, discountPercentage, quantity, total },
            { new: true } // Retornar la orden actualizada
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la orden' });
    }
};

// Eliminar una orden
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la orden' });
    }
};

module.exports = {
    testOrder,
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
