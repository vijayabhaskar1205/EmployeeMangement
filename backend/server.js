const express=require('express')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors({ origin: "https://employee-mangement-plum.vercel.app" }));

const emprouter=require('./routes/employeeroute')
app.use('/image',express.static('image'))
app.use('/employee',emprouter)
db.sequelize.sync({ alter: true })  
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => console.log("Error creating tables:", err));
app.listen(7500,()=>{
    console.log("server created")
})