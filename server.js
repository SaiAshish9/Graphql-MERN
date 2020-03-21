const express=require('express'),
      app=express(),
      bodyParser=require('body-parser'),
      graphqlHttp=require('express-graphql'),
      {buildSchema}=require('graphql')
      mongoose=require('mongoose')
      Event=require('./models/event')

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
        date:new Date(x.eventInput.date)
        })

      return  y.save()
        .then(
            d=>{
                console.log(d)
                return {...d._doc}
            }
        )
        .catch(e=>{
            console.log(e)
            throw e
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