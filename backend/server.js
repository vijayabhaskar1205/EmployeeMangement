const express=require('express')
const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cors())

const emprouter=require('./routes/employeeroute')
app.use('/image',express.static('image'))
app.use('/employee',emprouter)

app.listen(7500,()=>{
    console.log("server created")
})