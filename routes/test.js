const{ Router }= require('express');
const {getArrayTest} = require('../controllers/test');
const router = Router();

router.get('/test',getArrayTest);

module.exports = router;