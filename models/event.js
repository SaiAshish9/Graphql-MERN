const mongoose=require('mongoose')

const Schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    creator:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

module.exports=mongoose.model('Event',Schema)