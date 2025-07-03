const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const CustomerSchema = moongose.Schema({
    date:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    }
});
const Customer=mongoose.model('customers',CustomerSchema);
module.exports =Customer;