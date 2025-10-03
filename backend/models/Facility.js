const mongoose = require('mongoose');
const FacilitySchema = new mongoose.Schema({
    type :{
        type: String,
        enum: ['amenty','rule'],
        required:true
    },
    key:{
        type:String,
        required:true,
        unique: true
    },
    lable:{
        type:String,
        required: true
    },
    icon:{
        type : String,
        required: true 
    },

});
module.exports = mongoose.model('Facility',FacilitySchema,'Facility')