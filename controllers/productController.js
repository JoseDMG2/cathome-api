const Product = require('../models/product.js'); // Importar el modelo Product

// Prueba de funcionalidad
const testProduct = (req, res) => {
    res.json('El controlador de productos está funcionando');
};

// Crear un producto
const createProduct = async (req, res) => {
    try {
        const { title, price, stock, brand, category } = req.body;

        // Validar datos
        if (!title || !price || !stock || !brand || !category) {
            return res.json({
                error: 'Todos los campos son obligatorios',
            });
        }

        // Crear el producto
        const product = await Product.create({
            title,
            price,
            stock,
            brand,
            category,
        });

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// Leer todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Obtener todos los productos
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Leer un producto por ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, stock, brand, category } = req.body;

        // Validar datos
        if (!title || !price || !stock || !brand || !category) {
            return res.json({
                error: 'Todos los campos son obligatorios',
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, price, stock, brand, category },
            { new: true } // Retornar el producto actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = {
    testProduct,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
