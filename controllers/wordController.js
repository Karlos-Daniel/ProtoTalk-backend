const { response, json } = require("express");
const Word = require('../models/words');
const WordUnicor = require('../models/wordsUnicor');


const wordsGet = async(req = request, res = response)=>{

   
    const resp = await Word.find({}).populate('category','category');

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

const wordsById = async(req , res = response)=>{
    
    try {
        const {id} = req.params
        const {word,image} = await Word.findById(id);
        if(!word){
            return json({
                data: 'no se encuentra la palabra'
            })
        }
        return res.status(200).json({
            word,
            image
        })
    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }

}


const wordsActualizar = async(req = request, res = response)=>{
    try {
        //VALIDA CREADOR
        const {id} = req.params;
        const {word,image} = req.body;

        word = word.toLowerCase();
        
        const categoria = await Word.findByIdAndUpdate(id, {word,image},{new: true})

        return res.status(200).json({
            word,
            image
        })

    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }
 }



const borrarWords = async(req,res)=>{

    const {id} = req.params;

    const existe = await Word.findById(id)

    if(!existe){
        return res.status(400).json({
            msg:'La categoria no existe en la DB'
        })
    }

    const categorDelete = await Word.findByIdAndDelete(id);
    return res.json({
        msg: 'borrada con exito'
    })

}




const crearWords = async(req,res = response)=>{

    try {
        
        const {word,image} = req.body;
        
        const wordDB = await Word.findOne({word:word});
        
        if(wordDB){
            return res.status(400).json({
                msg: `La categoria ${wordDB} ya existe`
            });
        }
    
        const words = new Word({word:word,image:image});
    
        await words.save();
    
        return res.status(201).json(words);
    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }


}

const crearWordsUnicor = async(req,res = response)=>{

    try {
        
        const {word,image,time,configuracion} = req.body;
        
        const wordDB = await WordUnicor.findOne({word:word});
        
        if(wordDB){
            return res.status(400).json({
                msg: `La categoria ${wordDB} ya existe`,
                wordDB
            });
        }
    
        const words = new WordUnicor({word,image,time,configuracion});
    
        await words.save();
    
        return res.status(201).json(words);
    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }
}



const WordsUnicorGet = async(req,res = response)=>{

    try {
        
        const resp = await WordUnicor.find({});

        resp.sort((a,b)=>{
            console.log(a);
            console.log(a.word);
            if (a.word
                > b.word) {
                return 1;
              }
              if (a.word < b.word) {
                return -1;
              }
              
              return 0;
        })
        return res.json({
                     data: resp
                })
    
    } catch (error) {
        return res.status(500).json({
            errors:error
        })
    }
}



module.exports = {
    crearWords,
    wordsGet,
    wordsActualizar,
    borrarWords,
    crearWordsUnicor,
    WordsUnicorGet,
    wordsById
}