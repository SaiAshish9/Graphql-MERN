const express=require('express'),
      app=express(),
      bodyParser=require('body-parser'),
      graphqlHttp=require('express-graphql'),
      mongoose=require('mongoose'),
      graphqlSchema=require('./graphql/schema/index'),
      graphqlResolvers=require('./graphql/resolvers/index')

mongoose.connect("mongodb+srv://Sai_99:shirdisai@cluster0-4bk2v.mongodb.net/merngraphqlDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());



app.use('/graphql',graphqlHttp({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql:true
}))



const port=process.env.PORT||3001

app.get('/',(req,res,next)=>{
    res.status(200).json('Visit /graphql')
})


app.listen(port ,()=>{
    console.log(`server started on ${port}`)
})