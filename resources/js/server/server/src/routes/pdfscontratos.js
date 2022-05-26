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
    storage: diskstorage,
    limits: {fileSize: 2000000}
}).single('image')

router.post('/post', fileUpload, (req, res) => {

    req.getConnection((err, conn) => {
        //if (err) return res.status(500).send('Server Error')
        //console.log("DATOS BODY : ", req);
        console.log("TYPE: ","application/pdf")
        console.log("NAME: ",req.file.filename)
        console.log("URL: ",req.file.path)
        console.log("CONTRATO: ",req.body.contrato)
        console.log("NONBRE CONTRATO: ",req.body.nombrecontrato)
        console.log("FECHA CONTRATO: ",req.body.fechacontrato)

        const type = "application/pdf"
        const name = req.file.filename
        const url = req.file.path
        const contrato = req.body.contrato
        const nombrecontrato = req.body.nombrecontrato
        const fechacontrato = req.body.fechacontrato

        conn.query('INSERT INTO pdfscontratos set ?', [{ type, name, nombrecontrato, fechacontrato, url, contrato }], (err, rows) => {
            if (err) return res.status(500).send('server error')
            //console.log(req.file)
            res.send('PDF Contrato Guardado!')
        })
    })
})

module.exports = router;