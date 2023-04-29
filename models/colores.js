const {Schema, model} = require('mongoose');

const colorSchema = Schema({
    color:{
        type: String,
        required: [true, 'Color es obligatoria'],
    },
});
colorSchema.methods.toJSON = function(){
    const { __v, _id,...color }=this.toObject();
    color.uid = _id
    return color;
}

module.exports = model('Color',colorSchema);