const mongoose=require('mongoose')


const BookingSchema=new  mongoose.Schema({
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Booking',BookingSchema)
