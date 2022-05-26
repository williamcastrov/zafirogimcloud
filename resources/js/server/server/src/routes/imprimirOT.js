const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var MD5 = require("crypto-js/md5");
var namefoto = '';

const diskstorage = multer.diskStorage({
    //destination: path.join(__dirname, '../images'),
    destination: path.join('/var/www/zafiro.bc-gim/public/images'),
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')
        var d = new Date();
        let md5name = MD5(d.getMilliseconds()).toString();
        let name = md5name.substring(0, 9);
        namefoto = name + '-gimcloud.' + ext[1]
        cb(null, namefoto)

    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.get('/', (req, res) => {
    res.send('Bienvenido a Gim Cloud');
})

router.post('/otcliente', fileUpload, (req, res) => {
    //res.send(req.query);
    console.log(req.body);
  
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Server Error');
        console.log("NUMERO ORDEN : ", req.body.orden)

        conn.query('SELECT * from imagenesordenes WHERE orden = ?', [req.body.orden], (err, rows) => {
            if (err) return res.status(500).send('server error')

        })
    })
})

module.exports = router;