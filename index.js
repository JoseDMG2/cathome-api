const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();

//conexión a la base de datos
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Base de Datos conectada'))
.catch((err) => console.log('Base de Datos no conectada', err))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes.js'))
app.use('/', require('./routes/productRoutes.js'))
app.use('/', require('./routes/orderRoutes.js'))
app.use('/', require('./routes/customerRoutes.js'))

const port = 8000;
app.listen(port, () => console.log(`El Servidor está ejecutándose en el puerto ${port}`))