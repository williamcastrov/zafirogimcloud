const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Respuesta desde el servidor Node");
})

module.exports = router;