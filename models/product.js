const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true, 
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Para incluir las fechas de creación y actualización automáticamente
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
