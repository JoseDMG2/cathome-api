const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para los pedidos
const orderSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

// Creación del modelo de Order
const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
