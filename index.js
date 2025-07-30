const express=require("express")
const app=express()
require('dotenv').config()
const path=require('path')
const cors=require('cors')
const apiRouter=require('./routers/apiRouter')

const PORT=process.env.PORT || 8000

app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,'public','views','index.html'))
})

app.get('/update-form/:id',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,'public','views','updateform.html'))
})

app.use("/api",apiRouter)


module.exports=app