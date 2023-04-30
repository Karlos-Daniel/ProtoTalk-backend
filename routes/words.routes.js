const{ Router }= require('express');

const { crearWords,
    wordsGet,
    wordsActualizar,
    borrarWords,
    wordsById} = require('../controllers/wordController')


const router = Router();


//TODO: Middlewares

router.get('/word',wordsGet);

router.get('/word/:id', wordsById );

router.post('/word',crearWords);

router.put('/word/:id',wordsActualizar);

router.delete('/word/:id',borrarWords)

module.exports = router