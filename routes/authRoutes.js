const express = require('express')
const router = express.Router();
const cors = require('cors')
const { test, registerUser, loginUser, getUsers, getUserById, getUserByEmail } = require('../controllers/authController.js')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/users/email/:correo', getUserByEmail);


module.exports = router