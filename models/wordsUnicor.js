const {Schema, model} = require('mongoose');

const wordsUnicorSchema = Schema({
    
    word:{
        type: String,
        require: true
    },
    image:{
        type:String,
    },
    time:{
        type: Number,
        require: true
    },
    configuracion:{
        type: String,
        require: true
    }
});
wordsUnicorSchema.methods.toJSON = function(){
    const { __v, _id,...wordUnicor }=this.toObject();
    wordUnicor.uid = _id
    return wordUnicor;
}

module.exports = model('WordsUnicor',wordsUnicorSchema);