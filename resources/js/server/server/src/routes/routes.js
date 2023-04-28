const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "Aplicación": "Gim Cloud",
        "website": "https://zafiro.gimcloud.com/"
    }
    res.json(data);
})

module.exports = router;