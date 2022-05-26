const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json())

//Conexion a la Base de datos
app.use(myconn(mysql, {
    host    :   'localhost',
    port    :   3306,
    user    :   'admon',
    password:   '12345678',
    database:   'gimbc_sys'
}))

app.use(cors())
app.use(express.static(path.join(__dirname, 'images')))

//settings
app.set('port', process.env.PORT || 9000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


const whatsapp = require('./whats-app');

//routes
app.get('/', (req, res) => res.send('Hello Desde Gim Cloud'));
app.post('/whatsapp/connect', whatsapp.conectApi);
app.post('/whatsapp/sendmessage', whatsapp.sendMessage);

app.use('/api/imagenes', require('./routes/routes'));
app.use('/api/imagenes', require('./routes/imagenes'));
app.use('/api/pdfscontratos', require('./routes/pdfscontratos'));
app.use('/api/fotosequipos', require('./routes/fotosequipos'));
app.use('/api/imprimirOT', require('./routes/imprimirOT'));
//app.use('/api/whatsapp', require('./routes/whats-app'));

//starting the server
/*
app.listen(app.get('port'), () => {
    console.log(`Server on port http://localhost: ${app.get('port')}`);
});
*/

//app.use(require('./routes/routes'));

app.listen(9000, () => {
    console.log('server running on port', 9000);
});