const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    images:{
        type: [String],
        default:[],
    },
    description:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    date:{
        type:String,
        default: () => new Date().toLocaleString('vi-VN')
    },
    author:{
        type: String,
        default: "Admin"
    },
    category:{
        type:String,
        default:"Tin tức"
    },
});
module.exports = mongoose.model("News",newsSchema);