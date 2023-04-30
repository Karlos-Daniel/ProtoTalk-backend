const{ Router }= require('express');

const { crearCategoria, categoriaById, categoriasGet, 
    categoriaActualizar, borrarCategorias } = require('../controllers/categoryController');

const router = Router();

//TODO: Middlewares

router.get('/category',categoriasGet);

router.get('/word/:id', categoriaById );

router.post('/category',crearCategoria);

router.put('/word/:id',categoriaActualizar);

router.delete('/word/:id',borrarCategorias)

module.exports = router
