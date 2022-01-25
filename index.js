const express = require('express');

const app = express()

app.set('view engine', "ejs");

//middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/myget", (req, res) =>{
  console.log(req.body);
  res.send(req.query);
})
app.get("/mygetForm", (req, res) =>{
 // console.log(req.body);
  res.render("getForm"); 
})
app.get("/mypostForm", (req, res) =>{
 // console.log(req.body);
  res.render("postForm");
})
app.listen(4000, ()=> console.log("Server is running at 4000"))