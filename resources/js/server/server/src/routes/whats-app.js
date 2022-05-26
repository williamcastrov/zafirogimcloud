const { Router } = require('express');
const router = Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())


router.post('/post',fileUpload ,(req, res) => {
})

module.exports = router;