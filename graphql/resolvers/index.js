const Event=require('../../models/event'),
      User=require('../../models/user'),
      bcrypt=require('bcryptjs')

const user=async userId=>{
    try{
    const user= await User.findById(userId)

    return {
        ...user._doc,
        _id:user.id,
        createdEvents:events.bind(this,user._doc.createdEvents)
    }
}
catch(e){throw e}
}
    
const events= async eventsIds=>{
   try{
 const events=  await Event.find({_id:{
            $in:eventsIds
        }})
        
 events.map(d=>{
    return {
    ...d._doc,
    _id:d.id,
    date:new Date(d._doc.date).toISOString(),
    creator:user.bind(this,d.creator)
}
            })

    return events
            
        }
        catch(e){throw e}
}

module.exports={

    events:async ()=>{
        try{
        const events=await  Event.find()
        //   .populate('creator')
              return events.map(e=>{
                  return { ...e._doc,
                    _id:e.id,
                    // creator:{
                    //  ...e._doc.creator._doc,
                    //  _id:e._doc.creator.id   
                    // }
                    date:new Date(e._doc.date).toISOString(),
                    creator:user.bind(this,e._doc.creator)
                }
              })
        }
    catch(e){throw e}
        },
          createEvent:async (x)=>{
              try{

            const y=new Event({
            title:x.eventInput.title,
            description:x.eventInput.description,
            price:+x.eventInput.price,
            date:new Date(x.eventInput.date),
            creator:'5e761dff1029f14f9c3e8178'
            })
    
    let createdEvent;
    
    const d=await  y.save()
    
    createdEvent = {...d._doc,
        _id:d._doc._id.toString(),
        date:new Date(d._doc.date).toISOString(),
        creator:user.bind(this,d._doc.creator)
    }

    
    const user1=await User.findById('5e761dff1029f14f9c3e8178')

    if(!user1){
       throw new Error('User exists already')
     }
              
    user1.createdEvents.push(y)
    
    await user1.save()

    return createdEvent
    }

    catch(e){
                console.log(e)
                throw e
            }        
        },
    
    createUser: x=>{
    
    return User.findOne({email:x.userInput.email})
    .then(user=>{
        if(user){
            throw new Error('User exists already')
        }
    
    
        return bcrypt.hash(x.userInput.password,12)
    .then(
        a=>{
            const user = new User({
                email:x.userInput.email,
                password:a
            })
            return user.save()
        }
    )
    .then(r=>{
        return {...r._doc,password:"cannot display it ",_id:r.id}
    })
    .catch(e=>{throw e;})
    
    })
    
    }

}