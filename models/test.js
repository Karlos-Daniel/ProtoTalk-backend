const {Schema, model} = require('mongoose');

const testSchema = Schema({
    test:{
        type: String,
        required: [true, 'Test es obligatorio'],
    },
});
testSchema.methods.toJSON = function(){
    const { __v, _id,...test }=this.toObject();
    test.uid = _id
    return test;
}

module.exports = model('Test',testSchema);