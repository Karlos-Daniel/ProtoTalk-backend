const {Schema, model} = require('mongoose');

const categorySchema = Schema({
    category:{
        type: String,
        required: [true, 'Categoria es obligatorio'],
    },
});
categorySchema.methods.toJSON = function(){
    const { __v, _id,...category }=this.toObject();
    category.uid = _id
    return category;
}

module.exports = model('Category',categorySchema);