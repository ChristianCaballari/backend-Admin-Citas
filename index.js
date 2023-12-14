const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Crear el servidor de express
const app = express();

//Configurar los cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());
//TODO:  Rutas 
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/estados', require('./routes/status'));
app.use('/api/citas', require('./routes/appointments'));




//levantar el servidor
app.listen(process.env.PORT, () =>{
     console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});