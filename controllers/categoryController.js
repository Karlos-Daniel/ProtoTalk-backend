const { response, json } = require("express");
const Category = require('../models/category');


const categoriasGet = async(req = request, res = response)=>{

   
    const resp = await Category.find({});

    resp.sort((a,b)=>{
        if (a.category
            > b.category) {
            return 1;
          }
          if (a.category < b.category) {
            return -1;
          }
          
          return 0;
    })
    return res.json({
                 data: resp
            })

}

const categoriaById = async(req , res = response)=>{
    
    try {
        const {id} = req.params
        const {category} = await Category.findById(id);
        if(!category){
            return json({
                data: 'no se encuentra la categoria'
            })
        }
        return res.status(200).json({
            msg:category
        })
    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }

}


const categoriaActualizar = async(req = request, res = response)=>{
    try {
        //VALIDA CREADOR
        const {id} = req.params;
        const {category} = req.body;

        category = category.toUpperCase();
        
        const categoria = await Category.findByIdAndUpdate(id, {category:category},{new: true})

        return res.status(200).json({
            msg: categoria
        })

    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }
 }



const borrarCategorias = async(req,res)=>{

    const {id} = req.params;

    const existe = await Category.findById(id)

    if(!existe){
        return res.status(400).json({
            msg:'La categoria no existe en la DB'
        })
    }

    const categorDelete = await Category.findByIdAndDelete(id)
    return res.json({
        msg: 'borrada con exito'
    })

}




const crearCategoria = async(req,res = response)=>{

    try {
        
        const {cateogry} = req.body.cateogry.toUpperCase();
        
        const categoriaDB = await Category.findOne({cateogry:cateogry});
        
        if(categoriaDB){
            return res.status(400).json({
                msg: `La categoria ${categoriaDB} ya existe`
            });
        }
    
       
       
        const categoria = new Category({cateogry:cateogry});
    
        await categoria.save();
    
        return res.status(201).json(categoria);
    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }


}

module.exports = {
    crearCategoria,
    categoriasGet,
    categoriaActualizar,
    borrarCategorias,
    categoriaById
}