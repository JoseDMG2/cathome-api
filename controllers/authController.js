const User = require('../models/user.js')
const { hashPassword, comparePassword } = require('../helpers/auth.js')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('esto está funcionando xd')
}

//Registro
const registerUser = async (req, res) => {
    try {
        const {nombre, correo, clave} = req.body;
        if(!nombre) {
            return res.json({
                error: 'Se requiere el nombre'
            })
        };
        if(!clave || clave.length < 4){
            return res.json({
                error: 'Se requiere la clave y debe ser mayor a 4 caracteres'
            })
        };
        const exist = await User.findOne({correo});
        if(exist) {
            return res.json({
                error: 'El correo ya existe'
            })
        }


        const hashedPassword = await hashPassword(clave)
        const user = await User.create({
            nombre,
            correo,
            clave: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

//Inicio de sesion
const loginUser = async (req, res) => {
    try {
        const {correo, clave} = req.body;

        //verificar si el usuario existe
        const user = await User.findOne({correo});
        if (!user) {
            return res.json({
                error: 'Usuario no encontrado'
            })
        }

        //verificar si la contraseña es correcta
        const match = await comparePassword(clave, user.clave)
        if(match){
            res.json('Clave encontrada')
            jwt.sign({correo: user.correo, id: user._id, nombre: user.nombre}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match){
            res.json({
                error: "Clave Incorrecta"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Encuentra todos los usuarios en la base de datos
        return res.json(users); // Devuelve la lista de usuarios
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Ocurrió un error al obtener los usuarios'
        });
    }
}

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado',
            });
        }

        return res.json(user); // Devuelve el usuario encontrado
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Ocurrió un error al obtener el usuario',
        });
    }
};

// Obtener un usuario por correo
const getUserByEmail = async (req, res) => {
    try {
        const { correo } = req.params; // Obtener el correo desde los parámetros de la URL
        const user = await User.findOne({ correo }); // Buscar el usuario por correo

        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado',
            });
        }

        return res.json(user); // Devuelve el usuario encontrado
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Ocurrió un error al obtener el usuario',
        });
    }
};


module.exports = {
    test,
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getUserByEmail
}