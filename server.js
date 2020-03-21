const express=require('express'),
      app=express(),
      bodyParser=require('body-parser'),
      graphqlHttp=require('express-graphql'),
      {buildSchema}=require('graphql'),
      mongoose=require('mongoose'),
      Event=require('./models/event'),
      User=require('./models/user'),
      bcrypt=require('bcryptjs')

mongoose.connect("mongodb+srv://Sai_99:shirdisai@cluster0-4bk2v.mongodb.net/merngraphqlDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// ! --> not null


app.use('/graphql',graphqlHttp({
    schema:buildSchema(`

        type Event{
            _id:ID!
            title:String!
            description:String!
            price:Float!
            date:String!
        }
          
        type User{
            _id:ID!
            email:String!
            password:String
        }

        input UserInput{
            email:String!
            password:String!
        }

        input EventInput{
            title:String!
            description:String!
            price:Float!
            date:String!
                }

        type RootQuery{
            events:[Event!]!
        }
 

        type RootMutation{
           createEvent(eventInput:EventInput) : Event
           createUser(userInput:UserInput) : User
        }

        schema{
            query:RootQuery
            mutation:RootMutation
        }
        `),

    rootValue:{
      events:()=>{
    return  Event.find()
      .then(d=>{
          return d.map(e=>{
            console.log({...e._doc})
              return { ...e._doc,_id:e._doc._id.toString()}
          })
        })
      .catch(e=>{throw e})

    },
      createEvent:(x)=>{
  
        const y=new Event({
        title:x.eventInput.title,
        description:x.eventInput.description,
        price:+x.eventInput.price,
        date:new Date(x.eventInput.date),
        creator:'5e761dff1029f14f9c3e8178'
        })

let createdEvent;

      return  y.save()
        .then(
            d=>{
createdEvent = {...d._doc,_id:d._id.toString()}
            return User.findById('5e761dff1029f14f9c3e8178')
            }
        )
        .then(user =>{
            if(!user){
                throw new Error('User exists already')
            }
            user.createdEvents.push(y)
            return user.save()
        })
        .then(d=>{
            return createdEvent
        })


        .catch(e=>{
            console.log(e)
            throw e
        })        
    },

createUser:x=>{

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


    },
    graphiql:true
}))



const port=process.env.PORT||3001

app.get('/',(req,res,next)=>{
    res.status(200).json('Visit /graphql')
})


app.listen(port ,()=>{
    console.log(`server started on ${port}`)
})