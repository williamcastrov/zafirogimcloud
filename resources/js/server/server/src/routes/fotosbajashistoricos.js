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
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
        var name = "gimcloud";
        for (i=0; i<20; i++) name +=caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        namefoto = name +'.'+ ext[1]
        cb(null, namefoto)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.post('/post', fileUpload, (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Server Error')
        console.log("DATOS BODY : ", req.body);

        const type = req.file.mimetype
        const name = namefoto
        const url = req.file.path
        const codigoequipo = req.body.codigoequipo
        const nombrefoto = req.body.nombrefoto
        const fechafoto = req.body.fechafoto

        conn.query('INSERT INTO fotosbajashistoricos set ?', [{ type, name, nombrefoto, fechafoto, url, codigoequipo }], (err, rows) => {
            if (err) return res.status(500).send('server error')
            //console.log(req.file)
            res.send('Foto Bajas Equipo Guardada!')
        })
    })
})

module.exports = router;