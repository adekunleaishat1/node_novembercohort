const express = require("express")
const app = express()
require("ejs")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

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
app.post("/user/signup",(req, res)=>{
 console.log(req.body);
 const {username, email, password} = req.body
 if (!username || !email || !password) {
   res.send("All fields are required")
   
 }else{
  userarray.push(req.body)
  console.log(userarray);
  res.redirect("/login") 
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

const port = 5007

app.listen(port,()=>{
 console.log(`app started at port ${port}`);
 
})


// const express = require("express")
//  const app =  express()


// app.get("/",(Request, Response)=>{
//   // Response.send("Hello World")
//   console.log(__dirname);
  
//   Response.sendFile(__dirname + "/index.html")
// })

// app.get("/user", (req, res)=>{
//     res.json({
//       "users":[
//             {name: "Rachel", age: 17, city: "Newzealand"},
//             {name: "Titilayo", age: 18, city: "New York"},
//             {name: "Hameed", age: 15, city: "Nigeria"},
//             {name: "Temmy", age: 18, city: "Canada"},
//             {name: "Habeeb", age: 19, city: "Ghana"},
//             {name: "Feranmi", age: 18, city: "Nigeria"},
//         ]
//     })
// })


//  const Port = 5007
//  app.listen(Port,()=>{
//   console.log(`App started at port ${Port}`);
  
//  })

// // const username = "NovemberCohort";
// // console.log(`Welcome to the ${username} Node.js course!`);

// // let userarray = ["Alice", "Bob", "Charlie"];
// // function greetUsers() {
// //   userarray.push("David");
// //   console.log(userarray);
  
// // }

// // greetUsers();