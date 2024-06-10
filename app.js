/**
 * Archivo principal para el levantamiento del servidor.
 * @module SERVER
 * @author David Quintero <davidquinterocentro@hotmail.com>
 */
import express from "express";
import authRoutes from './modules/auth/routes/auth.routes.js'
import cookieParser from "cookie-parser";
import userRoutes from './modules/user/routes/user.routes.js'
import partRoutes from './modules/parts/routes/part.routes.js'

const app = express();
const port = 8080;

app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) =>{
    res.send('Miamorrrr ya quedó uwu')
})

app.use(authRoutes)
app.use(userRoutes)
app.use(partRoutes)

app.listen(port, ()=>{
    console.log(`esta en este puerto miamor ${port}`)
})

