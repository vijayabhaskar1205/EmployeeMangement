const express=require('express')
const cors=require('cors')
const app=express()
const db = require('./models');
app.use(express.json())
const allowedOrigins = [
  "https://employee-mangement-plum.vercel.app",
  "https://employee-mangement-94ty1suqy-vijayabhaskar1205s-projects.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
  
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

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