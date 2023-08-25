import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { db } from './src/config/db.js'
import servicesRoutes from './src/routes/servicesRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import appointmentsRoutes from './src/routes/appointmentsRoutes.js'
import usersRoutes from './src/routes/usersRoutes.js'

// variables de entorno
dotenv.config()

// configurar app
const app = express()

// leer datos vía body
app.use(express.json())

// conectar a bd
db()

// configurar CORS
const whiteList = [process.env.FRONTEND_URL]

if (process.argv[2] === '--postman') {
    whiteList.push(undefined)
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            // permitir conexion
            callback(null, true)
        } else {
            // denegar conexion
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

// definir ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/users', usersRoutes)

// definir puerto
const PORT = process.env.PORT || 4000

// arrancar app
app.listen(PORT, () => {
    console.log('El servidor se está ejecutando en el puerto: '+ PORT)
})