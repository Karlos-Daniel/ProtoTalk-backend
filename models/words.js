const {Schema, model} = require('mongoose');

const wordSchema = Schema({
    
    word:{
        type: String,
        require: true
    },
    image:{
        type:String,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true 
    }
});
wordSchema.methods.toJSON = function(){
    const { __v, _id,...word }=this.toObject();
    word.uid = _id
    return word;
}

module.exports = model('Word',wordSchema);