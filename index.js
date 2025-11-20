const express = require("express")
const app = express()
require("ejs")
require("dotenv").config()
const mongoose = require("mongoose")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
// CRUD - Create, Read, Update, Delete

const userschema = mongoose.Schema({
   username:String,
   email:String,
   password:String
})

const usermodel = mongoose.model("user_collection", userschema);

let userarray = []
let alltodo = []

app.get("/",(Request, Response)=>{
  // Response.send("Hello World")
  // Response.json({
  //   "users":[
  //         {name: "Rachel", age: 17, city: "Newzealand"},  ]
  //   })
  console.log(__dirname, "diranme ");
  
  Response.sendFile(__dirname + "/index.html")
})

const username = "NovemberCohort";

app.get("/user", (req, res)=>{
  res.render("index",{username} )
})

app.get("/signup",(req, res)=>{
    res.render("signup")
})
app.get("/login",(req, res)=>{
   res.render("login")
})
app.get("/todo",(req, res)=>{
  res.render("todo",{alltodo})
})
app.get("/todo/edit/:index",(req,res)=>{
  console.log(req.params, "parameter received");
  // const {index} = req.params 
  const index = req.params.index
  console.log(alltodo[index], "selected todo");
  const onetodo = alltodo[index]
   res.render("edit",{onetodo, index})
})

app.post("/user/signup", async(req, res)=>{
 console.log(req.body);
 const {username, email, password} = req.body
 if (!username || !email || !password) {
   res.send("All fields are required")
   
 }else{
 const newuser = await usermodel.create(req.body)
 console.log(newuser);
 
 if (newuser) {
  res.redirect("/login") 
 }
  
 }

})

app.post("/user/login",(req, res)=>{
  const {email , password} = req.body
  if (!email || !password) {
   return res.send("All fields are mandatory")
  }
  const existuser =  userarray.find((user)=> user.email == email)
  console.log(existuser);
  if (existuser && existuser.password == password) {
    return  res.send("login successful")
  }
  return res.send("Invalid credentials")
})

app.post("/addtodo",(req, res)=>{
    console.log(req.body);
    alltodo.push(
      {
        title: req.body.title,
        description: req.body.description
      }
    )
    res.redirect("/todo")
})

app.post("/deletetodo",(req, res)=>{
  console.log(req.body);
  const {index} = req.body
  alltodo.splice(index, 1)
  res.redirect("/todo")
})

app.post("/todo/update/:index",(req, res)=>{
   console.log(req.body);
   console.log(req.params);
   const {index} = req.params
   alltodo[index] = req.body
   res.redirect("/todo")
})



const uri = process.env.MONGOURI
const Connect = async() =>{
  try {
   const connection = await mongoose.connect(uri)
   if (connection) {
    console.log("Database connected successfully");
    
   }
  } catch (error) {
    console.log(error);
    
  }
}
Connect()




const port = 5007

app.listen(port,()=>{
 console.log(`app started at port ${port}`);
 
})

